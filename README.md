# Virtual Plant Store

## Overview

This is a full-stack e-commerce application designed for buying and selling plants. The platform enables users to browse, purchase, and list plants for sale efficiently.

### Technologies

- **Frontend**: React with Vite and Bootstrap
- **Backend**: Java Spring Boot with MySQL and CORS enabled
- **Database**: MySQL

---

## Features

- User authentication for secure access
- Buy plants from a curated collection
- Sell plants by listing them on the platform
- Search and filter functionality for easy navigation
- Order management for tracking purchases and sales
- Wishlist feature to save favorite plants
- User reviews and ratings for sellers and plants

---

## Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **Java Spring Boot** (v11 or later)
- **MySQL**

---

## Getting Started

### Backend Setup (Java Spring Boot)

1. Clone the repository:

   ```bash
   git clone <https://github.com/Akash-1305/VirtualPlantStoreApplication>
   cd <VIRTUALPLANTSTORE>
   ```

2. Set environment variables (if required):

   - `DB_URL`: MySQL connection URL
   - `DB_USERNAME`: Database username
   - `DB_PASSWORD`: Database password
   - `PORT`: Port number for the backend

   The backend should now be running on `http://localhost:8080` (or the specified port).

### Frontend Setup (React with Vite)

1. Navigate to the frontend directory:

   ```bash
   cd <virtualplantstoreui>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The React app should now be running on `http://localhost:5173` (or the specified port).

---

## Frontend Structure

### Components

- **PlantList**: Displays all available plants.
- **PlantDetail**: Shows details of a selected plant.
- **PlantCreate**: Form for adding a new plant listing.
- **PlantUpdate**: Form for editing existing plant details.
- **OrderHistory**: Displays user orders.

---

## CORS Configuration

The backend is configured to allow CORS to enable communication between the React frontend and the Spring Boot backend.

---

## MySQL Configuration

Ensure MySQL is running and properly configured. Update the `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` environment variables as necessary.

---

## License

This project is licensed under the MIT License.

---

## Contributions

Contributions are welcome! Please fork the repository and create a pull request.

---

## Issues

If you encounter any issues, feel free to open an issue in the GitHub repository and contact: akash20050513@gmail.com.

---

## Acknowledgments

Thanks to the creators of React, Vite, Bootstrap, Java Spring Boot, and MySQL for making this project possible.
