import React, { useState, useEffect } from 'react';

function Map({ selectedCompany }) {
  const [contactdetail, setContactDetail] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      if (selectedCompany) {
        try {
          const response = await fetch(`https://sungroup.co.th/Php-Api/Contact.php/${selectedCompany}`);
          const details = await response.json();

          if (details.length > 0) {
            setContactDetail(details[0]);
          } else {
            setContactDetail(null);
          }
        } catch (error) {
          console.error('Error fetching company details:', error);
        }
      }
    };

    fetchContactDetails();
  }, [selectedCompany]);

  if (!contactdetail || typeof contactdetail !== 'object' || !contactdetail.hasOwnProperty('map')) {
    return <div>Loading map...</div>;
  }

  // Check if contactdetail.map is an empty string
  if (!contactdetail.map.trim()) {
    return <div></div>;
  }

  return (
    <div className="  w-full h-96 mt-5">
      <iframe
        src={contactdetail.map}
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
