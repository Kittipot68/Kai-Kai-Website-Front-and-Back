import React, { useState, useEffect } from 'react';

function ContactEach({ selectedCompany }) {
  const [contactdetail, setContactDetail] = useState(null);
  const [place, setplace] = useState("");
  const [tel, settel] = useState("");
  const [email, setemail] = useState("");

  // useEffect(() => {
  //   const fetchContactDetails = async () => {
  //     if (selectedCompany) {
  //       try {
  //         const response = await fetch(`https://sungroup.co.th/Php-Api/Contact.php/${selectedCompany}`);
  //         const details = await response.json();
  //         setContactDetail(details[0]); // Assuming details is an array and you want the first item
  //       } catch (error) {
  //         console.error('Error fetching company details:', error);
  //       }
  //     }
  //   };

  //   fetchContactDetails();
  // }, [selectedCompany]);

  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';

    try {
      // Fetch data based on the selected language
      const response = await fetch(`https://sungroup.co.th/Php-Api/Contact.php/${selectedCompany}`)
      const fetchedData = await response.json();

      // Map over the array and conditionally select content_en when selectedLanguage is 'en'
      const place = selectedLanguage === 'th' ? fetchedData[0].place : fetchedData[0].place_en;
      const tel = selectedLanguage === 'th' ? fetchedData[0].tel : fetchedData[0].tel;
      const email = selectedLanguage === 'th' ? fetchedData[0].email : fetchedData[0].email;


      setplace(place)
      settel(tel)
      setemail(email)
      setContactDetail(fetchedData[0]);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, [selectedCompany]);



  //   console.log("selectedCompany", selectedCompany);
  //   console.log("contactdetail", contactdetail);

  //   console.log("placeplace2",place)
  // console.log("teltel2",tel)
  // console.log("emailemail2",email)

  if (!contactdetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10">
  {/* Column 1 */}
  <div className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center justify-start">
    <div>
      <img
        loading="lazy"
        src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${"map.png"}`}
        alt="Contact"
        className="w-32 h-32"
      />
    </div>
    <div>
      <p className="mt-4 text-center text-2xl font-bold">
        {place}
      </p>
    </div>
  </div>

  {/* Column 2 */}
  <div className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center justify-start">
    <img
      loading="lazy"
      src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${"phone-call.png"}`}
      alt="Contact"
      className="w-32 h-32"
    />
    <p className="mt-4 text-center text-2xl font-bold">{tel}</p>
  </div>

  {/* Column 3 */}
  <div className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col items-center justify-start">
    <img
      loading="lazy"
      src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${"email.png"}`}
      alt="Contact"
      className="w-32 h-32"
    />
    <p className="mt-4 text-center text-2xl font-bold">{email}</p>
  </div>
</div>

  );
}

export default ContactEach;
