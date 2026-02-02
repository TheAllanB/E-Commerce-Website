import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ title, img, size }) => (
    <motion.div
        whileHover={{ scale: 0.98, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={`relative rounded-3xl overflow-hidden group cursor-pointer ${size} border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500`}
    >
        <div className="absolute inset-0 bg-neutral-900">
            <img
                src={img}
                alt={title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 ease-out group-hover:scale-110 transform"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        {/* Animated Border */}
        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-3xl transition-colors duration-500"></div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
                <span className="text-xs text-accent uppercase tracking-widest font-medium opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 block mb-1">Explore</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">{title}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
            </div>
        </div>
        <Link to={`/products?category=${title}`} className="absolute inset-0"></Link>
    </motion.div>
);

const CategoryBento = () => {
    return (
        <div className="py-24 bg-darkbg relative border-t border-white/5">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent uppercase tracking-widest text-sm font-medium">Discover</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 font-serif italic">
                        Curated Collections
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
                    <CategoryCard
                        title="Urban Streetwear"
                        img="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80"
                        size="md:col-span-2 md:row-span-2"
                    />
                    <CategoryCard
                        title="Sustainable"
                        img="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80"
                        size="md:col-span-1 md:row-span-1"
                    />
                    <CategoryCard
                        title="Accessories"
                        img="https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80"
                        size="md:col-span-1 md:row-span-1"
                    />
                    {/* Added an extra card to balance the grid if needed, or keeping as is */}
                </div>
            </div>
        </div>
    );
};

export default CategoryBento;
