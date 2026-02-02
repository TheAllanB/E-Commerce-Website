import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FeaturedCarousel from '../components/FeaturedCarousel';
import CategoryBento from '../components/CategoryBento';
import productsData from '../data/products.json';
import { motion } from 'framer-motion';

const Home = () => {
    const [products, setProducts] = useState(productsData);

    // Filter Logic if needed, for now using raw data

    return (
        <div className="bg-darkbg min-h-screen text-white">
            <Hero />

            <div id="shop">
                <FeaturedCarousel products={products} />
            </div>

            <CategoryBento />

            {/* Newsletter Section - Holographic */}
            <div className="py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                >
                    <div className="bg-black/90 backdrop-blur-xl rounded-3xl p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Join the Future of Fashion</h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
                            Get exclusive access to limited drops and holographic wearables.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                            />
                            <button className="bg-accent text-black font-bold px-8 py-3 rounded-full hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
