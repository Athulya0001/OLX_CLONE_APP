import React from 'react'

const CategoryMenu = () => {
    return (
      <section className="pt-16">
        <div className="flex flex-col container mx-auto">
          <div className="flex items-center">
            {/* Category Menu */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="hidden md:flex items-center">
                <span className="font-bold text-sm mr-1">All Categories</span>
                <button>
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
  
            {/* Quick Options */}
            <div className="hidden md:flex space-x-4 mb-4">
              {[
                "Cars",
                "Motorcycles",
                "Mobile Phones",
                "For Sale: Houses and Apartments",
                "Scooters",
                "Commercial & Other Vehicles",
                "For Rent: Houses and Apartments",
              ].map((category, index) => (
                <span key={index} className="cursor-pointer p-2">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CategoryMenu;  