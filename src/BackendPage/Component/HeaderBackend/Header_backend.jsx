import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';

function Header() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: '',
    name_en: '',
    name_cn: '',
    name_jpn: '',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Header.php');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const openModal = (item) => {
    console.log(item,"item")
    setSelectedItem(item.id);
    setEditedValues({
      name: item.name,
      name_en: item.name_en,
      name_cn: item.name_cn,
      name_jpn: item.name_jpn,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: value,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://sungroup.co.th/sungroup/Php-Api/Header.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedItem, // Assuming the item has an 'id' property
          name: editedValues.name,
          name_en: editedValues.name_en,
          name_cn: editedValues.name_cn,
          name_jpn: editedValues.name_jpn,
        }),
      });

      if (response.ok) {
        // Handle successful save (e.g., update local state, close modal)
        fetchData();

        console.log('Data updated successfully');
        closeModal();
      } else {
        // Handle error cases
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  console.log(editedValues.name,"editedValues")
  console.log(selectedItem,"selectedItem")

  

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Display the data */}
        {data.map((item) => (
          <div key={item.id} className="bg-gray-200 p-4 rounded-md">
            <div>{item.name}</div>
            <Button onClick={() => openModal(item)}>Edit</Button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Body>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Edit Modal</h2>
            {/* Display data in modal for editing */}
            {selectedItem && (
              <div>
                <label>Name:</label>
                <textarea
                  name="name"
                  value={editedValues.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4"
                />

                <label>Name (English):</label>
                <textarea
                  name="name_en"
                  value={editedValues.name_en}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4"
                />

                <label>Name (Chinese):</label>
                <textarea
                  name="name_cn"
                  value={editedValues.name_cn}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4"
                />

                <label>Name (Japanese):</label>
                <textarea
                  name="name_jpn"
                  value={editedValues.name_jpn}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-4"
                />

                {/* Add your edit form or content here */}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}
          <Button color="success" onClick={handleSaveEdit}>
            Save Edits
          </Button>
          <Button onClick={closeModal} className="">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Header;
