import React, { useState, useEffect } from 'react';
import background from '../../assets/all-bong-L2oedF1AsH8-unsplash.jpg';

function VisionMission() {
  const [vissionmissiondata, setVissionMissionData] = useState([]);

  const fetchDataFromDatabase = async () => {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';

    try {
      const response = await fetch('https://sungroup.co.th/Php-Api/Home.php');
      const fetchedData = await response.json();

      const transformedData = fetchedData.map((item) => ({
        ...item,
        content: selectedLanguage === 'en' ? item.content_en : item.content,
      }));

      const filteredData = transformedData.filter((item) => item.type === 'vissionmission');

      setVissionMissionData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

//   return (
//     <div
//       className="p-5 relative flex flex-col gap-10 items-center justify-center text-center sm:text-left"
//       style={{
//         // Use the imported background image variable with opacity
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
//         // Set background size and other properties as needed
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center center',
//       }}
//     >
//       {vissionmissiondata.map((item, index) => (
//         <div
//           key={index}
//           className="relative"
//           style={{
//             // Add clouded white background style
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             padding: '20px',
//             borderRadius: '10px',
//             backdropFilter: 'blur(1px)', // Add a blur effect
//           }}
//         >
//           <h2 className="text-3xl lg:text-4xl font-bold text-red-600 mb-2">{item.picture}</h2>
//           <blockquote className="font-semibold text-xl lg:text-2xl  border-l-4 border-gray-500 pl-2">
//             {item.content}
//           </blockquote>
//         </div>
//       ))}
//     </div>
//   );
// }


return(

<div>
  
</div>
)

};

export default VisionMission;
