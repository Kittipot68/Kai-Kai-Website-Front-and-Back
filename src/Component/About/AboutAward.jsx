import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AboutAward() {
  const [data, setData] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null); // New state for selected award

  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
  
    try {
      // Fetch data based on the selected language
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/About.php')


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
      const filteredData = transformedData.filter((item) => item.type === 'award');
  
      // You can now use the 'filteredData' in your component
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect (()=>{
    fetchDataFromDatabase()
  },[])

  // const awarddata = data.filter((item) => item.type === 'award');

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://sungroup.co.th/sungroup/Php-Api/About.php')
  //     .then((response) => response.json())
  //     .then((getdata) => setData(getdata))
  //     .catch((error) => console.error('Error fetching categories:', error));
  // }, []);

  const handleImageClick = (award) => {
    // Set the selected award when an image is clicked
    setSelectedAward(award);
  };

  const handleModalClose = () => {
    // Close the modal and reset the selected award
    setSelectedAward(null);
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
      {
        breakpoint: 330,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 1300,
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-4xl font-bold text-red-600 mb-8">Awards</h1>
      <div className='container flex justify-center items-center'>
        <Slider className='bg-white' style={{ width: "50%", height: "50%" }} {...sliderSettings}>
          {data.map((award, index) => (
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

      {/* Modal for displaying selected award details */}
      <Modal show={!!selectedAward} onHide={handleModalClose}>
        <Modal.Header className='bg-red-600' closeButton>
          <Modal.Title className='font-bold text-2xl text-white '>{selectedAward?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='flex justify-center'>
            <img
              src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${selectedAward?.picture}`}
              alt={`Award`}
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>


          <p className='text-xl font-bold mt-2'>{selectedAward?.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose} className="bg-gray-500 text-white">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AboutAward;
