import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import ENTH from './ENTH';
import Footer from './Footer';
import Floaticon from './Floaticon';

function Header({ children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFeaturesSubMenu, setShowFeaturesSubMenu] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [headerdata,setheaderdata] = useState([])

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowFeaturesSubMenu(false);
  };

  const toggleFeaturesSubMenu = () => {
    setShowFeaturesSubMenu(!showFeaturesSubMenu);
  };

  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/');
  const desiredPart = pathSegments[2];


  // console.log("desiredPart",desiredPart)
  const navStyle = {
    top: visible ? '0' : '-120px',
    transition: 'top 0.3s',
  };

  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Header.php');
      const fetchedData = await response.json();
      setheaderdata(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);
  
  


  const currentLanguage = localStorage.getItem('selectedLanguage') || 'th'; // Default to 'TH' if not found
  const textMappings = {
    th: {
      home:      (headerdata && headerdata.length > 0 ? headerdata[0].name:"Home") ,
      about:     (headerdata && headerdata.length > 0 ? headerdata[1].name:"About Us") ,
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name:"Affiliate Corporations") ,
      products:  (headerdata && headerdata.length > 0 ? headerdata[3].name:"Products") ,
      recipes:   (headerdata && headerdata.length > 0 ? headerdata[4].name:"Recipes") ,
      contact:   (headerdata && headerdata.length > 0 ? headerdata[5].name:"Contact Us") ,
    },
    en: {
      home:      (headerdata && headerdata.length > 0 ? headerdata[0].name_en:"Home") ,
      about:     (headerdata && headerdata.length > 0 ? headerdata[1].name_en:"About Us") ,
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name_en:"Affiliate Corporations") ,
      products:  (headerdata && headerdata.length > 0 ? headerdata[3].name_en:"Products") ,
      recipes:   (headerdata && headerdata.length > 0 ? headerdata[4].name_en:"Recipes") ,
      contact:   (headerdata && headerdata.length > 0 ? headerdata[5].name_en:"Contact Us") ,
    },
    jpn: {
      home:      (headerdata && headerdata.length > 0 ? headerdata[0].name_jpn:"Home") ,
      about:     (headerdata && headerdata.length > 0 ? headerdata[1].name_jpn:"About Us") ,
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name_jpn:"Affiliate Corporations") ,
      products:  (headerdata && headerdata.length > 0 ? headerdata[3].name_jpn:"Products") ,
      recipes:   (headerdata && headerdata.length > 0 ? headerdata[4].name_jpn:"Recipes") ,
      contact:   (headerdata && headerdata.length > 0 ? headerdata[5].name_jpn:"Contact Us") ,
    },
    cn: {
      home:      (headerdata && headerdata.length > 0 ? headerdata[0].name_cn:"Home") ,
      about:     (headerdata && headerdata.length > 0 ? headerdata[1].name_cn:"About Us") ,
      affiliate: (headerdata && headerdata.length > 0 ? headerdata[2].name_cn:"Affiliate Corporations") ,
      products:  (headerdata && headerdata.length > 0 ? headerdata[3].name_cn:"Products") ,
      recipes:   (headerdata && headerdata.length > 0 ? headerdata[4].name_cn:"Recipes") ,
      contact:   (headerdata && headerdata.length > 0 ? headerdata[5].name_cn:"Contact Us") ,
    },
  };


  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div>


      <Floaticon />
      <nav style={navStyle} className="w-full px-4 py-4 shadow-xl sticky-nav">
        <div style={{ backgroundColor: "#ea5656" }} className="h-2 rounded-t-xl absolute top-0 left-0 right-0 flex items-center justify-center text-white font-bold">
          <span></span>
        </div>
        <div className="mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex mr-4 shrink-0">
            <a href='/sungroup'>
              <img
                src={logo}
                alt="Logo"
                className={`max-w-[100px] md:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] transition-all duration-300 ease-in-out`}
              />
            </a>
          </div>
          <div className="xl:hidden ml-auto whitespace-nowrap flex items-center">

            <div className="ml-2">

            <ENTH onCloseMobileMenu={closeMobileMenu} />
            </div>
          </div>

          <div className=' xl:hidden'>

            <button className={` hamburger hamburger--collapse  ${showMobileMenu ? 'open is-active' : ''}`} type="button" onClick={toggleMobileMenu}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>

          <div className="hidden xl:block">

            <div className="flex px-2 xl:px-0 py-3 space-y-2 xl:space-y-0 xl:space-x-2 font-medium text-slate-700">
              {[
                { text: textMappings[currentLanguage].home, link: '/sungroup' },
                { text: textMappings[currentLanguage].about, link: '/sungroup/About' },
                { text: textMappings[currentLanguage].affiliate, link: '/sungroup/AffiliateCorporations' },
                { text: textMappings[currentLanguage].products, link: '/sungroup/Product' },
                { text: textMappings[currentLanguage].recipes, link: '/sungroup/Recipe' },
                { text: textMappings[currentLanguage].contact, link: '/sungroup/Contact' },
              ].map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className={` ${desiredPart === item.link.split('/')[2]
                      ? 'block xl:inline-block px-3 py-2  text-2xl focus:outline-none  no-underline   active text-red-600 font-extrabold'
                      : 'outline-none  border-transition block xl:inline-block px-3 py-2  text-2xl focus:outline-none  no-underline font-semibold '
                    }`}
                >
                  {item.text}
                </a>
              ))}
              <div className="ml-auto whitespace-nowrap flex items-center">
                <div className="ml-2">
                <ENTH onCloseMobileMenu={closeMobileMenu} />
                </div>
              </div>
            </div>


          </div>
        </div>

        <div className="xl:hidden bg-white bg-slide show">
          <div className={`mobile-menu ${showMobileMenu ? 'slide-in' : 'slide-out'}`}>

            {showMobileMenu && (
              <div className="flex items-center justify-center">
                <div className="px-2 xl:px-0 py-3 space-y-2 xl:space-y-0 xl:space-x-2 font-medium text-slate-700">

                  {[
                    { text: textMappings[currentLanguage].home, link: '/sungroup' },
                    { text: textMappings[currentLanguage].about, link: '/sungroup/About' },
                    { text: textMappings[currentLanguage].affiliate, link: '/sungroup/AffiliateCorporations' },
                    { text: textMappings[currentLanguage].products, link: '/sungroup/Product' },
                    { text: textMappings[currentLanguage].recipes, link: '/sungroup/Recipe' },
                    { text: textMappings[currentLanguage].contact, link: '/sungroup/Contact' },
                  ].map((item) => (
                    <a
                      key={item.link}
                      href={item.link}
                      className={`block xl:inline-block px-3 py-2 rounded-xl text-2xl hover:bg-gray-200 focus:outline-none focus:text-white focus:bg-gray-400 no-underline text-center ${desiredPart === item.link.split('/')[2] ? 'active text-red-600 font-extrabold' : 'text-black font-semibold hover:text-white'
                        }`}
                    >
                      {item.text}
                    </a>
                  ))}

                </div>
              </div>
            )}
          </div>

        </div>
      </nav>
      <div style={{ marginTop: "110px" }}>
        {children}
        <Footer />

      </div>

    </div>

  );
}

export default Header;
