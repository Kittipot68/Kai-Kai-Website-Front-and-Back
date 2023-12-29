import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function Accreditations() {
    const [imageSizeClasses, setImageSizeClasses] = useState([]);
    const [data, setData] = useState([]);
    const [accreditations, setAccreditations] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://sungroup.co.th/sungroup/Php-Api/About.php')
            .then((response) => response.json())
            .then((getdata) => {
                setData(getdata);
                const accreditationsData = getdata.filter((item) => item.type === 'Accreditations');
                setAccreditations(accreditationsData);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    const handleAccreditationClick = (index) => {
        // Handle click event for accreditations
        console.log(`Accreditation ${index + 1} clicked!`);
        // You can add your logic here for the click event, like opening a modal or enlarging the image.
    };



 

  


    const handleImageClick = (award) => {
        console.log('Show details for award:', award);
      };
    
      const sliderSettings = {
        infinite: true,
        rtl: false,
        arrows: false,
        speed: 500,
        center: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
        autoplay: true, // Enable autoplay
        autoplaySpeed: 1300, // Set autoplay speed in milliseconds
      };

      

    return (
        <div className="text-center p-5">
        <h1 className="text-4xl text-red-600 font-bold mb-8">Accreditations</h1>
        <div className='container flex justify-center items-center'>
        <Slider className=' bg-white' style={{ width: "50%", height: "50%" }} {...sliderSettings}>
          {accreditations.map((accreditation, index) => (
            <div key={index} className="p-2" onClick={() => handleImageClick(accreditation)}>
              <img
                src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${accreditation.picture}`}
                alt={`accreditation ${index + 1}`}
                className='hover:scale-110 p-2 '
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
    
    );
    
 
    
    
}

export default Accreditations;
