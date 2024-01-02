// import React,{useState,useEffect} from 'react';
// import ContactUs from './ContactUs';
// import logo from '../assets/logo.png'
// function Footer() {

// const linkClasses =
// 'text-black  block mb-3 lg:inline-block lg:mb-0 text-center underline underline-offset-4 ';

//   const iconClasses = ' cursor-pointer  transition-transform transform hover:scale-150';
//   const sunGroupClasses = 'cursor-pointer font-black text-5xl ';
//   const footerBackgroundClasses = 'bg-gray-200 p-8 text-center'; // Adjusted background color
//   const socialIconContainerClasses = 'text-center flex justify-center space-x-5 p-4';
//   const copyrightTextClasses = 'text-center  mt-4';


// const [selectedLanguage, setSelectedLanguage] = useState('th'); // Default language is 'th'

// useEffect(() => {
//   // Retrieve the selected language from localStorage
//   const storedLanguage = localStorage.getItem('selectedLanguage');
//   if (storedLanguage) {
//     setSelectedLanguage(storedLanguage);
//   }
// }, []);


//   return (
//     <div className='bottom-5 top-10'>
//       {/* <ContactUs /> */}
//       <div className={footerBackgroundClasses}>
//         <div className=' flex justify-center'>
//         <a href='/sungroup'>
//   <img
//     className='w-full h-full'
//     src={logo}
//     alt="Logo"
//     style={{ width: '150', height: '100' }} // Adjust the values as needed
//   />
// </a>

//         </div>
//         <div className='text-2xl text-white mt-5'>
//           <p className='lg:flex lg:justify-center lg:space-x-4'>
//           <a href='/sungroup' className={linkClasses}>{selectedLanguage === 'th' ? 'หน้าหลัก' : 'Home'}</a>
//             <a href='/sungroup/About' className={linkClasses}>{selectedLanguage === 'th' ? 'เกี่ยวกับเรา' : 'About Us'}</a>
//             <a href='/sungroup/AffiliateCorporations'         className={linkClasses}>{selectedLanguage === 'th' ? 'ธุรกิจในเครือ' : 'Affiliate Corporations'}</a>
//             <a href='/sungroup/Product'                       className={linkClasses}>{selectedLanguage === 'th' ? 'สินค้า' : 'Products'}</a>
//             <a href='/sungroup/Recipe'                        className={linkClasses}>{selectedLanguage === 'th' ? 'สูตรอาหารและเมนูสุขภาพ' : 'Recipes'}</a>
//             <a href='/sungroup/Contact'                       className={linkClasses}>{selectedLanguage === 'th' ? 'ติดต่อเรา' : 'Contact Us'}</a>
//             <a href='http://www.sungroup.co.th/recruitment3/' className={linkClasses}>{selectedLanguage === 'th' ? 'ร่วมงานกับเรา' : 'Work with Us'}</a>
//           </p>
//         </div>


// <div className={socialIconContainerClasses}>
//   <a href="https://lin.ee/544UdNR" target="_blank" rel="noopener noreferrer">
//     <i className={`fab fa-line text-5xl ${iconClasses}`}></i>
//   </a>
//   <a href="https://www.facebook.com/sunfoodTH/" target="_blank" rel="noopener noreferrer">
//     <i className={`fab fa-facebook text-5xl ${iconClasses}`}></i>
//   </a>
//   <a href="https://www.youtube.com/@sunfood3354" target="_blank" rel="noopener noreferrer">
//     <i className={`fab fa-youtube text-5xl ${iconClasses}`}></i>
//   </a>
// </div>

//         <div className={copyrightTextClasses}>
//           &copy; {new Date().getFullYear()} Sungroup. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;


import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import bannershopee from '../assets/shopee-banner.png';
import bannerline from '../assets/lineshop-banner.png';

