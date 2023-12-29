import React, { useState, useEffect } from 'react';
import Category from './CategoryBackend';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';


function ProduckBackend() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [editName, setEditName] = useState('');
  const [editNameEN, setEditNameEN] = useState('');
  const [editDescription, seteditDescription] = useState('');
  const [editDescriptionEN, seteditDescriptionEN] = useState('');

  const [editNameCN, setEditNameCN] = useState('');
  const [editNameJPN, setEditNameJPN] = useState('');

  const [editDescriptionCN, seteditDescriptionCN] = useState('');
  const [editDescriptionJPN, seteditDescriptionJPN] = useState('');



  const [editLinkProduct, seteditLinkProduct] = useState('');


  const [editPicture, setEditPicture] = useState('');
  const [editid, seteditid] = useState('');


  const [editedpicture, seteditedpicture] = useState('')
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [showpopupcontent, setshowpopupcontent] = useState(false);
  const [showpopuppicture, setshowpopuppicture] = useState(false);
  const [oldpicname, setoldpicname] = useState('');

  // Assuming this is inside a React functional component
  // ... (rest of your code remains the same)

  const handleEditName = (product) => {
    setEditName(product.name);
    setEditNameEN(product.name_en);
    seteditid(product.id);
    seteditDescription(product.description)
    seteditDescriptionEN(product.description_en)

    seteditDescriptionCN(product.description_cn)
    seteditDescriptionJPN(product.description_jpn)
    setEditNameCN(product.name_cn)
    setEditNameJPN(product.name_jpn)

    setEditPicture(product.photo);
    setshowpopupcontent(true);
    seteditLinkProduct(product.line)
  };


  const handleclosepopup = () => {
    setEditName('');
    setEditNameEN('');
    seteditDescription('');
    seteditid('');
    setEditPicture('');
    setshowpopupcontent(false);
    setshowpopuppicture(false)
    seteditDescriptionEN('')
    seteditLinkProduct('')

    seteditDescriptionCN('')
    seteditDescriptionJPN('')
    setEditNameCN('')
    setEditNameJPN('')

    setPreview(null)
    setFile(null)
    setoldpicname('')


  }

  const handleSaveName = () => {
    // Update the name and close the edit popup
    // setEditName({ show: false, productName: '' });

    // You'd ideally make a similar fetch request to update the product name in your backend here
  };

  const handleEditPicture = (product) => {
    setEditName(product.name);
    setEditNameEN(product.name_en);
    seteditDescription(product.description)
    seteditid(product.id);
    setEditPicture(product.photo);
    setshowpopuppicture(true);
    seteditDescriptionEN(product.description_en)
    seteditLinkProduct(product.line)

    seteditDescriptionCN(product.description_cn)
    seteditDescriptionJPN(product.description_jpn)
    setEditNameCN(product.name_cn)
    setEditNameJPN(product.name_jpn)



    setoldpicname(product.picture)
    setFile(null)
    setPreview(null)
  };

  const handleSavePicture = () => {
    // Update the picture and close the edit popup
    setEditPicture({ show: false, productID: null });

    // You'd ideally make a similar fetch request to update the product picture in your backend here
  };

  const handleUpdateProduct = () => {
    if (editid) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Product.php`, {
        method: 'PUTNEWPRODUCT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: editid,
           name: editName,
            photo: editPicture,
            name_en: editNameEN,
            name_cn:editNameCN,
            name_jpn:editNameJPN,
            description: editDescription,
            description_en: editDescriptionEN,
            description_cn: editDescriptionCN,
            description_jpn : editDescriptionJPN,
            line: editLinkProduct,
           })
      })
        .then(response => response.json())
        .then(data => {
          // Assuming the 'data' object returned from the API contains the updated product details
          // Update the state using the data received from the API
          setEditName('');
          seteditDescription('');
          setEditNameEN('');
          seteditid('');
          setEditPicture('');
          setshowpopupcontent(false);
          setshowpopuppicture(false);
          seteditDescriptionEN('');
          seteditLinkProduct('');
          seteditDescriptionCN('');
          seteditDescriptionJPN('');
          setEditNameCN('');
          setEditNameJPN('');
          setoldpicname('')

          // Assuming you have a state to hold the selected category's products and you want to update it
          // For instance, if 'selectedCategory' is the state holding the category data:
          setSelectedCategory(prevCategory => {
            const updatedProducts = prevCategory.products.map(product => {
              if (product.id === editid) {
                return {
                  ...product,
                  name: editName, // Assuming editName holds the updated product name\
                  name_en: editNameEN,
                  description: editDescription,
                  description_en: editDescriptionEN,
                  description_cn:editDescriptionCN,
                  description_jpn:editDescriptionJPN,
                  name_cn:editNameCN,
                  name_jpn:editNameJPN,
                  line: editLinkProduct,
                  photo: editPicture // Assuming editPicture holds the updated product photo
                };
              }
              return product;
            });

            return {
              ...prevCategory,
              products: updatedProducts
            };
          });
        })
        .catch(error => console.error('Error updating category:', error));
    }
  };




  const handleCategorySelect = (category) => {
    setIsLoading(true);
    // Simulating an API call with setTimeout
    setTimeout(() => {
      setSelectedCategory(category);
      setIsLoading(false);
    }, 1000); // Replace this with your actual API call
  };

  const handleAddNewProduct = () => {
    if (selectedCategory) {
      fetch('https://sungroup.co.th/sungroup/Php-Api/Product.php', {
        method: 'POSTADDPRODUCT', // Assuming this is the correct method to add a product
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category_id: selectedCategory.id, name: "New Product", photo: "product.jpg" })
        // Replace name and photo with the actual details of the new product
      })
        .then(response => response.json())
        .then(newProduct => {
          // Assuming the new product is returned after adding it
          setSelectedCategory(prevCategory => ({
            ...prevCategory,
            products: [...(prevCategory.products || []), newProduct.data]
          }));
        })
        .catch(error => console.error('Error adding new product:', error));
    }
  };


  const handleDeleteProduct = (productId) => {
    if (selectedCategory) {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');

      if (confirmDelete) {
        fetch(`https://sungroup.co.th/sungroup/Php-Api/Product.php/${productId}`, {
          method: 'DELETEPRODUCT', // Assuming this is the correct method to delete a product
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              setSelectedCategory(prevCategory => ({
                ...prevCategory,
                products: prevCategory.products.filter(product => product.id !== productId)
              }));
            } else {
              throw new Error('Failed to delete the product');
            }
          })
          .catch(error => console.error('Error deleting product:', error));
      }
    }
  };

  function generateUniqueFileName(originalFileName) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileExtension = originalFileName.split('.').pop(); // Get the file extension
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
    return uniqueFileName;
  }



  const handleUpload = async (namepicture) => {

    if (file) {
        // Delete the old file
        try {
            const deletePictureResponse = await fetch('https://sungroup.co.th/sungroup/Php-Api/uploadpicture.php/', {
                method: 'DELETE',
                body: JSON.stringify({ file_name: namepicture }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!deletePictureResponse.ok) {
                // Handle non-successful response, if needed
                setoldpicname('')

                console.error('Error deleting old file:', deletePictureResponse.statusText);
                return;
            }
        } catch (error) {
            // Handle errors, if needed
            console.error('Error deleting old file:', error);
            return;
        }

        // Upload the new file
        const formData = new FormData();
        formData.append('file', file, editPicture); // Append the unique filename
        fetch('https://sungroup.co.th/sungroup/Php-Api/uploadpicture.php/', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    handleUpdateProduct();

                    // You can add additional logic here, e.g., update UI or state
                } else {
                    alert('Upload failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        alert('Please select a file to upload');
    }
};

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const uniqueFileName = generateUniqueFileName(selectedFile.name); // Generate a unique filename
    if (selectedFile) {
      setEditPicture(uniqueFileName)

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="lg:w-1/4 lg:pr-4 lg:border-r-2">
        <Category onSelectCategory={handleCategorySelect} />
      </div>
      <div className="lg:w-3/4 lg:pl-4 mt-4 lg:mt-0">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : selectedCategory ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Products in {selectedCategory.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCategory.products &&
                selectedCategory.products.map((product) => (

                  <div key={product.id} className="border rounded-md p-4">
                    {product.photo && <img
                      src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${product.photo}`}
                      alt={product.name}
                      className="mb-2 w-64 h-64"
                      loading='lazy'
                    />
                    }
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className='mt-2 overflow-y-auto max-h-40 whitespace-pre-line'>{product.description}</p>


                    </div>



                    {/* <p className="text-base">Price: ${product.price}</p> */}
                    <div className="mt-4 grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-6">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white  font-bold py-2 px-4 rounded"
                        onClick={() => handleEditName(product)}
                      >
                        Edit Name and Description
                      </button>





                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEditPicture(product)}
                      >
                        Edit Picture
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>



                    {/* Edit Name Popup */}
                    {/* {showpopupcontent && (
   <div className=" fixed inset-0 bg-gray-600 bg-opacity-5 flex justify-center items-center">
   <div className="border bg-white p-8 rounded-lg w-96">
      <div>
        <label htmlFor="editName" className="block text-sm font-medium text-gray-600 mb-2">Edit Name  (Thai):</label>
        <textarea
          id="editName"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
        />
      </div>
      <div>
        <label htmlFor="editDescription" className="block text-sm font-medium text-gray-600 mb-2">Edit Description (Thai):</label>
        <textarea
          id="editDescription"
          value={editDescription}
          onChange={(e) => seteditDescription(e.target.value)}
          className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
        />
      </div>

      <div>
        <label htmlFor="editNameEN" className="block text-sm font-medium text-gray-600 mb-2">Edit Name (English):</label>
        <textarea
          id="editNameEN"
          value={editNameEN}
          onChange={(e) => setEditNameEN(e.target.value)}
          className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
        />
      </div>
      <div>
        <label htmlFor="editDescriptionEN" className="block text-sm font-medium text-gray-600 mb-2">Edit Description (English):</label>
        <textarea
          id="editDescriptionEN"
          value={editDescriptionEN}
          onChange={(e) => seteditDescriptionEN(e.target.value)}
          className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
        />
      </div>

      <div>
        <label htmlFor="editLinkProduct" className="block text-sm font-medium text-gray-600 mb-2">Edit Description (English):</label>
        <textarea
          id="editLinkProduct"
          value={editLinkProduct}
          onChange={(e) => seteditLinkProduct(e.target.value)}
          className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
        />
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={handleclosepopup}>
          Close
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleUpdateProduct}>
          Save
        </button>
      </div>
    </div>
  </div>
)} */}

                    <Modal show={showpopupcontent} >
                      {/* onClose={closeEditModal} */}
                      <Modal.Body>
                        <div>
                          <label htmlFor="editName" className="block font-bold  text-2xl text-red-600 mb-2">Edit Name and description (ไทย):</label>
                          <textarea
                            id="editName"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={1}

                          />
                          <textarea
                            id="editDescription"
                            value={editDescription}
                            onChange={(e) => seteditDescription(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={4}

                          />
                        </div>


                        <div>
                          <label htmlFor="editNameEN" className="block font-bold  text-2xl text-red-600 mb-2">Edit Name and description (English):</label>
                          <textarea
                            id="editNameEN"
                            value={editNameEN}
                            onChange={(e) => setEditNameEN(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={1}

                          />
                          <textarea
                            id="editDescriptionEN"
                            value={editDescriptionEN}
                            onChange={(e) => seteditDescriptionEN(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={4}

                          />
                        </div>

                        <div>
                          <label htmlFor="editNameCN" className="block font-bold  text-2xl text-red-600 mb-2">Edit Name and description (จีน):</label>
                          <textarea
                            id="editNameCN"
                            value={editNameCN}
                            onChange={(e) => setEditNameCN(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={1}

                          />
                          <textarea
                            id="editDescriptionCN"
                            value={editDescriptionCN}
                            onChange={(e) => seteditDescriptionCN(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={4}

                          />
                        </div>

                        <div>
                          <label htmlFor="editNameJPN" className="block font-bold  text-2xl text-red-600 mb-2">Edit Name and description (ญี่ปุ่น):</label>
                          <textarea
                            id="editNameJPN"
                            value={editNameJPN}
                            onChange={(e) => setEditNameJPN(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={1}
                          />
                          <textarea
                            id="editDescriptionJPN"
                            value={editDescriptionJPN}
                            onChange={(e) => seteditDescriptionJPN(e.target.value)}
                            className="border-2 border-gray-400 p-2 mb-4 w-full resize-y"
                            rows={4}
                          />
                        </div>



                      </Modal.Body>
                      <Modal.Footer>
                        {/* Add buttons or actions for saving/canceling the edits */}

                        <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleUpdateProduct}>
                          Save
                        </button>



                        <Button onClick={handleclosepopup} >Cancel</Button>
                        {/* onClick={closeEditModal} */}
                      </Modal.Footer>
                    </Modal>





                    {/* Edit Picture Popup */}
                    {showpopuppicture && (
                      <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-5 z-50">
                        <div className="bg-white p-8 rounded-lg w-80 md:w-96">
                          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                          <label htmlFor="fileInput" className="block bg-blue-500 text-white rounded-lg cursor-pointer p-2 hover:bg-blue-600 text-center">
                            Choose a File
                          </label>
                          {preview && (
                            <div className="text-center mt-4">
                              <h3 className="text-lg font-semibold mb-2">Preview</h3>
                              <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 rounded-md"
                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                              />
                            </div>
                          )}
                          <div className="flex justify-between mt-4">
                            <button
                              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 hover:text-gray-800"
                              onClick={handleclosepopup}
                            >
                              Close
                            </button>

                            
                            <button
                                                            onClick={(e) => handleUpload(oldpicname)}
                                                            className={`py-2 px-4 rounded ${!file ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white  hover:bg-blue-600'}`}
                                                            disabled={!file}
                                                        >
                                                            Upload
                                                        </button>

                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleAddNewProduct}
            >
              Add New Product
            </button>
          </div>
        ) : (
          <div className="text-center">Please select a category.</div>
        )}
      </div>
    </div>
  );
}

export default ProduckBackend;
