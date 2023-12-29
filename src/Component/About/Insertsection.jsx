import React from 'react';

function InsertSection({ content1, content2, image1, image2 }) {
  return (
    <div className="pt-8">
      <div className="flex flex-wrap">
        <div className="w-1/2 flex items-center justify-center">
          <p>{content1}</p>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img src={image1} alt="Image 1" />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img src={image2} alt="Image 2" />
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <p>{content2}</p>
        </div>
      </div>
    </div>
  );
}

export default InsertSection;
