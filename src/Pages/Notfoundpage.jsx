import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center">404 Not Found</h1>
      <p className="text-lg mb-8 text-center">Sorry, the page you're looking for does not exist.</p>
      <Link to="/" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition duration-300 ease-in-out">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
