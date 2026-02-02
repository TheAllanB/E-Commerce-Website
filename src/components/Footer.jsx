import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 border-t border-white/10 pt-16 pb-8 text-gray-400">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <span className="bg-white text-black px-2 py-1 rounded text-sm font-serif">C</span>
                            <span className="font-serif italic text-white">CMR Fashion</span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Redefining modern elegance with a curated collection of premium fashion for men, women, and children.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-serif italic">Shop</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/products?category=Men" className="hover:text-white transition-colors">Men's Collection</Link></li>
                            <li><Link to="/products?category=Women" className="hover:text-white transition-colors">Women's Collection</Link></li>
                            <li><Link to="/products?category=Kids" className="hover:text-white transition-colors">Kids' Collection</Link></li>
                            <li><Link to="/products" className="hover:text-white transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-serif italic">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-serif italic">Get in Touch</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>123 Fashion Avenue, Design District, Mumbai, India 400001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                                <span>hello@cmrfashion.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; 2026 CMR Fashion. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed with style.</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
