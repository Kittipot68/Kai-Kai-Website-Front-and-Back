// import React, { useState, useEffect } from 'react';
// import Category from './Category';
// import { Card, Spinner, Pagination } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function ProductItem() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6); // Set the number of items per page
//   const [isLoading, setIsLoading] = useState(false);
//   const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';

//   const handleCategorySelect = (category) => {
//     setIsLoading(true);
//     // Simulating an API call with setTimeout
//     setTimeout(() => {
//       const transformedCategory = {
//         ...category,
//         name: selectedLanguage === 'en' ? category.name_en : category.name,
//         products: category.products.map((product) => ({
//           ...product,
//           name: selectedLanguage === 'en' ? product.name_en : product.name,
//           description: selectedLanguage === 'en' ? product.description_en : product.description,
//         })),
//       };

//       setSelectedCategory(transformedCategory);
//       setIsLoading(false);
//       setCurrentPage(1); // Reset to the first page when a new category is selected
//     }, 1000); // Replace this with your actual API call
//   };

//   // Calculate the current items to display based on pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = selectedCategory?.products?.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const handlePaginationClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className="container py-5">
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//         <div className="lg:col-span-1">
//           <Category onSelectCategory={handleCategorySelect} disabled={isLoading} />
//         </div>
//         <div className="lg:col-span-3">
//           {isLoading ? (
//             <div className="text-center">
//               <Spinner size="xl" className="mt-5" color="failure" />
//             </div>
//           ) : selectedCategory ? (
//             <div>
//               <h2 className="text-2xl font-semibold mb-4">{selectedCategory.name}</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {currentItems &&
//                   currentItems.map((product) => (
//                     product.line ? (
//                       <a key={product.id} href={product.line} target="_blank" rel="noopener noreferrer">
//                         <Card className="mb-4">
//                           {product.photo && (
//                             <img
//                               loading="lazy"
//                               src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${product.photo}`}
//                               alt={product.name}
//                               className="mx-auto my-auto"
//                             />
//                           )}
//                           <div className="card-body">
//                             <h3 className="card-title text-lg font-semibold mb-2">{product.name}</h3>
//                             <p className="card-text text-gray-700 product-description">{product.description}</p>
//                           </div>
//                         </Card>
//                       </a>
//                     ) : (
//                       <Card key={product.id} className="mb-4">
//                         {product.photo && (
//                           <img
//                             loading="lazy"
//                             src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${product.photo}`}
//                             alt={product.name}
//                             className="mx-auto my-auto"
//                           />
//                         )}
//                         <div className="card-body">
//                           <h3 className="card-title text-lg font-semibold mb-2">{product.name}</h3>
//                           <p className="card-text text-gray-700">{product.description}</p>
//                         </div>
//                       </Card>
//                   )
//                   ))}
//               </div>
//               <div className="flex justify-center">
//                 <Pagination className="mt-4 custom-pagination mx-auto">
//                   <Pagination.Prev
//                     className="mr-3"
//                     onClick={() => handlePaginationClick(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   />
//                   {Array.from({ length: Math.ceil(selectedCategory.products.length / itemsPerPage) }).map((_, index) => (
//                     <Pagination.Item
//                       key={index + 1}
//                       active={index + 1 === currentPage}
//                       onClick={() => handlePaginationClick(index + 1)}
//                     >
//                       {index + 1}
//                     </Pagination.Item>
//                   ))}
//                   <Pagination.Next
//                     className="ml-3"
//                     onClick={() => handlePaginationClick(currentPage + 1)}
//                     disabled={currentPage === Math.ceil(selectedCategory.products.length / itemsPerPage)}
//                   />
//                 </Pagination>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center">Please select a category.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductItem;



import React, { useState, useEffect } from 'react';
import Category from './Category';
import { Card, Spinner, Pagination, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import shopee from '../../assets/shopee.png';
import ProductModal from './ProductModal';
function ProductItem() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Set the number of items per page
  const [isLoading, setIsLoading] = useState(false);
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'th';
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product for the modal
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    // Add this useEffect hook to scroll to the top when currentPage changes
    window.scrollTo(0, 0);
  }, [currentPage]); // Re-run the effect when currentPage changes



  const handleCategorySelect = (category) => {
    setIsLoading(true);
    // Simulating an API call with setTimeout
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
          description:
            selectedLanguage === 'en'
              ? product.description_en
              : selectedLanguage === 'jpn'
                ? product.description_jpn
                : selectedLanguage === 'cn'
                  ? product.description_cn
                  : product.description,
        })),
      };


      setSelectedCategory(transformedCategory);
      setIsLoading(false);
      setCurrentPage(1); // Reset to the first page when a new category is selected
    }, 1000); // Replace this with your actual API call
  };

  // Calculate the current items to display based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedCategory?.products?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const TruncatedText = ({ text, maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    return (
      <p className={`short-desc`}>
        {truncatedText}
      </p>
    );
  };

  return (
    <div className="container py-5">
      <div className="grid grid-cols-1 lg:grid-cols-4  gap-4">
        <div className="lg:col-span-1">
          <Category onSelectCategory={handleCategorySelect} disabled={isLoading} />
        </div>
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="text-center">
              <Spinner size="xl" className="mt-5" color="failure" />
            </div>
          ) : selectedCategory ? (
            <div>
              <h2 className="text-4xl px-4 text-center  mx-auto text-red-600 font-semibold">{selectedCategory.name}</h2>
              <div className="grid  mx-auto    sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-10">
                {currentItems &&
                  currentItems.map((product) => (

                    <div onClick={() => handleProductClick(product)} className="movie-cards mx-auto shadow-xl mt-10 mb-10  " style={{ width: '310px', height: '320px' }}  >
                      <div className="card">
                        <img
                          loading="lazy"
                          src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${product.photo}`}
                          alt={product.name}
                          className="mx-auto my-auto img-fluid" // Added img-fluid class
                          style={{ width: '500px', height: '320px' }} // Set the desired size

                        />
                        <div className="content">
                          <p className={`short-desc `}>
                            <TruncatedText text={product.description} maxLength={200} />
                          </p>
                          {/* <p className='infos'>
                            สนใจสินค้า สั่งซื้อได้ที่นี่

                            <div className="icons">
                              <a href={product.line}>
                                <i className={`fab fa-line text-3xl text-white`}></i>
                              </a>

                            </div>

                          </p> */}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl break-normal text-center text-red-600 font-semibold p-2"><TruncatedText text={product.name} maxLength={30} />
                        </h2>
                      </div>


                    </div>


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
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />

    </div>
  );
}

export default ProductItem;

