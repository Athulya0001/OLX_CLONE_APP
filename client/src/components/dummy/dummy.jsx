import React, { useState } from "react";

const MultiLevelDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Handling Category Change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedOption(""); // Reset option when category changes
  };

  // Handling Option Change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Get options based on selected category
  const getOptions = () => {
    const selectedCategoryObj = categories.find(
      (category) => category.label === selectedCategory
    );
    return selectedCategoryObj ? selectedCategoryObj.options : [];
  };

  return (
    <div>
      <label htmlFor="category">Select Category</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">--Select Category--</option>
        {categories.map((category, index) => (
          <option key={index} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <label htmlFor="options">Select Option</label>
          <select
            id="options"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">--Select Option--</option>
            {getOptions().map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedCategory && selectedOption && (
        <p>
          You selected: {selectedCategory} - {selectedOption}
        </p>
      )}
    </div>
  );
};

export default MultiLevelDropdown;
