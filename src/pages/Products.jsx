import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import productsJson from '../data/products.json';

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                if (products.length > 0) {
                    setProductsData(products);
                } else {
                    // Fallback to JSON if DB is empty
                    setProductsData(productsJson);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProductsData(productsJson);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // URL Params
    const categoryParam = searchParams.get('category') || '';
    const subCategoryParam = searchParams.get('subCategory') || '';
    const searchParam = searchParams.get('search') || '';

    // Local State
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategoryParam);
    const [priceRange, setPriceRange] = useState(25000);
    const [sortOption, setSortOption] = useState('popularity');

    useEffect(() => {
        setSelectedCategory(categoryParam);
        setSelectedSubCategory(subCategoryParam);
    }, [categoryParam, subCategoryParam]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setSelectedSubCategory(''); // Reset subcat when cat changes
        if (cat) {
            searchParams.set('category', cat);
            searchParams.delete('subCategory');
        } else {
            searchParams.delete('category');
            searchParams.delete('subCategory');
        }
        setSearchParams(searchParams);
    };

    const handleSubCategoryChange = (subCat) => {
        setSelectedSubCategory(subCat);
        if (subCat) {
            searchParams.set('subCategory', subCat);
        } else {
            searchParams.delete('subCategory');
        }
        setSearchParams(searchParams);
    };

    const categories = useMemo(() => [...new Set(productsData.map(p => p.category))], [productsData]);

    // Derive subcategories based on selected category
    const subCategories = useMemo(() => {
        if (!selectedCategory) return [];
        const relevantProducts = productsData.filter(p => p.category === selectedCategory);
        return [...new Set(relevantProducts.map(p => p.subCategory))];
    }, [selectedCategory, productsData]);

    const filteredProducts = useMemo(() => {
        let result = productsData;

        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (selectedSubCategory) {
            result = result.filter(p => p.subCategory === selectedSubCategory);
        }

        if (searchParam) {
            const q = searchParam.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
        }

        result = result.filter(p => p.price <= priceRange);

        if (sortOption === 'price-low-high') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high-low') {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating') {
            result = [...result].sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'popularity') {
            result = [...result].sort((a, b) => b.reviews - a.reviews);
        }

        return result;
    }, [selectedCategory, selectedSubCategory, searchParam, priceRange, sortOption, productsData]);

    return (
        <div className="bg-darkbg min-h-screen pb-12 text-white">
            {/* Header */}
            <div className="bg-cardbg border-b border-white/5 py-8 mb-6">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl font-bold capitalize font-serif italic text-white/90">
                        {searchParam ? `Search: "${searchParam}"` : (
                            selectedSubCategory || selectedCategory || 'All Collection'
                        )}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">{filteredProducts.length} items found</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            ) : (
                <div className="container mx-auto px-4 md:px-6 flex gap-8">
                    <FilterSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                        subCategories={subCategories}
                        selectedSubCategory={selectedSubCategory}
                        onSubCategoryChange={handleSubCategoryChange}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        sortOption={sortOption}
                        onSortChange={setSortOption}
                    />

                    <div className="flex-1">
                        {/* Controls Mobile */}
                        <div className="flex justify-between items-center mb-6 lg:hidden">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-cardbg border border-white/10 rounded-md text-sm font-medium text-white hover:bg-white/5"
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </button>
                            {/* Simplified sort for mobile in sidebar usually, but can be here too */}
                        </div>

                        {/* Controls Desktop */}
                        <div className="hidden lg:flex justify-end items-center mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">Sort by:</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-white border-0"
                                >
                                    <option value="popularity" className="text-black">Popularity</option>
                                    <option value="price-low-high" className="text-black">Price: Low to High</option>
                                    <option value="price-high-low" className="text-black">Price: High to Low</option>
                                    <option value="rating" className="text-black">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('');
                                        setSelectedSubCategory('');
                                        setPriceRange(25000);
                                        setSearchParams({});
                                    }}
                                    className="mt-4 text-accent underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
