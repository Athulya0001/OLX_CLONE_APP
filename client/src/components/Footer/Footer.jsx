import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-md w-full mt-6 p-6 relative bottom-0 left-0 right-0">
      <div className="container mx-auto flex flex-wrap justify-between items-start gap-8 md:flex-nowrap">
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold text-gray-800">About</h3>
          <p className="text-sm text-gray-600 mt-2">
            Your go-to marketplace for buying and selling products. Find great
            deals and connect with buyers easily.
          </p>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold text-gray-800">Help</h3>
          <ul className="text-sm text-gray-600 mt-2 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-500">
                Customer Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Safety Tips
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold text-gray-800">Features</h3>
          <ul className="text-sm text-gray-600 mt-2 space-y-2">
            <li>
              <a href="#" className="hover:text-blue-500">
                Post Ads
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Secure Payments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Verified Sellers
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
          <div className="flex items-center space-x-4 mt-2">
            <a href="#" className="text-gray-700 hover:text-blue-500">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .597 0 1.33v21.341C0 23.402.595 24 1.325 24h11.495v-9.294H9.288v-3.62h3.533V8.411c0-3.506 2.134-5.416 5.252-5.416 1.51 0 2.804.112 3.179.162v3.69l-2.182.001c-1.712 0-2.047.815-2.047 2.008v2.631h4.09l-.534 3.62h-3.556V24h6.98C23.405 24 24 23.402 24 22.671V1.33C24 .597 23.405 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 4.557a9.993 9.993 0 01-2.828.775 4.934 4.934 0 002.165-2.723 9.865 9.865 0 01-3.127 1.184A4.92 4.92 0 0016.616 3c-2.713 0-4.918 2.205-4.918 4.917 0 .385.045.76.126 1.121C7.691 8.886 4.064 6.764 1.64 3.725a4.882 4.882 0 00-.667 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 01-2.224-.616v.061c0 2.385 1.698 4.374 3.95 4.827a4.903 4.903 0 01-2.216.084 4.927 4.927 0 004.6 3.417 9.866 9.866 0 01-6.102 2.104c-.396 0-.79-.023-1.175-.07A13.945 13.945 0 007.557 21c9.073 0 14.036-7.521 14.036-14.035 0-.214-.004-.428-.014-.64A9.998 9.998 0 0024 4.557z" />
              </svg>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12c0 5.304 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.042-.015-2.046-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.24 1.838 1.24 1.07 1.834 2.805 1.304 3.49.997.108-.776.42-1.304.765-1.604-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.383 1.235-3.222-.123-.304-.535-1.527.117-3.182 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013-.405c1.018.005 2.044.137 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.654 1.655.242 2.878.118 3.182.77.84 1.232 1.913 1.232 3.222 0 4.61-2.804 5.622-5.476 5.92.43.372.82 1.102.82 2.222 0 1.604-.014 2.896-.014 3.296 0 .32.217.69.825.575C20.565 21.796 24 17.303 24 12c0-6.628-5.372-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
