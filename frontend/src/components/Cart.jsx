import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import { useCartandAuth } from '../context/AuthProvider';

const Cart = () => {
  // Simulating a book object; in a real application, this would come from context or props
  const { cart } = useCartandAuth();

  console.log(cart);

  const handlePayment = async (amount) => {
    const name = cart[0].name;

    const options = {
      key: "rzp_test_ju5jEL5tkrSPGE",
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: name,
      image: "https://your-logo-url.com",
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        // Additional logic can be added here
      },
      prefill: {
        name: name,
      },
      notify: {
        sms: true,
        email: true,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPrice = cart[0].price; 
    handlePayment(selectedPrice); 
  };

 return (
  <div className="flex h-screen items-center justify-center">
    <div className="w-[600px]">
      <div className="modal-box">
        <form onSubmit={handleSubmit} method="dialog">
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>

          {cart && cart.length > 0 ? (
            <>
              {/* Order ID */}
              <div className="mt-4 space-y-2 text-white">
                <span>Order Id: </span>
<span className="text-pink-400">{cart[0].id}</span>               </div>
              
              {/* Course Name */}
              <div className="mt-4 space-y-2 text-white">
                <span>Course Name: </span>
                <span className="text-pink-400">{cart[0].name}</span>
              </div>
              
              {/* Price */}
              <div className="mt-4 space-y-2 text-white">
                <span>Price: $</span>
                <span className="text-pink-400">{cart[0].price}</span>
              </div>

              {/* Payment Button */}
              <div className="flex justify-around mt-6">
                <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                  Pay Now
                </button>
              </div>
            </>
          ) : (
            <div className="flex w-9- flex-row gap-4">
            <div className="skeleton h-70 w-full"></div></div>
          )}
        </form>
      </div>
    </div>
  </div>
);
}

export default Cart;