import React, { useState, useEffect } from 'react';

function DetailAbout() {
  

    const [data, setData] = useState([]);
    // const maindata = data.filter((item) => item.type === 'main');
    // const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';

    // useEffect(() => {
    //     // Fetch data from the API
    //     fetch('https://sungroup.co.th/Php-Api/About.php')
    //         .then((response) => response.json())
    //         .then((getdata) => setData(getdata))
    //         .catch((error) => console.error('Error fetching categories:', error));
    // }, []);

    const fetchDataFromDatabase = async () => {
        // Retrieve the selected language from local storage
        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
      
        try {
          // Fetch data based on the selected language
          const response = await   fetch('https://sungroup.co.th/Php-Api/About.php')

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
            name:
              selectedLanguage === 'en'
                ? item.name_en
                : selectedLanguage === 'jpn'
                ? item.name_jpn
                : selectedLanguage === 'cn'
                ? item.name_cn
                : item.name,
          }));
      
          // Filter the data based on a specific criterion (e.g., type === 'introduction')
          const filteredData = transformedData.filter((item) => item.type === 'main');
      
          // You can now use the 'filteredData' in your component
          setData(filteredData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        fetchDataFromDatabase();
      }, []);



    return (
        <div>
            <div className='p-10 bg-red-600 text-center font-bold text-4xl text-white'>
                About Us
            </div>
            <div className="container mx-auto p-4">
                <table className="w-full">
                    <tbody>
                        {data.map((about, index) => (
                            <tr key={index}>
                                {index % 2 === 0 ? (
                                    // Picture is in the first column, content in the second column
                                    <>
                                        <td className="mt-3 p-4 gap-4 flex flex-col-reverse md:flex-row">
                                            {/* Picture column */}
                                            <div className={`w-full md:w-1/2 md:relative ${index % 2 === 0 ? 'order-2 mt-0' : 'order-1 mb-4'}`}>
                                                <img src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${about.picture}`}
                                                    alt={`Image ${index + 1}`} className="w-full h-auto mx-auto" />
                                            </div>
                                            {/* Content column */}
                                            <div className="md:w-1/2 flex flex-col justify-center">
                                                <h2 className="text-4xl text-red-600 font-bold text-center">{about.name}</h2>
                                                <p className="text-3xl mt-2 text-center">{about.content}</p>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    // Content is in the first column, picture in the second column
                                    <>
                                        <td className="mt-3 p-4 gap-4 text-center flex flex-col md:flex-row">
                                            {/* Picture column */}
                                            <div className="md:w-1/2 md:relative">
                                                <img src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${about.picture}`}
                                                    alt={`Image ${index + 1}`} className="w-full h-auto mx-auto md:order-1 md:mb-4" />
                                            </div>
                                            {/* Content column */}
                                            <div className="md:w-1/2 flex flex-col justify-center">
                                                <h2 className="text-4xl text-red-600 font-bold text-center">{about.name}</h2>
                                                <p className="text-3xl mt-2 text-center">{about.content}</p>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );


}

export default DetailAbout;
