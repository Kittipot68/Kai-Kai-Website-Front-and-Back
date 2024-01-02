import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';

const ShowRecipe = ({ product, onClose }) => {

    const [how, sethow] = useState([]);
    const [ingrediant, setingrediant] = useState([]);




    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);

    const handleBackToProduct = () => {
        onClose(); // Close the ShowRecipe component
    };

    // const fetchrecipehowdata = () => {
    //     fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
    //         method: 'GETRECIPEHOW',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // Add other necessary headers
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             sethow(data)
    //         })
    //         .catch(error => console.error('Error fetching products:', error));
    // };

    const fetchrecipehow = async () => {
        // Retrieve the selected language from local storage
        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
      
        try {
          // Fetch data based on the selected language
          const response = await 
          fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
            method: 'GETRECIPEHOW',
            headers: {
                'Content-Type': 'application/json'
                // Add other necessary headers
            }
        }) ;         
        const fetchedData = await response.json();
      
          // Map over the array and conditionally select content_en when selectedLanguage is 'en'
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
          }));
          
      
          sethow(transformedData);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        fetchrecipehow();
      }, []);



    // const fetchrecipeingrediant = () => {
    //     fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
    //         method: 'GETRECIPEINGREDIANT',
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // Add other necessary headers
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setingrediant(data)
    //         })
    //         .catch(error => console.error('Error fetching products:', error));
    // };

    const fetchrecipeingrediant = async () => {
        // Retrieve the selected language from local storage
        const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
      
        try {
          // Fetch data based on the selected language
          const response = await 
          fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
            method: 'GETRECIPEINGREDIANT',
            headers: {
                'Content-Type': 'application/json'
                // Add other necessary headers
            }
        }) ;         
        const fetchedData = await response.json();
      
          // Map over the array and conditionally select content_en when selectedLanguage is 'en'
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
          }));
          
      
          setingrediant(transformedData);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchrecipeingrediant();
    }, [])



    return (
        <div className="recipe-details p-4 md:p-8 bg-white shadow-lg rounded-md">
            {/* <button
                className="mt-4 mb-4 bg-slate-200 px-4 py-2 rounded-md text-black hover:bg-slate-400 "
                onClick={handleBackToProduct}
            >
                <i className="fa-solid fa-caret-left text-2xl mr-3"></i>
                <span className="text-lg">ย้อนกลับ</span>
            </button> */}
            <div className='bg-red-600 p-3 mb-3 rounded-md text-center'>
            <h2 className="text-4xl  text-white p-2 font-semibold mb-2 md:mb-4">{product.name}</h2>

            </div>

            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* First Column - Picture */}
                <div>
                    <img
                        src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${product.picture}`}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                {/* Second Column - YouTube Iframe */}
                <div className="md:pl-4">
                    {/* Replace 'yourYouTubeVideoID' with the actual ID of your YouTube video */}
                    <div className="responsive-iframe-container">
                        <iframe
                            title="recipe-video"
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${product.youtube}`}
                            frameBorder="0"
                            allowFullScreen
                            className="object-cover"
                        ></iframe>
                    </div>
                </div>
            </div>


            {/* Second Row */}
            {/* <div className="flex flex-wrap mb-4">
                <div className="bg-white p-6 rounded-md shadow-md flex items-center mb-4 mr-4">
                    <i className="fa-regular fa-clock text-3xl text-blue-700 mr-4"></i>
                    <p className="text-lg md:text-2xl font-medium">Cooking Time: {product.cookingtime}</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md flex items-center mb-4 mr-4">
                    <i className="fa-solid fa-fire text-3xl text-red-700 mr-4"></i>
                    <p className="text-lg md:text-2xl font-medium">Calories: {product.calorie}</p>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md flex items-center mb-4">
                    <i className="fa-solid fa-bowl-rice text-3xl text-green-700 mr-4"></i>
                    <p className="text-lg md:text-2xl font-medium">Serves: {product.serves}</p>
                </div>
            </div> */}


            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Column - Show Ingredients */}
                <div className="bg-yellow-100 p-6 rounded-md shadow-md mb-4">
                    <h3 className="text-4xl text-red-600 font-semibold mb-2">Ingredients</h3>
                    <ul>
                        {ingrediant.map((ingredient, index) => (
                            <li key={index} className="border-b py-2 border-gray-400  mt-3 text-2xl md:text-xl">{index + 1}. {ingredient.content}</li>
                        ))}
                    </ul>
                </div>

                {/* Second Column - Show Steps to Cook */}
                <div className="bg-yellow-100 p-6 rounded-md border shadow-md mb-4">
                    <h3 className="text-4xl text-red-600 font-semibold mb-2">Steps to Cook</h3>
                    <ol>
                        {how.map((how, index) => (
                            <li key={index} className="border-b py-2 border-gray-400  mt-3 text-2xl md:text-xl">{index + 1}. {how.content}</li>
                        ))}
                    </ol>
                </div>
            </div>


            {/* Back to Product Button */}
            <button
                className="mt-4  bg-slate-200 px-4 py-2 rounded-md text-black hover:bg-slate-400 "
                onClick={handleBackToProduct}
            >
                <i className="fa-solid fa-caret-left text-2xl mr-3"></i>
                <span className="text-lg">Back</span>
            </button>

        </div>
    );
};

export default ShowRecipe;
