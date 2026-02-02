import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/firebase';
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productData = { id: docSnap.id, ...docSnap.data() };
                    setProduct(productData);

                    // Fetch related products
                    if (productData.category) {
                        const q = query(
                            collection(db, 'products'),
                            where('category', '==', productData.category),
                            limit(5)
                        );
                        const querySnapshot = await getDocs(q);
                        const related = querySnapshot.docs
                            .map(doc => ({ id: doc.id, ...doc.data() }))
                            .filter(p => p.id !== id)
                            .slice(0, 4);
                        setRelatedProducts(related);
                    }
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-darkbg text-white">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-darkbg text-white">Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="bg-darkbg min-h-screen pb-12 text-white">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden">
                            <img
                                src={product.images && product.images[currentImageIndex] ? product.images[currentImageIndex] : product.image} // Fallback for single image structure
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${currentImageIndex === idx ? 'border-accent' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="mb-2">
                            <span className="text-sm text-accent font-medium tracking-wide uppercase">{product.category}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif italic">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-accent">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-gray-600'}`} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400 underline decoration-gray-600 underline-offset-4">{product.reviews || 0} reviews</span>
                        </div>

                        <div className="text-3xl font-semibold mb-8 text-white">₹{product.price?.toLocaleString('en-IN')}</div>

                        <div className="prose prose-sm text-gray-300 mb-8 max-w-none">
                            <p>{product.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-6 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-300">Quantity</span>
                                <div className="flex items-center border border-white/10 rounded-md">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="p-2 hover:bg-white/5 transition-colors text-white"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="p-2 hover:bg-white/5 transition-colors text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.soldOut}
                                    className={`flex-1 px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] ${product.soldOut
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] active:scale-95'
                                        }`}
                                >
                                    {product.soldOut ? 'Sold Out' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Truck className="w-5 h-5 text-gray-300" />
                                </div>
                                <span className="text-xs font-semibold text-white">Free Shipping</span>
                                <span className="text-xs text-gray-500">On orders over ₹5,000</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <RotateCcw className="w-5 h-5 text-gray-300" />
                                </div>
                                <span className="text-xs font-semibold text-white">Easy Returns</span>
                                <span className="text-xs text-gray-500">15-day return policy</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-gray-300" />
                                </div>
                                <span className="text-xs font-semibold text-white">Secure Payment</span>
                                <span className="text-xs text-gray-500">100% secure checkout</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-8 font-serif italic text-white">You might also like</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
