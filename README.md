# Modern E-Commerce Frontend

A modern, responsive, and minimalist e-commerce frontend built with React, Vite, and Tailwind CSS.

## Features

- **Storefront**: Hero banner, featured products, category navigation.
- **Product Filtering**: Sidebar with category, price range, and search filtering.
- **Product Details**: Image gallery, ratings, reviews, and related products.
- **Shopping Cart**: Full cart management (add, remove, update quantities) with persistence.
- **Checkout**: Multi-step checkout process (Shipping -> Payment -> Confirmation).
- **Authentication**: Mock login/signup with user profile management.
- **Responsive Design**: Optimized for mobile, tablet, and desktop.

## Tech Stack

- **React**: UI Library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **Lucide React**: Icons
- **Context API**: State Management (Cart & Auth)

## How to Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Folder Structure

- `src/components`: Reusable UI components (Navbar, ProductCard, buttons, etc.)
- `src/pages`: Page components (Home, Products, Cart, etc.)
- `src/context`: React Context providers (CartContext, AuthContext)
- `src/data`: Mock data (products.json)
- `src/App.jsx`: Main application component with routing configuration.
