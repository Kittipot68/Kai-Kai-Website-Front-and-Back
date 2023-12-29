import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AboutAward() {
  const [data, setData] = useState([]);
  const awarddata = data.filter((item) => item.type === 'award');

  useEffect(() => {
    // Fetch data from the API
    fetch('https://sungroup.co.th/sungroup/Php-Api/About.php')
      .then((response) => response.json())
      .then((getdata) => setData(getdata))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleImageClick = (award) => {
    // Add logic to show details based on the selected award
    console.log('Show details for award:', award);
    // Example: You can navigate to a details page or display a modal with more information.
  };

  // Slick settings for the slider
  const sliderSettings = {
    infinite: true,
    arrows: false,
    rtl: true,
    
    speed: 500,
    center: true,
    slidesToShow: 3,
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
    <div className="text-center  p-5">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Awards</h1>
      <div className='container flex justify-center items-center'>
        <Slider className=' bg-white ' style={{ width: "50%", height: "50%" }} {...sliderSettings}>
          {awarddata.map((award, index) => (
            <div key={index} className="p-2" onClick={() => handleImageClick(award)}>
              <img
                src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${award.picture}`}
                alt={`Award ${index + 1}`}
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

export default AboutAward;
