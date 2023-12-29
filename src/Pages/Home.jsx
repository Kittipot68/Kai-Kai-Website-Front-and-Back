import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using React Router.
import Header from '../Component/Header';
import CarouselComponent from '../Component/Home/1_CarouselComponent';
import Introduction from '../Component/Home/2_Introduction';
import Aboutus from '../Component/Home/3_Aboutus';
import Footer from '../Component/Footer';
import Floaticon from '../Component/Floaticon';
import 'intersection-observer';
import VisionMission from '../Component/Home/6_VisionMission';
function Home() {

  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-bottom');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.cssanimation').forEach((element) => {
      observer.observe(element);
    });

    observerRef.current = observer;
  }, []);


  return (
    <div className='' style={{ marginBottom: "110px" }}>
      <div >
        <CarouselComponent />
      </div>
      {/* 
      <div>
        <VisionMission />
      </div> */}
      <div className='' style={{ position: 'relative' }}>

        <div className='' style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#FF0000" fill-opacity="1" d="M0,96L60,117.3C120,139,240,181,360,181.3C480,181,600,139,720,117.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
</svg> */}
        </div>

        <div className="container relative     mb-8 p-5 ">

          <h2 className="sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl 
  font-bold mb-4 text-center text-black">SUNFOOD No Antibiotics Ever and Herb Fed Chicken</h2>
          <div className="relative p-3 shadow-md rounded-md bg-slate-200">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/L2bRImWbTgw?si=u7bGFfm1wZ0cH_pt"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>

              <i
                className="fa-solid fa-drumstick-bite absolute -top-14 -left-20 p-2 rounded-full transition duration-300 text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                style={{ color: "#C96619" }}
              ></i>
              <i
                className="fa-solid fa-egg absolute -bottom-14 -right-20 p-2 rounded-full transition duration-300 text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                style={{ color: "#F0EAD6" }}
              ></i>


            </div>
          </div>
        </div>
      </div>



      <div className=''  >
        <Introduction />
      </div>

      {/* <div>
                <Brochure />
            </div> */}





      <div className='hex  '>
        <Aboutus />
      </div>

      {/* Add a button with a link
            <div>
                <Link to="/backend/AffiliateBackend">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go to HomeBackend
                    </button>
                </Link>
            </div> */}


    </div>
  );
}

export default Home;
