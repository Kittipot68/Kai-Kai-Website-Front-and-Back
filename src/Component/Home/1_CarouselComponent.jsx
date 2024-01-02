import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent() {
  const [data, setData] = useState([]);
  const pictureData = data.filter((item) => item.type === 'picture');

  useEffect(() => {
    // Fetch data from the API
    fetch('https://sungroup.co.th/Php-Api/Home.php')
      .then((response) => response.json())
      .then((getdata) => setData(getdata))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <Carousel pause="hover" variant="dark" touch>
      {pictureData.map((item, index) => (
        <Carousel.Item key={index} interval={3000}>
          <img
          key={index}
            className="d-block w-full h-auto"
            src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${item.picture}`}
            alt={`Image ${index + 1}`}

          />
            
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
