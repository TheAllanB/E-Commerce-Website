import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const navigate = useNavigate();

    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 500;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-darkbg text-white">
                <h2 className="text-2xl font-bold mb-4 font-serif italic">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added any style to your cart yet.</p>
                <Link
                    to="/products"
                    className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darkbg py-12 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-bold mb-8 font-serif italic">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-cardbg p-4 rounded-xl shadow-sm flex gap-4 md:gap-6 items-center border border-white/5">
                                <div className="w-24 h-24 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <Link to={`/products/${item.id}`} className="font-semibold text-lg hover:underline decoration-1 hover:text-gray-300 text-white">
                                            {item.name}
                                        </Link>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">{item.category}</p>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center border border-white/10 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1.5 hover:bg-white/5 transition-colors disabled:opacity-50 text-white"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1.5 hover:bg-white/5 transition-colors text-white"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-lg text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:w-96">
                        <div className="bg-cardbg p-6 rounded-xl shadow-sm sticky top-24 border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-white font-serif italic">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg text-white">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-4 text-center">
                                <Link to="/products" className="text-sm text-gray-500 hover:text-white underline transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
