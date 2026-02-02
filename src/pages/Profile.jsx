import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, MapPin, CreditCard, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="min-h-screen bg-darkbg py-12 text-white">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-24 h-24 rounded-full bg-white/10 overflow-hidden border border-white/20">
                        <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold font-serif italic">{user.name}</h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sidebar Menu */}
                    <div className="md:col-span-1 space-y-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-cardbg rounded-lg shadow-sm font-medium hover:bg-white/5 transition-colors text-white border-l-4 border-white">
                            <Package className="w-5 h-5 text-gray-300" />
                            Orders
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-cardbg rounded-lg shadow-sm font-medium hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            Addresses
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-cardbg rounded-lg shadow-sm font-medium hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
                            <CreditCard className="w-5 h-5 text-gray-500" />
                            Payment Methods
                        </button>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 bg-cardbg rounded-lg shadow-sm font-medium hover:bg-red-500/10 transition-colors text-red-500"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>

                    {/* Main Content Areas */}
                    <div className="md:col-span-2">
                        <div className="bg-cardbg rounded-xl shadow-sm p-6 border border-white/5">
                            <h2 className="text-xl font-bold mb-6 font-serif italic">Recent Orders</h2>

                            {/* Mock Order */}
                            <div className="border border-white/10 rounded-lg p-4 mb-4 bg-white/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-semibold text-sm text-gray-300">Order #12344</p>
                                        <p className="text-xs text-gray-500">Placed on Jan 15, 2026</p>
                                    </div>
                                    <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-semibold border border-green-500/20">Delivered</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=200&q=80" alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Women's High-Rise Jeans</p>
                                        <p className="text-xs text-gray-400">Qty: 1</p>
                                    </div>
                                    <div className="ml-auto font-bold text-white">₹3,499.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
