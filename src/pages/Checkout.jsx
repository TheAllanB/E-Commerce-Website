import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Shipping State
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    });

    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 500;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const orderData = {
                userId: user ? user.uid : 'guest',
                userEmail: user ? user.email : shippingInfo.email,
                items: cart,
                amount: total,
                shippingInfo,
                status: 'pending',
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'orders'), orderData);

            // Simulate payment processing delay
            setTimeout(() => {
                setLoading(false);
                setStep(3);
                clearCart();
            }, 1000);
        } catch (error) {
            console.error("Error placing order: ", error);
            setLoading(false);
            alert('Failed to place order. Please try again.');
        }
    };

    if (step === 3) {
        return (
            <div className="min-h-screen bg-darkbg flex items-center justify-center text-white">
                <div className="bg-cardbg p-12 rounded-2xl shadow-lg text-center max-w-md w-full animate-fade-in-up border border-white/5">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 font-serif italic">Order Placed!</h2>
                    <p className="text-gray-400 mb-8">Thank you for your purchase. Your order #12345 has been confirmed.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darkbg py-12 text-white">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Form Section */}
                    <div className="flex-1">
                        <div className="bg-cardbg p-8 rounded-xl shadow-sm mb-6 border border-white/5">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 font-serif italic">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic font-sans ${step === 1 ? 'bg-white text-black' : 'bg-white/10 text-gray-500'}`}>1</span>
                                Shipping Information
                            </h2>
                            {step === 1 && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
                                            <input name="firstName" value={shippingInfo.firstName} onChange={handleInputChange} required type="text" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
                                            <input name="lastName" value={shippingInfo.lastName} onChange={handleInputChange} required type="text" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                                        <input name="email" value={shippingInfo.email} onChange={handleInputChange} required type="email" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Address</label>
                                        <input name="address" value={shippingInfo.address} onChange={handleInputChange} required type="text" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-300">City</label>
                                            <input name="city" value={shippingInfo.city} onChange={handleInputChange} required type="text" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-300">State</label>
                                            <input name="state" value={shippingInfo.state} onChange={handleInputChange} required type="text" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium mb-2 text-gray-300">Zip</label>
                                            <input name="zip" value={shippingInfo.zip} onChange={handleInputChange} required type="text" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 focus:ring-1 focus:ring-accent focus:border-transparent outline-none text-white placeholder-gray-600" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                                        Continue to Payment
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="bg-cardbg p-8 rounded-xl shadow-sm opacity-100 transition-opacity border border-white/5">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 font-serif italic">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm not-italic font-sans ${step === 2 ? 'bg-white text-black' : 'bg-white/10 text-gray-500'}`}>2</span>
                                Payment Method
                            </h2>
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="border border-white bg-white/5 p-4 rounded-lg flex items-center gap-4 cursor-pointer">
                                        <CreditCard className="w-6 h-6 text-white" />
                                        <span className="font-medium text-white">Credit / Debit Card</span>
                                    </div>
                                    {/* Mock Card Input */}
                                    <div className="space-y-4 pt-4">
                                        <input type="text" placeholder="Card Number" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 outline-none text-white placeholder-gray-600" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="MM/YY" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 outline-none text-white placeholder-gray-600" />
                                            <input type="text" placeholder="CVC" className="w-full border border-white/10 bg-white/5 rounded-lg px-4 py-2 outline-none text-white placeholder-gray-600" />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(1)} className="px-6 py-3 text-gray-400 font-medium hover:text-white">
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePayment}
                                            disabled={loading}
                                            className="flex-1 bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 flex items-center justify-center"
                                        >
                                            {loading ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:w-80">
                        <div className="bg-cardbg p-6 rounded-xl shadow-sm sticky top-24 border border-white/5">
                            <h3 className="font-bold text-lg mb-4 font-serif italic">Order Summary</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg text-white">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
