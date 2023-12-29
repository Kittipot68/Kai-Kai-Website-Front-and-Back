import React, { useState, useEffect } from 'react';
import ContactEach from './ContactEach';
import Map from './Map';
import SocialContact from './SocialContact';
function SelectContact({ }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [threshold, setThreshold] = useState(7);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companies, setCompanies] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://sungroup.co.th/sungroup/Php-Api/Contact.php')
  //     .then((response) => response.json())
  //     .then((getdata) => {
  //       setCompanies(getdata);
  //       // Set the selectedCompany to the id of the first company in the list
  //       if (getdata.length > 0) {
  //         setSelectedCompany(getdata[0].id);
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching categories:', error));
  // }, []);


  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';

    try {
      // Fetch data based on the selected language
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Contact.php')
      const fetchedData = await response.json();
      // console.log("fetchedData",fetchedData);

      // Map over the array and conditionally select content_en when selectedLanguage is 'en'
      const transformedData = fetchedData.map((item) => ({
        ...item,
        name: selectedLanguage === 'en' ? item.name_en : item.name,

      }));

      setCompanies(transformedData);
      if (transformedData.length > 0) {
        setSelectedCompany(transformedData[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();

  }, []);


  const handleTabClick = (index) => {
    setActiveTab(index);
    const selectedCompanyName = companies[index].id;
    setSelectedCompany(selectedCompanyName); // Update the selected company name
  };

  const updateThreshold = () => {
    // Update threshold based on screen width
    if (window.innerWidth <= 950) {
      setThreshold(3);
    } else {
      setThreshold(7);
    }
  };

  useEffect(() => {
    // Update threshold when the window is resized
    window.addEventListener('resize', updateThreshold);
    updateThreshold(); // Call initially to set the correct threshold
    return () => {
      window.removeEventListener('resize', updateThreshold);
    };
  }, []);

  return (
    <div>
      
      <div className='mb-5 '>

<SocialContact />

</div>
      {/* <div className=' mb-5 bg-red-600 p-10  mt-5 rounded-md text-white font-bold text-4xl text-center'>
        ติดต่อเรา
      </div> */}
      <div className=" ">


  
        <div className="container flex text-2xl  flex-wrap justify-center">
          {showAll
            ? companies.map((company, index) => (
              <button
                key={index}
                className={`${activeTab === index
                  ? 'bg-red-500 text-white '
                  : 'bg-gray-300 text-gray-700'
                  } px-4 py-2 rounded-md focus:outline-none m-1 transition-transform transform hover:scale-105`}
                onClick={() => handleTabClick(index)}
              >
                {company.name}
              </button>
            ))
            : companies.slice(0, threshold).map((company, index) => (
              <a
                key={index}
                className={`${activeTab === index
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-300 text-gray-700'
                  } px-4 py-2 rounded-md focus:outline-none m-1 transition-transform transform hover:scale-105`}
                onClick={() => handleTabClick(index)}
              >
                {company.name}
              </a>
            ))}
          {companies.length > threshold && (
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none m-1 transition-transform transform hover:scale-105"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `+${companies.length - threshold} More`}
            </button>
          )}
        </div>
        {selectedCompany && (
          <div className="mt-4">
            {/* <p>Selected Company (nameEng): {selectedCompany}</p> */}
            {/* Pass selectedCompany to ContactEach and Map components */}


            <ContactEach selectedCompany={selectedCompany} />
            <Map selectedCompany={selectedCompany} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectContact;
