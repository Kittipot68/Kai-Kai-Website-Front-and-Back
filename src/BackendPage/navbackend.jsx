import React from 'react';
import { Link } from 'react-router-dom';

function Navbackend({ children }) {
  return (
    <div className="lg:flex h-screen">

      {/* Sidebar (visible on large screens) */}
      <div className="lg:w-1/5 bg-gray-800 text-white">
        <div className="p-4">
          {/* Sidebar content with links */}
          <ul className="space-y-4">

            {/* Dashboard link */}
         

            {/* Other links */}
            <li>
              <Link to="/HomeBackend" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/AboutBackend" className="hover:text-gray-300">About</Link>
            </li>
           
            <li>
              <Link to="/AffiliateBackend" className="hover:text-gray-300">Affiliate</Link>
            </li>
            <li>
              <Link to="/ProductBackend" className="hover:text-gray-300">Product</Link>
            </li>
            <li>
              <Link to="/RecipeBackend" className="hover:text-gray-300">Recipe</Link>
            </li>
           
            <li>
              <Link to="/ContactBackend" className="hover:text-gray-300">Contact</Link>
            </li>

            <li>
              <Link to="/HeaderBackend" className="hover:text-gray-300">Header</Link>
            </li>

            {/* Uncomment the line below if needed */}
            {/* <li><Link to="/backend/FileUploadForm" className="hover:text-gray-300">File Upload</Link></li> */}

          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:w-4/5 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Navbackend;
