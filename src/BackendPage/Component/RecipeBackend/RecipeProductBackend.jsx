import React, { useState, useEffect } from 'react';
import RecipeCategoryBackend from './RecipeCategoryBackend';
import ShowRecipeBackend from './ShowRecipeBackend';
import { Button, Modal } from 'flowbite-react';



function RecipeProductBackend() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [editName, setEditName] = useState('');
    const [editNameEN, setEditNameEN] = useState('');
    const [editNameCN, setEditNameCN] = useState('');
    const [editNameJPN, setEditNameJPN] = useState('');

    const [editPicture, setEditPicture] = useState('');
    const [editid, seteditid] = useState('');
    const [oldpicname, setoldpicname] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showRecipeModal, setShowRecipeModal] = useState(false);
  

    console.log(selectedCategory,"selected")

   

    const [editedpicture, seteditedpicture] = useState('')
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [showpopupcontent, setshowpopupcontent] = useState(false);
    const [showpopuppicture, setshowpopuppicture] = useState(false);





    // ... (rest of your code remains the same)

    const handleEditName = (product) => {
        setEditName(product.name);
        setEditNameCN(product.name_cn)
        setEditNameEN(product.name_en)
        setEditNameJPN(product.name_jpn)
        seteditid(product.id);
        setEditPicture(product.picture);
        setshowpopupcontent(true);
    };

    const handleEditRecipe = (recipe) => {
        setSelectedProduct(recipe);
        setShowRecipeModal(true);
    }

    const closeRecipeModal = () => {
        setShowRecipeModal(false);
        setSelectedProduct(null);
      };

    const handleclosepopup = () => {
        setEditName('');
        setEditNameCN('')
        setEditNameEN('')
        setEditNameJPN('')
        seteditid('');
        setEditPicture('');
        setshowpopupcontent(false);
        setshowpopuppicture(false)
        setoldpicname('')
        setFile(null)
        setPreview(null)


    }

    const handleSaveName = () => {
        // Update the name and close the edit popup
        // setEditName({ show: false, productName: '' });

        // You'd ideally make a similar fetch request to update the product name in your backend here
    };

    const handleEditPicture = (product) => {
        setEditName(product.name);
        setEditNameCN(product.name_cn)
        setEditNameEN(product.name_en)
        setEditNameJPN(product.name_jpn)
        seteditid(product.id);
        setEditPicture(product.picture);
        setshowpopuppicture(true);
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
            fetch(`https://sungroup.co.th/Php-Api/Recipe.php`, {
                method: 'PUTNEWRECIPE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id: editid
                    , name: editName
                    ,name_en : editNameEN
                    ,name_cn : editNameCN
                    ,name_jpn: editNameJPN
                    ,photo: editPicture })
            })
                .then(response => response.json())
                .then(data => {
                    // Assuming the 'data' object returned from the API contains the updated product details
                    // Update the state using the data received from the API
                    setEditName('');
                    seteditid('');
                    setEditPicture('');
                    setshowpopupcontent(false);
                    setshowpopuppicture(false);
                    setoldpicname('')
                    setEditNameCN('')
                    setEditNameEN('')
                    setEditNameJPN('')
                    setFile(null)
                    setPreview(null)

                    // Assuming you have a state to hold the selected category's products and you want to update it
                    // For instance, if 'selectedCategory' is the state holding the category data:
                    setSelectedCategory(prevCategory => {
                        const updatedProducts = prevCategory.products.map(product => {
                            if (product.id === editid) {
                                return {
                                    ...product,
                                    name: editName,
                                    name_en : editNameEN,
                                    name_cn :editNameCN,
                                    name_jpn : editNameJPN, 
                                    picture: editPicture 
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
        setShowRecipeModal(false);
        setSelectedProduct(null);
        // Simulating an API call with setTimeout
        setTimeout(() => {
            setSelectedCategory(category);
            setIsLoading(false);
        }, 1000); // Replace this with your actual API call
    };

    const handleAddNewProduct = () => {
        if (selectedCategory) {
            fetch('https://sungroup.co.th/Php-Api/Recipe.php', {
                method: 'POSTADDRECIPE', // Assuming this is the correct method to add a product
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_id: selectedCategory.id, name: "New Recipe", picture: "Recipe.jpg",name_en:"",name_cn:"",name_jpn:"" })
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


    const handleDeleteProduct = async (productId) => {
        if (selectedCategory) {
            const confirmDelete = window.confirm('Are you sure you want to delete this product?');

            if (confirmDelete) {
                try {
                    // Delete recipe
                    const deleteRecipeResponse = await fetch(`https://sungroup.co.th/Php-Api/Recipe.php/${productId.id}`, {
                        method: 'DELETERECIPE', // Assuming this is the correct method to delete a product
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!deleteRecipeResponse.ok) {
                        throw new Error('Failed to delete the product');
                    }

                    // Delete picture
                    const deletePictureResponse = await fetch('https://sungroup.co.th/Php-Api/uploadpicture.php/', {
                        method: 'DELETE',
                        body: JSON.stringify({ file_name: productId.picture }), // Assuming item is your product data
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!deletePictureResponse.ok) {
                        throw new Error('Failed to delete the picture');
                    }

                    // Update state after successful deletion
                    setSelectedCategory((prevCategory) => ({
                        ...prevCategory,
                        products: prevCategory.products.filter((product) => product.id !== productId.id),
                    }));
                } catch (error) {
                    console.error('Error deleting product or picture:', error);
                }
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
                const deletePictureResponse = await fetch('https://sungroup.co.th/Php-Api/uploadpicture.php/', {
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
            fetch('https://sungroup.co.th/Php-Api/uploadpicture.php/', {
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
                <RecipeCategoryBackend onSelectCategory={handleCategorySelect} />
            </div>
            <div className="lg:w-3/4 lg:pl-4 mt-4 lg:mt-0">
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : selectedProduct ? (
                    <ShowRecipeBackend product={selectedProduct} onClose={closeRecipeModal} />
                  ): selectedCategory ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Products in {selectedCategory.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedCategory.products &&
                                selectedCategory.products.map((product) => (

                                    <div key={product.id} className="border rounded-md p-4">
                                        {product.picture && <img
                                            src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${product.picture}`}
                                            alt={product.name}
                                            className="mb-2 w-64 h-64"
                                        />
                                        }
                                        <h3 className="text-lg font-semibold">{product.name}</h3>
                                        {/* <p className="text-base">Price: ${product.price}</p> */}
                                        <div className="mt-4 grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-6">
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-700 text-white  font-bold py-2 px-4 rounded"
                                                onClick={() => handleEditName(product)}
                                            >
                                                Edit Name
                                            </button>

                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleEditPicture(product)}
                                            >
                                                Edit Picture
                                            </button>

                                            <button
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleEditRecipe(product)}
                                            >
                                                Edit Recipe
                                            </button>

                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleDeleteProduct(product)}
                                            >
                                                Delete
                                            </button>
                                        </div>



                                        {/* Edit Name Popup */}
                                        {/* {showpopupcontent && (
                                            <div className="fixed inset-0 bg-gray-600 bg-opacity-5 flex justify-center items-center">
                                                <div className="bg-white p-8 rounded-lg">
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        className="border-2 border-gray-400 p-2 mb-4"
                                                    />


                                                    
                                                    <div className="flex justify-end">
                                                        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                                                            onClick={handleclosepopup}>




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
                        
                        </div>



                      </Modal.Body>
                      <Modal.Footer>
                        {/* Add buttons or actions for saving/canceling the edits */}

                        <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleUpdateProduct}>
                                                            Save
                                                        </button>



                        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                                                            onClick={handleclosepopup}>




                                                            Close
                                                        </button>                        {/* onClick={closeEditModal} */}
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

export default RecipeProductBackend;
