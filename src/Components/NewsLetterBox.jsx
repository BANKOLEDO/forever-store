import { useState } from "react";

const NewsLetterBox = () => {
  const [showModal, setShowModal] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-500 mt-3">
        Be the first to know about new arrivals, sales & promos!
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              🎉 Subscription Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              You’ve been subscribed. Check your inbox for a welcome email
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsLetterBox;