function Footer() {
  const linkClasses =
    ' block  lg:inline-block lg:mb-0 text-center underline   underline-offset-4  ';
  const [selectedLanguage, setSelectedLanguage] = useState('th'); // Default language is 'th'
  const [headerdata, setheaderdata] = useState([])
  useEffect(() => {
    // Retrieve the selected language from localStorage
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);


  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/Php-Api/Header.php');
      const fetchedData = await response.json();
      setheaderdata(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  console.log(headerdata && headerdata.length > 0 ? headerdata[0].name : 'No name available', "fetchedDatahead");



  const currentLanguage = localStorage.getItem('selectedLanguage') || 'th'; // Default to 'TH' if not found
  const textMappings = {
    th: {
      home: (headerdata && headerdata.length > 0 ? headerdata[0].name : "Home"),
      about: (headerdata && headerdata.length > 0 ? headerdata[1].name : "About Us"),
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name : "Affiliate Corporations"),
      products: (headerdata && headerdata.length > 0 ? headerdata[3].name : "Products"),
      recipes: (headerdata && headerdata.length > 0 ? headerdata[4].name : "Recipes"),
      contact: (headerdata && headerdata.length > 0 ? headerdata[5].name : "Contact Us"),
      career: (headerdata && headerdata.length > 0 ? headerdata[6].name : "Career"),

    },
    en: {
      home: (headerdata && headerdata.length > 0 ? headerdata[0].name_en : "Home"),
      about: (headerdata && headerdata.length > 0 ? headerdata[1].name_en : "About Us"),
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name_en : "Affiliate Corporations"),
      products: (headerdata && headerdata.length > 0 ? headerdata[3].name_en : "Products"),
      recipes: (headerdata && headerdata.length > 0 ? headerdata[4].name_en : "Recipes"),
      contact: (headerdata && headerdata.length > 0 ? headerdata[5].name_en : "Contact Us"),
      career: (headerdata && headerdata.length > 0 ? headerdata[6].name_en : "Career"),

    },
    jpn: {
      home: (headerdata && headerdata.length > 0 ? headerdata[0].name_jpn : "Home"),
      about: (headerdata && headerdata.length > 0 ? headerdata[1].name_jpn : "About Us"),
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name_jpn : "Affiliate Corporations"),
      products: (headerdata && headerdata.length > 0 ? headerdata[3].name_jpn : "Products"),
      recipes: (headerdata && headerdata.length > 0 ? headerdata[4].name_jpn : "Recipes"),
      contact: (headerdata && headerdata.length > 0 ? headerdata[5].name_jpn : "Contact Us"),
      career: (headerdata && headerdata.length > 0 ? headerdata[6].name_jpn : "Career"),

    },
    cn: {
      home: (headerdata && headerdata.length > 0 ? headerdata[0].name_cn : "Home"),
      about: (headerdata && headerdata.length > 0 ? headerdata[1].name_cn : "About Us"),
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name_cn : "Affiliate Corporations"),
      products: (headerdata && headerdata.length > 0 ? headerdata[3].name_cn : "Products"),
      recipes: (headerdata && headerdata.length > 0 ? headerdata[4].name_cn : "Recipes"),
      contact: (headerdata && headerdata.length > 0 ? headerdata[5].name_cn : "Contact Us"),
      career: (headerdata && headerdata.length > 0 ? headerdata[6].name_cn : "Career"),

    },
  };


  return (
    <div >
      <div className='bg-gray-200' >

        <div className=' container  w-full p-3 md:p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4'>
          {/* Column 1 */}



          <div className='p-5 mx-auto md:mx-0'>
            <div className=''>
              <a href='/'>
                <img
                  src={logo}
                  alt="Logo"
                />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className='p-5 mx-auto md:mx-0'>
            <h1 className='text-4xl text-center font-bold text-red-600'>{selectedLanguage === 'th' ? 'ติดต่อเรา' : 'Contact Us'}</h1>
            <div className='mt-2'>
              <p className='text-lg text-center font-semibold'>สำนักงานใหญ่: เลขที่1/97-98ถนนพหลโยธิน 40แขวงเสนานิคม เขตจตุจักร</p>
              <p className='text-lg text-center font-semibold'>Tel: (66) 2561-1455</p>
              <p className='text-lg text-center font-semibold'>Email: sungroup@sungroup.co.th</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className='p-5 mx-auto md:mx-0'>
            <h1 className='text-4xl text-center font-bold text-red-600'>{selectedLanguage === 'th' ? 'ติดตามเรา' : 'Follow Us'}</h1>
            <div className='mt-2 text-center'>
            <a href="https://lin.ee/544UdNR" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-line text-3xl mr-3`}></i>
              </a>
              <a href="https://www.facebook.com/sunfoodTH/" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-facebook text-3xl mr-3`}></i>
              </a>
              <a href="https://www.youtube.com/@sunfood3354" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-youtube text-3xl mr-3`}></i>
              </a>
              <a href="https://www.tiktok.com/@sunfood" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-tiktok text-3xl mr-3`}></i>
              </a>
              <a href="https://www.instagram.com/sunfoodth/" target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-instagram text-3xl mr-3`}></i>
              </a>
            </div>
          </div>

          {/* Column 4 */}
          <div className='p-5 mx-auto md:mx-0'>
            <h1 className='text-4xl text-center font-bold text-red-600'>{selectedLanguage === 'th' ? 'ซื้อสินค้า' : 'Shopping'}</h1>
            <div className='mt-2 text-center'>
  <a href='https://shop.line.me/@sungroup/' target="_blank" rel="noopener noreferrer">
    <img
      src={bannerline}
      alt="Logo"
      className='mt-3 object-cover'
      style={{ width: '150px', height: '55px' }} // Adjust the values as needed
    />
  </a>
  <a href='https://shopee.co.th/sunfoodnae' target="_blank" rel="noopener noreferrer">
    <img
      src={bannershopee}
      alt="Logo"
      className='mt-3 m object-cover'
      style={{ width: '150px', height: '55px' }} // Adjust the values as needed
    />
  </a>
</div>

          </div>

        </div>




      </div>
      <div className='bg-red-600 text-white'>
        <div className='text-xl p-3 text-white '>
          <p className='lg:flex lg:justify-center lg:space-x-4'>

            {[
              { text: textMappings[currentLanguage].home, link: '/' },
              { text: textMappings[currentLanguage].about, link: '/About' },
              { text: textMappings[currentLanguage].affiliate, link: '/AffiliateCorporations' },
              { text: textMappings[currentLanguage].products, link: '/Product' },
              { text: textMappings[currentLanguage].recipes, link: '/Recipe' },
              { text: textMappings[currentLanguage].contact, link: '/Contact' },
              { text: textMappings[currentLanguage].career, link: 'http://www.sungroup.co.th/recruitment3/' },

            ].map((item) => (
              <a
                key={item.link}
                href={item.link}
                className={linkClasses}
              >
                {item.text}
              </a>
            ))}


        
          </p>

        </div>

        <p className="text-center p-1  text-2xl">
          &copy; {new Date().getFullYear()} Sungroup. All rights reserved.
        </p>


      </div>
    </div>

  );
}

export default Footer;
