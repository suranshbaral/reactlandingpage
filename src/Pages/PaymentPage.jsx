import  { useState, useEffect } from 'react';
import axios from 'axios';
import esewaLogo from '../assets/esewa.png';
import khaltiLogo from '../assets/khalti.png';

function PaymentPage() {
  const [fadeIn, setFadeIn] = useState(false);
  const [cart, setCart] = useState({
    ticket_total: 0,
    sub_total: 0,
    grand_total: 0
  });

  useEffect(() => {
    setFadeIn(true);
    // Fetch cart details from backend (Placeholder for now)
    setCart({
      ticket_total: 750,
      sub_total: 750,
      grand_total: 750
    });
  }, []);

  const handlePayment = async (paymentMethod) => {
    console.log(`Payment initiated with ${paymentMethod}`);

    // Simulate payment initiation for Khalti
    if (paymentMethod === 'khalti') {
      try {
        const response = await axios.post('/verify-payment/', {
          token: 'transaction_token_from_khalti_sdk',
          amount: cart.grand_total.toFixed(2)  // Ensure amount is in correct format
        });

        console.log('Payment verification response:', response.data);

        if (response.data.status) {
          // Payment verification success
          alert('Payment successful!');
          // Handle next steps after successful payment
        } else {
          // Payment verification failed
          alert('Payment verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during payment verification:', error);
        alert('Error during payment verification. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className={`flex flex-col w-full max-w-2xl p-8 bg-white rounded-[30px] shadow-2xl transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-3xl font-bold mb-6 text-orange-500">My Cart</h1>

        <div className="flex flex-col mb-6">
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="text-lg text-red-500">Ticket Total</span>
            <span className="text-lg text-gray-700">Rs. {cart.ticket_total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span className="text-lg text-gray-700">Sub Total</span>
            <span className="text-lg text-gray-700">Rs. {cart.sub_total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-4">
            <span className="text-xl font-bold text-orange-500">Grand Total</span>
            <span className="text-xl font-bold text-orange-500">Rs. {cart.grand_total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => handlePayment('esewa')}
            className="flex items-center justify-center w-40 py-2 px-4 border border-gray-300 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600 transition transform hover:scale-105"
          >
            <img src={esewaLogo} alt="eSewa" className="w-6 h-6 mr-2" />
            eSewa
          </button>
          <button
            onClick={() => handlePayment('khalti')}
            className="flex items-center justify-center w-40 py-2 px-4 border border-gray-300 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition transform hover:scale-105"
          >
            <img src={khaltiLogo} alt="Khalti" className="w-6 h-6 mr-2" />
            Khalti
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
