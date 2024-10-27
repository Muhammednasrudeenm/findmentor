import React from 'react';

function Payment() {
  const handlePayment = () => {
    // Add payment integration logic
    alert('Payment processing...');
  };

  return (
    <div className="payment">
      <h2>Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;
