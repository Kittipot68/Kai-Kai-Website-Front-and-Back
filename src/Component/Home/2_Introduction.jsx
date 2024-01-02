import React, { useState, useEffect } from 'react';
import pic from '../../assets/download.jpg'; // Ensure to import your images correctly

function Introduction() {
  const [introductiondata, setIntroductionData] = useState([]);

  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
  
    try {
      // Fetch data based on the selected language
      const response = await fetch('https://sungroup.co.th/Php-Api/Home.php');
      const fetchedData = await response.json();
  
      // Map over the array and conditionally select content for different languages
      const transformedData = fetchedData.map((item) => ({
        ...item,
        content:
          selectedLanguage === 'en'
            ? item.content_en
            : selectedLanguage === 'jpn'
            ? item.content_jpn
            : selectedLanguage === 'cn'
            ? item.content_cn
            : item.content,
        description:
          selectedLanguage === 'en'
            ? item.description_en
            : selectedLanguage === 'jpn'
            ? item.description_jpn
            : selectedLanguage === 'cn'
            ? item.description_cn
            : item.description,
      }));
  
      // Filter the data based on a specific criterion (e.g., type === 'introduction')
      const filteredData = transformedData.filter((item) => item.type === 'introduction');
  
      // You can now use the 'filteredData' in your component
      setIntroductionData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  return (
    <div>

   
    <div className="background-container" style={{ position: 'relative' }}>
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: `70%`,
          background: `rgb(243,235,248)`,
          background: `linear-gradient(90deg, rgba(243,235,248,1) 0%, rgba(253,29,29,1) 50%, rgba(255,0,0,1) 100%)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        className=" gradient-bg"
      />
  
      {/* Introduction Grid */}
      <div className="container p-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4  ">
        {introductiondata.map((item, index) => (
          <div
            key={index}
            className="border-gray-200 shadow-md relative rounded-lg bg-white hover:transform hover:scale-105 p-4 text-center transition duration-300 ease-in-out transform hover:shadow-lg"
          >
            <img
              src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${item.picture}`}
              alt={`Image ${index + 1}`}
              className="mx-auto mb-2 max-w-full h-32"
            />
            <p className="text-2xl text-red-600 font-bold">{`${item.content}`}</p>
            <p className="text-xl text-gray-600 ">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
  
}

export default Introduction;
