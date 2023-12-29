import React, { useState } from 'react';
import Header from '../Component/Header';
import Map from '../Component/Contact/Map';
import Footer from '../Component/Footer';
import SelectContact from '../Component/Contact/SelectContact';
import ContactEach from '../Component/Contact/ContactEach'; // Import the ContactEach component

function Contact() {
  
    return (
      <div>
        <SelectContact /> {/* Pass setSelectedCompany as a prop */}
      </div>
    );
  }
  
  export default Contact;
