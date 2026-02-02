import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const Admin = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Men',
        subCategory: '',
        price: '',
        description: '',
        image: '',
        stock: '',
        soldOut: false
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return; // Wait for auth to initialize
        if (!user || user.email !== 'testadmin@mail.com') {
            navigate('/');
        } else {
            fetchProducts();
        }
    }, [user, authLoading, navigate]);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
                setProducts(products.filter(product => product.id !== id));
                setMessage('Product deleted successfully!');
            } catch (error) {
                console.error("Error deleting product:", error);
                setMessage('Error deleting product.');
            }
        }
    };

    const handleToggleSoldOut = async (product) => {
        try {
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, { soldOut: !product.soldOut });
            setProducts(products.map(p => p.id === product.id ? { ...p, soldOut: !p.soldOut } : p));
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating status");
        }
    };

    if (authLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!user || user.email !== 'testadmin@mail.com') return null;

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                rating: 0,
                reviews: 0,
                colors: [], // Simplified for now
                images: [formData.image] // Store as array to match simplified json structure
            };

            await addDoc(collection(db, 'products'), productData);
            setMessage('Product added successfully!');
            setFormData({
                name: '',
                category: 'Men',
                subCategory: '',
                price: '',
                description: '',
                image: '',
                stock: '',
                soldOut: false
            });
            await fetchProducts(); // Refresh list explicitly
        } catch (error) {
            console.error('Error adding product: ', error);
            setMessage('Error adding product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel - Add Product</h1>

            {message && <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{message}</div>}

            <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
                <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded text-black" />

                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded text-black" required>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>

                <input name="subCategory" placeholder="Sub Category (e.g., Sherwanis)" value={formData.subCategory} onChange={handleChange} required className="w-full p-2 border rounded text-black" />

                <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded text-black" />

                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded text-black" />

                <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="w-full p-2 border rounded text-black" />

                <input name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={handleChange} required className="w-full p-2 border rounded text-black" />

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="soldOut" id="soldOut" checked={formData.soldOut} onChange={handleChange} className="w-5 h-5 accent-black" />
                    <label htmlFor="soldOut" className="font-medium cursor-pointer">Mark as Sold Out</label>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 disabled:bg-gray-400">
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

                <input
                    type="text"
                    placeholder="Search products by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-6 border rounded text-black"
                />

                <div className="grid gap-4">
                    {products.filter(p =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded bg-white shadow-sm">
                            <div className="flex items-center gap-4">
                                <img src={product.images && product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-bold text-black">{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-500">₹{product.price}</p>
                                        {product.soldOut && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">Sold Out</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggleSoldOut(product)}
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${product.soldOut ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {product.soldOut ? 'Mark Available' : 'Mark Sold Out'}
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
