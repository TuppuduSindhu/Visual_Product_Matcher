import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

let model;

export async function loadModel() {
  if (!model) {
    console.log("⏳ Loading MobileNet model...");
    model = await mobilenet.load();
    console.log("✅ MobileNet model loaded!");
  }
  return model;
}

export async function getEmbedding(imageElement) {
  const model = await loadModel();
  return tf.tidy(() => model.infer(imageElement, true));
}

export function cosineSimilarity(tensorA, tensorB) {
  return tf.tidy(() => {
    const dot = tf.sum(tf.mul(tensorA, tensorB));
    const normA = tf.norm(tensorA);
    const normB = tf.norm(tensorB);
    return dot.div(tf.mul(normA, normB));
  });
}
