import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProductCard from './ProductCard';

const FeaturedCarousel = ({ products }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="py-24 overflow-hidden bg-darkbg relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4"
                >
                    <div>
                        <span className="text-accent uppercase tracking-widest text-sm font-medium">New Arrivals</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 font-serif italic">
                            Trending Now
                        </h2>
                    </div>
                    <div className="h-[1px] flex-1 bg-white/10 mx-8 hidden md:block"></div>
                    <a href="/products" className="text-white/70 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                        View All <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>

                <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide perspective-1000">
                    {products.slice(0, 5).map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50, rotateX: 10 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.8, type: "spring", stiffness: 50 }}
                            className="min-w-[280px] md:min-w-[320px] snap-center group"
                        >
                            <div className="relative hover:-translate-y-2 transition-transform duration-500 ease-out">
                                <ProductCard product={product} />
                                {/* Futuristic Border Glow on Hover */}
                                <div className="absolute inset-0 rounded-xl ring-1 ring-white/0 group-hover:ring-white/20 transition-all duration-500 pointer-events-none"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedCarousel;
