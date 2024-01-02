import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AffiateDetail from './AffiateDetail';

function SelectAffiliate() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [threshold, setThreshold] = useState(7);
  const [selectedCompany, setSelectedCompany] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);


  console.log("datadata", data);
  console.log("selectedCompany", selectedCompany);

  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
  
    try {
      // Fetch data based on the selected language
      const response = await  fetch('https://sungroup.co.th/Php-Api/Affiliate.php')
      const fetchedData = await response.json();
      console.log("fetchedData",fetchedData);
  
      // Map over the array and conditionally select content_en when selectedLanguage is 'en'
      const transformedData = fetchedData.map((item) => ({
        ...item,
        nameth:
          selectedLanguage === 'en'
            ? item.name_en
            : selectedLanguage === 'jpn'
            ? item.name_jpn
            : selectedLanguage === 'cn'
            ? item.name_cn
            : item.nameth,
      }));
      

        setData(transformedData);
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

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://sungroup.co.th/Php-Api/Affiliate.php')
  //     .then((response) => response.json())
  //     .then((getdata) => {
  //       setData(getdata);
  //       // Set the default selected value to the id of the first item
  //       if (getdata.length > 0) {
  //         setSelectedCompany(getdata[0].id);
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching categories:', error));
  // }, []);


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

  const handleDropdownChange = (e) => {
    const index = e.target.value;
    setActiveTab(index);
    const selectedCompanyName = data[index].id;
    setSelectedCompany(selectedCompanyName);
    navigate(`/AffiliateCorporations`);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    const selectedCompanyName = data[index].id;
    setSelectedCompany(selectedCompanyName);
    navigate(`/AffiliateCorporations`);
  };

  return (
    <div>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        {window.innerWidth <= 950 ? (
          <select
            className="block w-full p-2 mb-4 rounded-md border border-gray-300 focus:ring focus:ring-red-400 focus:outline-none"
            value={activeTab}
            onChange={handleDropdownChange}
          >
            {data.map((company, index) => (
              <option  className=' text-2xl ' key={index} value={index}>
                {company.nameth}
              </option>
            ))}
          </select>
        ) : (
          <div className="flex flex-wrap justify-center">
            {showAll
              ? data.map((company, index) => (
                <button
                  key={index}
                  className={`${
                    activeTab === index
                      ? 'bg-red-500 text-white '
                      : 'bg-gray-300 text-gray-700'
                  }  text-2xl  cursor-pointer px-4 py-2 rounded-md focus:outline-none m-1 transition-transform transform hover:scale-105`}
                  onClick={() => handleTabClick(index)}
                >
                  {company.nameth}
                </button>
              ))
              : data.slice(0, threshold).map((company, index) => (
                <a
                  key={index}
                  className={`${
                    activeTab === index
                      ? 'bg-red-500 text-white '
                      : 'bg-gray-300 text-gray-700'
                  } text-2xl cursor-pointer px-4 py-2 rounded-md focus:outline-none m-1 transition-transform transform hover:scale-105`}
                  onClick={() => handleTabClick(index)}
                >
                  {company.nameth}
                </a>
              ))}

            {data.length > threshold && (
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md focus:outline-none m-1 transition-transform transform hover:scale-105"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `+${data.length - threshold} More`}
              </button>
            )}
          </div> 
        )}
      </div>
      <AffiateDetail selectedCompany={selectedCompany} />
    </div>
  );
}

export default SelectAffiliate;
