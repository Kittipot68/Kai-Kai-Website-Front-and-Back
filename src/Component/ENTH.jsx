import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

const ENTH = ({ onCloseMobileMenu  }) => {
  // Retrieve the language from local storage or default to 'th'
  const { currentLanguage, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Save the selected language to local storage
    localStorage.setItem('selectedLanguage', currentLanguage);

    // Add event listener to close dropdown on click outside
    document.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [currentLanguage]);

  const handleLanguageSwitch = (newLanguage) => {
    // Switch the language using the provided switchLanguage function
    switchLanguage(newLanguage);

    // Close the dropdown
    setIsOpen(false);
    window.location.reload();

  };

  const handleOutsideClick = (event) => {
    // Close the dropdown if the clicked element is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    // Call the onCloseMobileMenu function to close the mobile menu
    onCloseMobileMenu();
    // Additional logic for ENTH click, if needed
  };

  return (
    <div onClick={handleClick}>

    <div className="relative ml-auto whitespace-nowrap" ref={dropdownRef}>
      <div className="flex items-center">
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="shadow-md px-3 py-2 rounded-md text-lg text-gray-600 font-bold focus:outline-none"
>
  {currentLanguage === 'th'
    ? 'ภาษาไทย'
    : currentLanguage === 'en'
    ? 'English'
    : currentLanguage === 'cn'
    ? '中国 |'
    : currentLanguage === 'jpn'
    ? '日本の'
    : ''}
  <i className="ml-2 fa-solid fa-caret-down"></i>
</button>

      </div>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg">
          <div
            onClick={() => handleLanguageSwitch('th')}
            className="cursor-pointer py-2 px-4 hover:bg-gray-200"
          >
            ภาษาไทย
          </div>
          <div
            onClick={() => handleLanguageSwitch('en')}
            className="cursor-pointer py-2 px-4 hover:bg-gray-200"
          >
            English
          </div>
          <div
            onClick={() => handleLanguageSwitch('jpn')}
            className="cursor-pointer py-2 px-4 hover:bg-gray-200"
          >
            日本の
          </div>
          <div
            onClick={() => handleLanguageSwitch('cn')}
            className="cursor-pointer py-2 px-4 hover:bg-gray-200"
          >
             中国 | 
          </div>
          {/* <div
            onClick={() => handleLanguageSwitch('jpn')}
            className="cursor-pointer py-2 px-4 hover:bg-gray-200"
          >
            JPN
          </div> */}
        </div>
      )}
    </div>
    </div>

  );
};

export default ENTH;
