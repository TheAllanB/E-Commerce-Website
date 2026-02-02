import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    // Note: For FormSubmit to work 100%, the user needs to activate the endpoint from their email once.
    // We will use the 'target=" _blank"' or handle it with fetch for better UX if needed, 
    // but formsubmit recommends simple HTML form post for reliability.

    return (
        <div className="bg-darkbg text-white min-h-screen">
            <div className="bg-cardbg py-20 border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif italic mb-4">Contact CMR Fashion</h1>
                    <p className="text-gray-400 max-w-xl mx-auto">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold mb-6">Get in touch</h2>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Our Location</h3>
                                <p className="text-gray-400">123 Fashion Avenue, Design District,<br />Mumbai, India 400001</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                                <p className="text-gray-400">+91 98765 43210</p>
                                <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Email</h3>
                                <p className="text-gray-400">hello@cmrfashion.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-cardbg p-8 rounded-2xl border border-white/5 shadow-2xl">
                        <form action="https://formsubmit.co/hello@cmrfashion.com" method="POST">
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="http://localhost:5173/contact" />
                            <input type="hidden" name="_subject" value="CMR Fashion Contact Form Submission" />

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                                        <input type="text" name="name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-white" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                                        <input type="text" name="last_name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-white" placeholder="Doe" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                                    <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-white" placeholder="john@example.com" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                                    <textarea name="message" rows="4" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-white resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button type="submit" className="w-full bg-white text-black py-4 rounded-full font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
