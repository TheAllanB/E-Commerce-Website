import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const FilterSidebar = ({
    isOpen,
    onClose,
    categories,
    selectedCategory,
    onCategoryChange,
    subCategories,
    selectedSubCategory,
    onSubCategoryChange,
    priceRange,
    onPriceChange,
    sortOption,
    onSortChange
}) => {
    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-72 bg-cardbg p-6 shadow-2xl transform transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:shadow-none lg:z-0 lg:w-64 lg:block border-r border-white/5 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex justify-between items-center mb-8 lg:hidden">
                    <h2 className="text-xl font-bold text-white">Filters</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Sort Mobile */}
                    <div className="lg:hidden">
                        <h3 className="font-semibold mb-3 text-white">Sort By</h3>
                        <select
                            value={sortOption}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="w-full p-2 bg-darkbg border border-white/10 rounded-md text-gray-300 focus:outline-none focus:border-accent"
                        >
                            <option value="popularity">Popularity</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                            <option value="rating">Average Rating</option>
                        </select>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white uppercase tracking-wider text-sm">Categories</h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCategory === '' ? 'border-accent' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                    {selectedCategory === '' && <div className="w-2 h-2 rounded-full bg-accent" />}
                                </div>
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === ''}
                                    onChange={() => onCategoryChange('')}
                                    className="hidden"
                                />
                                <span className={selectedCategory === '' ? 'text-white font-medium' : 'text-gray-500 group-hover:text-gray-300 transition-colors'}>All Collection</span>
                            </label>

                            {categories.map(cat => (
                                <div key={cat}>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCategory === cat ? 'border-accent' : 'border-gray-600 group-hover:border-gray-400'}`}>
                                            {selectedCategory === cat && <div className="w-2 h-2 rounded-full bg-accent" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat}
                                            onChange={() => onCategoryChange(cat)}
                                            className="hidden"
                                        />
                                        <span className={selectedCategory === cat ? 'text-white font-medium' : 'text-gray-500 group-hover:text-gray-300 transition-colors'}>{cat}</span>
                                    </label>

                                    {/* Subcategories */}
                                    {selectedCategory === cat && subCategories && subCategories.length > 0 && (
                                        <div className="ml-7 mt-2 space-y-2 animate-fade-in-up">
                                            <label className="block cursor-pointer">
                                                <input
                                                    type="radio"
                                                    className="hidden"
                                                    checked={selectedSubCategory === ''}
                                                    onChange={() => onSubCategoryChange('')}
                                                />
                                                <span className={`text-sm ${selectedSubCategory === '' ? 'text-accent' : 'text-gray-500 hover:text-gray-400'}`}>All {cat}</span>
                                            </label>
                                            {subCategories.map(sub => (
                                                <label key={sub} className="block cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        className="hidden"
                                                        checked={selectedSubCategory === sub}
                                                        onChange={() => onSubCategoryChange(sub)}
                                                    />
                                                    <span className={`text-sm ${selectedSubCategory === sub ? 'text-accent' : 'text-gray-500 hover:text-gray-400'}`}>{sub}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-semibold mb-4 text-white uppercase tracking-wider text-sm">Max Price: ₹{priceRange.toLocaleString('en-IN')}</h3>
                        <input
                            type="range"
                            min="0"
                            max="25000"
                            step="500"
                            value={priceRange}
                            onChange={(e) => onPriceChange(Number(e.target.value))}
                            className="w-full accent-accent h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>₹0</span>
                            <span>₹25,000+</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default FilterSidebar;
