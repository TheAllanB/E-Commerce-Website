import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="group relative">
            <div className="aspect-[4/5] bg-neutral-900 rounded-2xl overflow-hidden relative">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100 ${product.soldOut ? 'grayscale opacity-50' : 'group-hover:scale-105'}`}
                        loading="lazy"
                    />
                    {product.soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="bg-red-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wider rounded">Sold Out</span>
                        </div>
                    )}
                </Link>
                {/* Quick Add Button - Only show if not sold out */}
                {!product.soldOut && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-black p-3 rounded-full shadow-sm translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-black"
                        title="Add to Cart"
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="mt-3 flex justify-between items-start">
                <div>
                    <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                    <Link to={`/products/${product.id}`}>
                        <h3 className="text-sm font-medium text-gray-100 line-clamp-1 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                    </Link>
                </div>
                <p className="text-sm font-semibold text-white">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex items-center mt-1 text-accent">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs text-gray-500 ml-1">{product.rating} ({product.reviews})</span>
            </div>
        </div>
    );
};

export default ProductCard;
