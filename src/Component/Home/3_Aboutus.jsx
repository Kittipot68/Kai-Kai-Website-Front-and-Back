import React, { useState, useEffect } from 'react';

function AboutUs() {
  // Assuming content is an array of objects

  const content = [
    {
      description: ' ดำเนินธุรกิจไก่ครบวงจรทั้งไก่เนื้อและไก่ไข่ ประกอบด้วย โรงงานผลิตอาหารไก่ ฟาร์มพ่อแม่พันธุ์ โรงฟักไข่ ฟาร์มไก่เนื้อ ธุรกิจไก่ประกัน และไก่จ้างเลี้ยง โรงงานผลิต และแปรรูปเนื้อไก่สดเนื้อไก่แช่แข็ง เพื่อการส่งออก โรงงานผลิตอาหารปรุงสุกแช่แข็งจากเนื้อไก่....',
      picture: 'aboutusbanner.jpg'
    },


  ]

  const [data, setData] = useState([]);
  const [aboutusdata, setIntroductionData] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://sungroup.co.th/sungroup/Php-Api/Home.php')
  //     .then((response) => response.json())
  //     .then((getdata) => {
  //       setData(getdata);
  //       const filteredData = getdata.filter((item) => item.type === 'aboutus');
  //       setIntroductionData(filteredData);
  //     })
  //     .catch((error) => console.error('Error fetching categories:', error));
  // }, []);

  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
  
    try {
      // Fetch data based on the selected language
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Home.php');
      const fetchedData = await response.json();
  
      // Map over the array and conditionally select content_en when selectedLanguage is 'en'
      const transformedData = fetchedData.map((item) => ({
        ...item,
        content: selectedLanguage === 'en' ? item.content_en
        : selectedLanguage === 'jpn'? item.content_jpn
        : selectedLanguage === 'cn'? item.content_cn
        : item.content,

      }));


  
      // Filter the data based on a specific criterion (e.g., type === 'introduction')
      const filteredData = transformedData.filter((item) => item.type === 'aboutus');
  
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
    <div className="container mx-auto ">
      {/* <div className="mt-5 text-center">
        <h1 className="text-5xl font-bold text-black">About Us</h1>
      </div> */}
  
      <div className="mt-5 grid 2xl:grid-cols-2 md:grid-cols-1  gap-5  rounded-lg">
        {/* Column 1 */}
        <div className=" flex justify-center items-center">
          {aboutusdata.map((item, index) => (
            <img
              key={index}
              src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${item.picture}`}
              alt="About Us"
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
  
        {/* Column 2 */}
        <div className="mt-5 flex flex-col justify-center text-left">
          <div className='text-red-600 p-2 font-bold text-4xl'>เกี่ยวกับเรา</div>
          {aboutusdata.map((item, index) => (
         <div key={index} className="bg-white p-2 mb-4 ">
         <p className=" text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-gray-800 leading-relaxed">
           {item.content}
         </p>
       </div>
       
          ))}
  
          <a href="/sungroup/About" className="inline-block w-full">
            <button className="mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700">
              ดูเพิ่มเติม
            </button>
          </a>
        </div>
      </div>
    </div>
  );
  
}

export default AboutUs;
