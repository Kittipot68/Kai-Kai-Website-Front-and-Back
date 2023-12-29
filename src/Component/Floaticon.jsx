import React from 'react';
import { Tooltip } from 'react-tooltip';
import shopee from '../assets/shopee-icon (3).png';

function Floaticon({ children }) {
  const iconClasses = "bg-white shadow-md rounded-md bg-white p-2 mr-2 transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg ";

  return (
    <div>
      {children}
      <div className=" fixed  right-0 mt-3 gap-2 mb-3 text-center flex flex-col items-start p-4 z-10">

        <a href="https://lin.ee/544UdNR" target="_blank" rel="noopener noreferrer">
          <i
            className={`cursor-pointer text-green-500 fab fa-line my-anchor-element-line text-4xl  xxl:text-5xl ${iconClasses}`}
            data-tip="Tooltip content for Line"
          ></i>
        </a>

        <a href="https://shopee.co.th/sunfoodnae" target="_blank" rel="noopener noreferrer">
          <img
            src={shopee}
            alt="Shopee Icon"
            className={` cursor-pointer my-anchor-element-shopee text-white ${iconClasses} `}
            data-tip="Tooltip content for Shopee"
          />
        </a>

        <a href="https://www.facebook.com/sunfoodTH/" target="_blank" rel="noopener noreferrer">
          <i
            className={`cursor-pointer text-blue-500 fab fa-facebook my-anchor-element-face text-4xl  xxl:text-5xl ${iconClasses}`}
            data-tip="Tooltip content for Facebook"
          ></i>
        </a>

        <Tooltip anchorSelect=".my-anchor-element-line" content="Line Sungroup Official" place="left" effect="solid" className="tooltip lg:text-sm xl:text-base" />
        <Tooltip anchorSelect=".my-anchor-element-shopee " content="Shopee Sunfoodnae" place="left" effect="solid" className="tooltip lg:text-sm xl:text-base" />
        <Tooltip anchorSelect=".my-anchor-element-face" content="FaceBook Sungroup" place="left" effect="solid" className="tooltip lg:text-sm xl:text-base" />
      </div>
    </div>
  );
}

export default Floaticon;
