import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await login(email, password);
            navigate(-1); // Go back to where they were
        } catch (err) {
            console.error(err);
            setError('Failed to login: ' + err.message);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm max-w-md w-full">
                <h1 className="text-3xl font-bold mb-2">Login to CMR Fashion</h1>
                <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-black"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-black"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                        Sign in
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account? <Link to="/signup" className="text-black font-semibold hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
