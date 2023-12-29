import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Homepage from './Pages/Homepage';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Affiliate from './Pages/Affiliate';
import Product from './Pages/Product';
import Recipe from './Pages/Recipe';
import Notfoundpage from './Pages/Notfoundpage';
import About from './Pages/About';
import HomeBackend from './BackendPage/Pages/Home'
import AffiliateBackend from './BackendPage/Pages/Affiliate';
import Navbackend from './BackendPage/navbackend'
import BackendNotfoundpage from './BackendPage/Pages/BackendNotfoundpage';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Floaticon from './Component/Floaticon';
import FileUploadForm from './BackendPage/Pages/fileuploadform';
import ProductBackend from './BackendPage/Pages/Product';
import RecipeBackend from './BackendPage/Pages/Recipe';
import AboutBackend from './BackendPage/Pages/About';
import ContactBackend from './BackendPage/Pages/Contact';
import Login from './Pages/Login';
import Protected from './Component/Protected';

import './index.css';

function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <Router basename="/sungroup" >
      <ScrollToTop />

      <Routes>

        <Route path="/" element={<Header>  <Home /> </Header>} />

        <Route path="/sungroup" element={<Header>  <Home /> </Header>} />

        <Route path="/Contact" element={<Header>  <Contact /> </Header>} />
        <Route path="/AffiliateCorporations" element={<Header><Affiliate /></Header>} />
        {/* <Route path="/sungroup/AffiliateCorporations" element={<Header><Affiliate /></Header>} /> */}
        <Route path="/Product" element={<Header><Product /></Header>} />
        <Route path="/Recipe" element={<Header><Recipe /></Header>} />
        <Route path="/Homepage" element={<Header><Homepage /></Header>} />
        <Route path="/About" element={<Header><About /></Header>} />

        {/* This route will match if no other route matches */}
        <Route path="*" element={<Header><Notfoundpage /></Header>} />
        {/* <Route path="/backend/*" element={<Navbackend> <BackendNotfoundpage /> </Navbackend>} /> */}
        {/* <Route path="/backend" element={<Navbackend> <HomeBackend /> </Navbackend>} /> */}
        <Route path='/Login' element={<Login />}></Route>

        <Route path="/HomeBackend" element=      {<Protected> <Navbackend> <HomeBackend /> </Navbackend> </Protected> } />
        <Route path="/AffiliateBackend" element= {<Protected><Navbackend> <AffiliateBackend /></Navbackend> </Protected>} />
        <Route path="/Fileuploadform" element=   {<Protected><Navbackend> <FileUploadForm />  </Navbackend> </Protected>} />
        <Route path="/ProductBackend" element=   {<Protected><Navbackend> <ProductBackend />  </Navbackend> </Protected>} />
        <Route path="/RecipeBackend" element=    {<Protected><Navbackend> <RecipeBackend />   </Navbackend> </Protected>} />
        <Route path="/AboutBackend" element=     {<Protected><Navbackend> <AboutBackend />    </Navbackend> </Protected>} />
        <Route path="/ContactBackend" element=   {<Protected><Navbackend> <ContactBackend />  </Navbackend> </Protected>} />

      </Routes>
    </Router>
  );
}

export default App;
