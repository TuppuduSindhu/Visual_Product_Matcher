 Project Overview

Visual Product Matcher** is a web application that helps users find visually similar products based on an uploaded image.  
It uses Machine Learning (TensorFlow.js + MobileNet) to generate image embeddings, compares them using cosine similarity, and displays the most similar products with scores.  
The entire app runs  in the browser, making it lightweight, fast, and privacy-friendly — no backend server is required.


## 🖼️ Screenshots

<p align="center">
  <img src="https://github.com/TuppuduSindhu/Visual_Product_Matcher/blob/main/output1.png?raw=true" width="700" alt="Screenshot 1">
</p>

<p align="center">
  <img src="https://github.com/TuppuduSindhu/Visual_Product_Matcher/blob/main/output2.png?raw=true" width="700" alt="Screenshot 2">
</p>

<p align="center">
  <img src="https://github.com/TuppuduSindhu/Visual_Product_Matcher/blob/main/output3.png?raw=true" width="700" alt="Screenshot 3">
</p>

---



---

## 🎥 Demo Video
[🎬 Click to Watch the Demo Video](https://raw.githubusercontent.com/TuppuduSindhu/Visual_Product_Matcher/main/visual_product_matcher_output_demo.mp4)


🎯 Features Implemented

Image Upload: Users can upload an image using drag & drop or click.  
Visual Similarity Search: Finds and ranks similar products from a dataset of 50 product images.  
Similarity Scores: Each result displays a similarity percentage.  **Responsive UI:** Works smoothly on desktop and mobile screens.  
Progress Bar: Shows live progress while processing images.  
AI-Powered: Uses TensorFlow.js MobileNet model for feature extraction.  
Hosted Online: Live deployment on Vercel.



*********** Technical Requirements & Implementation*********
 
The project fulfills all the technical requirements outlined in the assessment brief.
Image Upload: Implemented using the react-dropzone library, allowing users to easily upload images through drag-and-drop or by selecting a file manually.
View Uploaded Image: Once the user uploads an image, it is immediately displayed as a preview above the search results for clear visual reference.
Display of Similar Products: The application dynamically compares the uploaded image with a dataset of 50 product images. The results are sorted based on cosine similarity scores and shown in a responsive grid layout.
Product Dataset: A local dataset containing 50 product images is stored in the /public/products directory. Each image serves as an example product for similarity comparison.
Mobile Responsive Design: The interface is fully responsive and adapts seamlessly across devices using flexible grid layouts and fluid dimensions.
Error Handling & Loading States: Wrapped in try/catch blocks to ensure smooth error recovery. Real-time progress tracking and loading indicators enhance user experience during model processing.
Deployment: The final version is deployed on Vercel, ensuring reliable cloud hosting and continuous integration with GitHub for automatic updates after each push.

***************Tech Stack Used)************

Frontend Framework: React (Vite)
Machine Learning Library: TensorFlow.js
Pre-trained Model: MobileNet
Algorithm: Cosine Similarity
Styling: Inline CSS
Image Upload: react-dropzone
Hosting Platform: Vercel


*********************Project Structure***********


```
/visual-product-matcher
├── public/
│ ├── bg.jpeg # App background image
│ └── products/ # Product dataset (50 sample images)
│ ├── product1.jpeg
│ ├── product2.jpeg
│ └── ...
├── src/
│ ├── components/
│ │ ├── Upload.jsx # Handles image upload (drag/drop)
│ │ └── Results.jsx # Displays uploaded image + results grid
│ ├── utils/
│ │ └── embeddings.js # ML functions (load model, get embeddings, cosine similarity)
│ ├── App.jsx # Main app logic and UI layout
│ ├── main.jsx # React app entry point
│ └── index.css # Global CSS reset and layout
└── package.json
```
************* How the Application Works************

1. User uploads an image using drag & drop or click.
2. The MobileNet model (TensorFlow.js) generates an embedding vector for the uploaded image.
3. Each product image (from the dataset) is loaded and processed into embeddings.
4. Cosine similarity is calculated between the uploaded image and each product.
5. Results are sorted by similarity score (highest first).
6. The top 10 visually similar products are displayed in a grid with their scores.



************** How to Run Locally *****************

Make sure you have **Node.js (v16+)** installed.


# Clone repository
git clone https://github.com/TuppuduSindhu/Visual_Product_Matcher.git
cd Visual_Product_Matcher

# Install dependencies
npm install

# Run locally
npm run dev


##  Live Deployment

Deployed using **Vercel**
🔗 **Live URL:** [https://visual-product-matcher-a8ko8ov5y-sindhu3.vercel.app/](https://visual-product-matcher-a8ko8ov5y-sindhu3.vercel.app/)

**Deployment Process:**

1. Connected GitHub repo to Vercel.
2. Vercel auto-detected React (Vite) setup.
3. Configured build command: `npm run build`
4. Output directory: `dist`
5. Clicked **Deploy**, and within 2 minutes, the project went live.


************* Project Summary ***************

==>> Visual Product Matcher is an AI-powered web application that identifies visually similar products from an uploaded image. The app leverages **TensorFlow.js** with the **MobileNet model** to generate image feature embeddings directly in the browser. These embeddings are compared against a dataset of product images using **cosine similarity**, allowing the system to find and display top visually similar items.

==>> The frontend is built with **React (Vite)** and provides a clean drag-and-drop interface, real-time progress bar, and a responsive design. The project operates completely on the client side — no backend required — ensuring privacy, speed, and simplicity.

==>> The top matching products are displayed with similarity scores, providing an intuitive visual search experience. The app is deployed to **Vercel** and the source code is available on GitHub. This project demonstrates practical integration of machine learning with modern frontend development and is suitable as a visual search prototype for e-commerce.



**********👩‍💻 Author**************

Sindhu Tuppudu
🔗 [GitHub Profile](https://github.com/TuppuduSindhu)

 ******************* Future Work **************

=> Add a backend using Node.js or Firebase to handle image processing and data storage.

=> Store product data and precomputed embeddings in a database (e.g., MongoDB or Firestore) for faster results.

=> Create an API to send uploaded images to the backend and return similar product results.

=> Include product details like name, category, and price in the results.

=> Add user login and history features to save previous searches.

=> Deploy both frontend and backend on a cloud platform for better scalability.



