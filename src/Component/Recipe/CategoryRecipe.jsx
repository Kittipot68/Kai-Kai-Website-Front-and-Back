import React, { useState, useEffect } from 'react';

function CategoryRecipe({ onSelectCategory, disabled }) {

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // useEffect(() => {
  //   // Fetch categories when the component mounts
  //   fetch('https://sungroup.co.th/sungroup/Php-Api/Recipe.php')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCategories(data);
  //       if (data.length > 0) {
  //         // Set the first category as active when categories are fetched
  //         setActiveCategory(data[0]);
  //         fetchProducts(data[0]);
  //       }
  //     })
  //     .catch((error) => console.error('Error fetching categories:', error));
  // }, []);


  const fetchDataFromDatabase = async () => {
    // Retrieve the selected language from local storage
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
  
    try {
      // Fetch data based on the selected language
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Recipe.php')
      const fetchedData = await response.json();
  
      // Map over the array and conditionally select content_en when selectedLanguage is 'en'
      const transformedData = fetchedData.map((item) => ({
        ...item,
        name:
          selectedLanguage === 'en'
            ? item.name_en
            : selectedLanguage === 'jpn'
            ? item.name_jpn
            : selectedLanguage === 'cn'
            ? item.name_cn
            : item.name,
      }));
      
      console.log("transformedData", transformedData[0]);
  
      setCategories(transformedData);
      if (transformedData.length > 0) {
        // Set the first category as active when categories are fetched
        setActiveCategory(transformedData[0]);
        // Fetch products for the first category
        fetchProducts(transformedData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);


  const fetchProducts = (category) => {
    fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${category.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // Add other necessary headers
      }
    })
      .then(response => response.json())
      .then(data => {
        const categoryWithProducts = {
          id: category.id,
          name: category.name,
          products: data // Assuming data has the structure [{ id, name, price }]
        };

        // Pass category with products to the parent component (ProductItem)
        onSelectCategory(categoryWithProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleSelectCategory = (category) => {
    // If the component is disabled, do nothing
    if (disabled) {
      return;
    }

    // If the clicked category is the currently active one, do nothing
    if (activeCategory && activeCategory.id === category.id) {
      return;
    }

    // Set the selected category as active
    setActiveCategory(category);

    // Fetch products associated with the selected category
    fetchProducts(category);
  };


  return (
    <div className={`p-2 ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
    <ul className="divide-y divide-gray-200">
      {categories.map((category) => (
       <li
       key={category.id}
       onClick={() => handleSelectCategory(category)}
       className={`py-2  rounded-md cursor-pointer transition duration-300 ease-in-out p-1  text-2xl lg:text-xl  ${activeCategory && activeCategory.id === category.id ? 'text-white text-center bg-red-600 font-bold' : ' text-center hover:bg-red-200 '}`}
     >
       {category.name}
     </li>
     
      ))}
    </ul>
  </div>
  );
}

export default CategoryRecipe;
