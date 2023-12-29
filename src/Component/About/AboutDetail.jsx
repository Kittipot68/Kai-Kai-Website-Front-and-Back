import React, { useEffect, useState, useRef } from 'react';
import 'intersection-observer';
import optimizedPic from '../../assets/journey herbtori.jpg'; // Optimized image

function AboutDetail() {
  const [data, setData] = useState([]);
  const maindata = data.filter((item) => item.type === 'main');

  useEffect(() => {
    // Fetch data from the API
    fetch('https://sungroup.co.th/sungroup/Php-Api/About.php')
      .then((response) => response.json())
      .then((getdata) => setData(getdata))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const observerRef = useRef(null);

  useEffect(() => {
    const observeElements = () => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            observer.unobserve(entry.target);
          }
        });
      }, options);

      document.querySelectorAll('.cssanimation').forEach((element) => {
        observer.observe(element);
      });

      observerRef.current = observer;
    };

    observeElements();
  }, []);

  return (
    <div className="">
      <h1 className="p-20 bg-red-600 text-white mb-8 text-4xl font-bold text-center">Chicken Journey</h1>

      <div className="mt-8">
        {maindata.map((item) => (
          <div key={item.id} className="mb-4 rounded-md">
            <img
              loading='lazy'
              src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${item.picture}`}
              alt={item.title} // Add alt text for accessibility
              className="w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutDetail;
