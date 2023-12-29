import React, { useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
function AffiateDetail({ selectedCompany }) {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [content, setcontent] = useState("");
  const [name, setname] = useState("");

  useEffect(() => {
    fetchDataFromDatabase();
  }, [selectedCompany]);

  
  console.log("content", content)
  console.log("name", name)

  // useEffect(() => {
  //   if (selectedCompany) {
  //     // Fetch additional details based on the selected company ID
  //     fetch(`https://sungroup.co.th/sungroup/Php-Api/Affiliate.php/${selectedCompany}`)
  //       .then((response) => response.json())
  //       .then((details) => {
  //         setCompanyDetails(details);
  //       })
  //       .catch((error) => console.error('Error fetching company details:', error));
  //   }
  // }, [selectedCompany]);

  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';

    try {
      // Fetch data based on the selected language
      const response = await fetch(`https://sungroup.co.th/sungroup/Php-Api/Affiliate.php/${selectedCompany}`)
      const fetchedData = await response.json();

      const content =
      selectedLanguage === 'en'
        ? fetchedData.content_en
        : selectedLanguage === 'jpn'
        ? fetchedData.content_jpn
        : selectedLanguage === 'cn'
        ? fetchedData.content_cn
        : fetchedData.content;

    const name =
      selectedLanguage === 'en'
        ? fetchedData.name_en
        : selectedLanguage === 'jpn'
        ? fetchedData.name_jpn
        : selectedLanguage === 'cn'
        ? fetchedData.name_cn
        : fetchedData.nameth;
      
      setcontent(content)
      setname(name)

      setCompanyDetails(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  


  return (
    <div className="bg-gray-100  flex items-center justify-center">
      <div className="p-4 rounded-lg  bg-white">
        {/* Banner */}
        <div className="bg-blue-500 rounded-md">
          {companyDetails && companyDetails.picture && (
            <img
              src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${companyDetails.picture}`}
              alt="Banner"
              className="w-full h-auto border rounded-md"
            />
          )}
        </div>

        {/* Description */}
        <div className="p-4" >
          <h1 className="md:text-3xl lg:text-3xl sm:text-3xl text-3xl text-red-600 font-semibold">
            {companyDetails ? name : 'Loading...'}
          </h1>
          <p className="text-gray-700" >
            {companyDetails && (
          <SunEditor
          height="auto"
          width="auto"
          setContents={content}
          hideToolbar={true}
          setOptions={{
            defaultStyle: 'font-family: "PSL369Pro", sans-serif; ', // Adjust the font family and size as needed
          }}
        />
        

            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AffiateDetail;
