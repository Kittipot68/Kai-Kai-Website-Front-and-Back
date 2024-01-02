import React, { useEffect, useState, useRef } from 'react';
import CategoryRecipe from './CategoryRecipe';
import { Card, Spinner, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowRecipe from './ShowRecipe';

function RecipeItem() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Set the number of items per page
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeRecipeModal();
    }
  };


  useEffect(() => {
    // Add this useEffect hook to scroll to the top when currentPage changes
    window.scrollTo(0, 0);
  }, [currentPage]); // Re-run the effect when currentPage changes


  
  useEffect(() => {
    if (showRecipeModal) {
      document.addEventListener('mousedown', handleClickOutsideModal);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, [showRecipeModal]);

  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';


  const handleCategorySelect = (category) => {
    setIsLoading(true);
    // Simulating an API call with setTimeout
    setShowRecipeModal(false);
    setSelectedProduct(null);
    setTimeout(() => {
      const transformedCategory = {
        ...category,
        name:
          selectedLanguage === 'en'
            ? category.name_en
            : selectedLanguage === 'jpn'
            ? category.name_jpn
            : selectedLanguage === 'cn'
            ? category.name_cn
            : category.name,
        products: category.products.map((product) => ({
          ...product,
          name:
            selectedLanguage === 'en'
              ? product.name_en
              : selectedLanguage === 'jpn'
              ? product.name_jpn
              : selectedLanguage === 'cn'
              ? product.name_cn
              : product.name,
          // You can add more language-specific properties for products if needed
        })),
      };
      

      setSelectedCategory(transformedCategory);
      setIsLoading(false);
      setCurrentPage(1); // Reset to the first page when a new category is selected

    }, 1000); // Replace this with your actual API call
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedCategory?.products?.slice(indexOfFirstItem, indexOfLastItem);


  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowRecipeModal(true);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
    setSelectedProduct(null);
  };


  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  console.log("showRecipeModal", showRecipeModal)
  return (
    <div className="container py-5">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <CategoryRecipe onSelectCategory={handleCategorySelect} disabled={isLoading} />
        </div>
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center">
              <Spinner size="xl" className='mt-5' color="failure" />
            </div>
          ) : selectedProduct ? (
            <ShowRecipe product={selectedProduct} onClose={closeRecipeModal} />
          ) : selectedCategory ? (
            <div>
              <h2 className="text-4xl mb-3  px-4 text-center  mx-auto text-red-600 font-semibold">{selectedCategory.name}</h2>
              <div className="grid  mx-auto    sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10">
              {currentItems &&
                  currentItems.map((product) => (
                    <Card key={product.id} onClick={(e) => handleProductClick(product)} className="mb-4   cursor-pointer overflow-hidden group">
                      {product.picture && (
                        <div className="transition-transform transform group-hover:scale-105 duration-300 ease-in-out">
                          <img
                            loading='lazy'
                            src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${product.picture}`}
                            alt={product.name}
                            className="card-img-top"
                          />
                        </div>
                      )}
                      <div className="card-body">
                        <h3 className="card-title text-2xl font-bold   text-red-600 mb-2">{product.name}</h3>

                        <p className="card-text text-gray-700">{/* Add description or other details here */}</p>
                        {/* Uncomment the following line if you have a price */}
                        {/* <p className="card-text text-green-600 font-semibold">Price: ${product.price}</p> */}
                      </div>
                    </Card>

                  ))}
                  
              </div>
              {currentItems.length > 0 && ( // Add this condition to check if currentItems has items

<div className="flex justify-center">
  <Pagination className="mt-10 custom-pagination mx-auto">
    <Pagination.Prev
      className="mr-3"
      onClick={() => handlePaginationClick(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Prev
    </Pagination.Prev>
    {Array.from({ length: Math.ceil(selectedCategory.products.length / itemsPerPage) }).map((_, index) => (
      <Pagination.Item
        key={index + 1}
        active={index + 1 === currentPage}
        onClick={() => handlePaginationClick(index + 1)}
        className='mr-2 '
        style={{ borderColor: 'red' }}
      >
        {index + 1}
      </Pagination.Item>
    ))}
    <Pagination.Next
      className="ml-3"
      onClick={() => handlePaginationClick(currentPage + 1)}
      disabled={currentPage === Math.ceil(selectedCategory.products.length / itemsPerPage)}
    >
      Next
    </Pagination.Next>
  </Pagination>

</div>
   )}
            </div>
          ) : (
            <div className="text-center">Please select a category.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
