import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';
import productsData from '../data/products.json';

const seedDatabase = async () => {
    try {
        console.log("Starting database seed...");

        // Optional: Check if products already exist to avoid duplicates
        // For simplicity, we'll just add them. In real world, check first.
        const productsCollection = collection(db, 'products');

        // Using batch for efficiency if < 500 items, but loop for simplicity/size
        let count = 0;
        for (const product of productsData) {
            // Remove 'id' from json to let Firestore generate auto-id, 
            // OR keep it if you want to query by that specific ID. 
            // We'll let Firestore generate IDs for cleaner backend data.
            const { id, ...productWithoutId } = product;

            await addDoc(productsCollection, {
                ...productWithoutId,
                // Ensure numbers are numbers
                price: Number(product.price),
                stock: Number(product.stock),
                rating: Number(product.rating),
                reviews: Number(product.reviews)
            });
            count++;
        }

        console.log(`Successfully added ${count} products to Firestore!`);
        alert(`Successfully added ${count} products to Firestore!`);
    } catch (error) {
        console.error("Error seeding database:", error);
        alert("Error seeding database. Check console.");
    }
};

export default seedDatabase;
