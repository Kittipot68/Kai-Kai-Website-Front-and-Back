import { Label } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';

function CategoryBackend({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // State to keep track of the category being edited
  const [newCategoryName, setNewCategoryName] = useState('');

  const [newCategoryNameEN, setNewCategoryNameEN] = useState('');
  const [newCategoryNameCN, setNewCategoryNameCN] = useState('');
  const [newCategoryNameJPN, setNewCategoryNameJPN] = useState('');


  useEffect(() => {
    // Fetch categories when the component mounts
    fetch('https://sungroup.co.th/sungroup/Php-Api/Product.php')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryNameEN(category.name_en)
    setNewCategoryNameCN(category.name_cn)
    setNewCategoryNameJPN(category.name_jpn)

    setShowEditPopup(true);
  };

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    fetch(`https://sungroup.co.th/sungroup/Php-Api/Product.php/${category.id}`, {
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
          products: data
        };
        onSelectCategory(categoryWithProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleCloseEditPopup = () => {
    setShowAddPopup(false);
    setShowEditPopup(false);
    setEditingCategory(null);
    setNewCategoryName('');
    setNewCategoryNameEN('')
    setNewCategoryNameCN('')
    setNewCategoryNameJPN('')
  };

  const handleAddCategory = () => {
    setShowAddPopup(true);
  };

  const handleSaveNewCategory = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/Product.php', {
      method: 'POSTADDCATEGORY',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newCategoryName,
         name_en: newCategoryNameEN,
        name_cn: newCategoryNameCN,
      name_jpn: newCategoryNameJPN })
    })
      .then(response => response.json())
      .then(data => {
        fetch('https://sungroup.co.th/sungroup/Php-Api/Product.php')
          .then((response) => response.json())
          .then((data) => setCategories(data))
          .catch((error) => console.error('Error fetching categories:', error));
          setShowAddPopup(false);
          setShowEditPopup(false);
          setEditingCategory(null);
          setNewCategoryName('');
          setNewCategoryNameEN('')
          setNewCategoryNameCN('')
          setNewCategoryNameJPN('')
      })
      .catch(error => console.error('Error adding new category:', error));
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Product.php`, {
        method: 'PUTNEWNAMECATEGORY',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editingCategory.id,
           name: newCategoryName,
            name_en: newCategoryNameEN,
           name_cn:newCategoryNameCN,
          name_jpn:newCategoryNameJPN
        })
      })
        .then(response => response.json())
        .then(data => {
          fetch('https://sungroup.co.th/sungroup/Php-Api/Product.php')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching categories:', error));
          setNewCategoryName('');
          setEditingCategory(null);
          setShowEditPopup(false);
          setNewCategoryNameEN('')
          setNewCategoryNameCN('')
          setNewCategoryNameJPN('')

        })
        .catch(error => console.error('Error updating category:', error));
    }
  };



  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Product.php/${categoryId}`, {
        method: 'DELETECATEGORY',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            // If the deletion was successful, fetch the updated category list
            fetch('https://sungroup.co.th/sungroup/Php-Api/Product.php')
              .then((response) => response.json())
              .then((data) => setCategories(data))
              .catch((error) => console.error('Error fetching categories:', error));
          } else {
            throw new Error('Failed to delete the category');
          }
        })
        .catch(error => console.error('Error deleting category:', error));
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Select a Category</h2>
      <ul className="divide-y divide-gray-200">
        {categories.map((category) => (
          <li key={category.id} className="py-3 flex justify-between items-center">
            <div
              onClick={() => handleSelectCategory(category)}
              className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
              style={{ fontSize: '1.1em' }}
            >
              <div>{category.name}</div>
            </div>

            <div>
              <button
                onClick={() => handleEditCategory(category)}
                className="text-blue-600 mr-2 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        <li>
          <button onClick={handleAddCategory} className="py-3 cursor-pointer text-blue-600">
            Add New Category
          </button>
        </li>
      </ul>

      {/* {showAddPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ zIndex: 999 }}>
          <div className="absolute bg-black bg-opacity-50 w-full h-full" onClick={handleCloseAddPopup} style={{ zIndex: 1 }} />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md" style={{ zIndex: 1000 }}>
            <p className="text-lg font-bold mb-2">Add category</p>
            
          </div>
        </div>
      )} */}

      {/* {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ zIndex: 999 }}>
          <div className="absolute bg-black bg-opacity-50 w-full h-full" onClick={handleCloseEditPopup} style={{ zIndex: 1 }} />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md w-96" style={{ zIndex: 1000 }}>
            <p className="text-lg font-bold mb-2">Edit category</p>

         

       
          </div>
        </div>

      )} */}



      <Modal show={showEditPopup} >
        {/* onClose={closeEditModal} */}
        <Modal.Body>
          <div className="mb-2">
            <label htmlFor="newCategoryName" className="s text-sm font-medium text-gray-600">Category Name:</label>
            <input
              type="text"
              id="newCategoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter new category name"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-2 mt-3">
            <label htmlFor="newCategoryNameEN" className=" text-sm font-medium text-gray-600">Category Name (English):</label>
            <input
              type="text"
              id="newCategoryNameEN"
              value={newCategoryNameEN}
              onChange={(e) => setNewCategoryNameEN(e.target.value)}
              placeholder="Enter new category name (English)"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-2 mt-3">
            <label htmlFor="newCategoryNameCN" className=" text-sm font-medium text-gray-600">Category Name (จีน):</label>
            <input
              type="text"
              id="newCategoryNameCN"
              value={newCategoryNameCN}
              onChange={(e) => setNewCategoryNameCN(e.target.value)}
              placeholder="Enter new category name (English)"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <div className="mb-2 mt-3">
            <label htmlFor="newCategoryNameJPN" className=" text-sm font-medium text-gray-600">Category Name (ญี่ปุ่น):</label>
            <input
              type="text"
              id="newCategoryNameJPN"
              value={newCategoryNameJPN}
              onChange={(e) => setNewCategoryNameJPN(e.target.value)}
              placeholder="Enter new category name (English)"
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}
          <Button color="success" disabled={newCategoryName.length <= 0}
            onClick={handleUpdateCategory}
          >
            Update
          </Button>



          <Button  onClick={handleCloseEditPopup}>Cancel</Button>
          {/* onClick={closeEditModal} */}
        </Modal.Footer>
      </Modal>

      <Modal show={showAddPopup} >
        {/* onClose={closeEditModal} */}
        <Modal.Body>
        <div>
              <label>Thai Name</label>
              <textarea
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter new category name"
                rows="5"
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </div>

            <div className='mt-4'>
              <label>English Name</label>
              <textarea
                value={newCategoryNameEN}
                onChange={(e) => setNewCategoryNameEN(e.target.value)}
                placeholder="Enter new category name English"
                rows="5"
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </div>

            <div className='mt-4'>
              <label>จีน Name</label>
              <textarea
                value={newCategoryNameCN}
                onChange={(e) => setNewCategoryNameCN(e.target.value)}
                placeholder="Enter new category name China"
                rows="5"
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </div>

            <div className='mt-4'>
              <label>ญี่ปุ่น Name</label>
              <textarea
                value={newCategoryNameJPN}
                onChange={(e) => setNewCategoryNameJPN(e.target.value)}
                placeholder="Enter new category name Japan"
                rows="5"
                className="w-full border border-gray-300 rounded p-2 mb-2"
              />
            </div>


        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}
       
          <button
              onClick={handleSaveNewCategory}
              className={` px-4 ml-3 py-2 rounded ${newCategoryName.length <= 0 || newCategoryNameEN.length <= 0 || newCategoryNameCN.length <= 0 || newCategoryNameJPN.length <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              disabled={newCategoryName.length <= 0 || newCategoryNameEN.length <= 0 || newCategoryNameCN.length <= 0 || newCategoryNameJPN.length <= 0}
            >
              Save
            </button>



          <Button onClick={handleCloseEditPopup} >Cancel</Button>
          {/* onClick={closeEditModal} */}
        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default CategoryBackend;
