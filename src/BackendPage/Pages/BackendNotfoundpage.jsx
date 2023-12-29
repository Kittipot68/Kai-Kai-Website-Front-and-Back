import React from 'react';

function BackendNotfoundpage() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        <p className="text-gray-400 text-lg mt-2">The page you are looking for does not exist.</p>
        <p className="text-gray-400 text-lg mt-2">Back to <a className="text-blue-400" href="/ฺBackend">Home</a></p>
      </div>
    </div>
  );
}

export default BackendNotfoundpage;
