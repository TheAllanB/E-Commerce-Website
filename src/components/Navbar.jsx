import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { getCartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-darkbg/90 backdrop-blur-md border-b border-white/10 z-50">
            <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="bg-white text-black px-2 py-1 rounded text-sm font-serif">C</span>
                    <span className="font-serif italic font-medium">CMR Fashion</span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search for clothes..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-white/10 bg-white/5 text-white focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </form>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Shop
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white">
                                <User className="w-5 h-5" />
                                <span>{user.displayName ? user.displayName.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'User')}</span>
                            </Link>

                            {/* Admin Link */}
                            {user.email === 'testadmin@mail.com' && (
                                <Link to="/admin" className="px-3 py-1 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
                                    ADMIN
                                </Link>
                            )}

                            <button onClick={logout} title="Logout" className="text-gray-400 hover:text-red-500">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white">
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="relative group">
                        <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-accent text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-darkbg border-b border-white/10 p-4 absolute w-full top-16 left-0 flex flex-col gap-4 shadow-lg">
                    <form onSubmit={handleSearch} className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </form>

                    <Link to="/products" className="py-2 border-b border-white/10 text-white" onClick={() => setIsMenuOpen(false)}>
                        Shop All
                    </Link>

                    {user ? (
                        <>
                            <Link to="/profile" className="py-2 border-b border-white/10 flex items-center justify-between text-white" onClick={() => setIsMenuOpen(false)}>
                                Profile ({user.displayName || user.email})
                                <User className="w-4 h-4" />
                            </Link>
                            {user.email === 'testadmin@mail.com' && (
                                <Link to="/admin" className="py-2 border-b border-white/10 text-white font-bold" onClick={() => setIsMenuOpen(false)}>
                                    Admin Panel
                                </Link>
                            )}
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="py-2 text-left text-red-500">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="py-2 text-white" onClick={() => setIsMenuOpen(false)}>
                            Login / Signup
                        </Link>
                    )}
                    <Link to="/cart" className="py-2 flex items-center justify-between text-white" onClick={() => setIsMenuOpen(false)}>
                        Cart
                        <div className="flex items-center gap-2">
                            <span className="bg-accent text-black text-xs px-2 py-0.5 rounded-full">{getCartCount()}</span>
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
