import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';

function AboutBackend() {
  const [data, setData] = useState([]);
  const [editedPicture, setEditedPicture] = useState('');
  const [editedId, setEditedId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditModal2, setShowEditModal2] = useState(false);

  const [editedContent, setEditedContent] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedNameEN, setEditedNameEN] = useState('');
  const [editedNameCN, setEditedNameCN] = useState('');
  const [editedNameJPN, setEditedNameJPN] = useState('');


  const [editedContentEN, setEditedContentEN] = useState('');
  const [editedContentCN, setEditedContentCN] = useState('');
  const [editedContentJPN, setEditedContentJPN] = useState('');

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const maindata = data.filter((item) => item.type === 'main');
  const awarddata = data.filter((item) => item.type === 'award');
  const Accreditationsdata = data.filter((item) => item.type === 'Accreditations');



  const [oldpicname, setoldpicname] = useState('');


  // Define a function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/About.php');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddMain = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/About.php', {
      method: 'POSTADDMAIN',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        fetchData();
      })
      .catch(error => console.error('Error adding new award:', error));
  };



  const handleAddAward = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/About.php', {
      method: 'POSTADDAWARD',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        fetchData();
      })
      .catch(error => console.error('Error adding new award:', error));
  };

  const handleAddAccreditations = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/About.php', {
      method: 'POSTADDAccreditations',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        fetchData();
      })
      .catch(error => console.error('Error adding new Accreditations:', error));
  };


  const handleDeletePictureAndData = async (item) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete?');

    if (confirmDeletion) {
      try {
        const deleteDataResponse = await fetch(`https://sungroup.co.th/sungroup/Php-Api/About.php/${item.id}`, {
          method: 'DELETEABOUT',
        });

        if (deleteDataResponse.ok) {
          const deletePictureResponse = await fetch('https://sungroup.co.th/sungroup/Php-Api/uploadpicture.php/', {
            method: 'DELETE',
            body: JSON.stringify({ file_name: item.picture }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (deletePictureResponse.ok) {
            // Deletion success
            fetchData(); // Fetch updated data after successful deletion
          } else {
            console.error('Error deleting picture');
          }
        } else {
          console.error('Error deleting data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // User cancelled the deletion
      console.log('Deletion cancelled by the user.');
    }
  };


  const handleUpload = async () => {
    if (file) {
      // Delete the old file
      try {
        const deletePictureResponse = await fetch('https://sungroup.co.th/sungroup/Php-Api/uploadpicture.php/', {
          method: 'DELETE',
          body: JSON.stringify({ file_name: oldpicname }),
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
      formData.append('file', file, editedPicture); // Append the unique filename
      fetch('https://sungroup.co.th/sungroup/Php-Api/uploadpicture.php/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            handleupdatepicture();

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
      setEditedPicture(uniqueFileName)

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  function generateUniqueFileName(originalFileName) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileExtension = originalFileName.split('.').pop(); // Get the file extension
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
    return uniqueFileName;
  }

  const handleupdatepicture = () => {
    if (editedId) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/About.php`, {
        method: 'PUTNEWPICTURE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editedId, picture: editedPicture })
      })
        .then(response => response.json())
        .then(data => {
          fetchData();
          setEditedId('');
          setEditedPicture('');
          setShowEditModal(false)
          setShowEditModal2(false)
          setFile(null)
          setPreview(null)
          setoldpicname('')

        })
        .catch(error => console.error('Error updating category:', error));
    }
  };

  const openEditModal = (item) => {
    setEditedPicture(item.picture);
    setEditedId(item.id);
    setShowEditModal(true);
    setShowEditModal2(false)
    setFile(null)
    setPreview(null)
    setoldpicname(item.picture)

    setEditedContent(item.content)
    setEditedName(item.name)
  };

  const openEditModal2 = (item) => {
    setEditedPicture(item.picture);
    setEditedId(item.id);
    setShowEditModal(false);
    setShowEditModal2(true)
    setFile(null)
    setPreview(null)
    setoldpicname(item.picture)
    setEditedContent(item.content)
    setEditedName(item.name)

    setEditedNameEN(item.name_en)
    setEditedNameCN(item.name_cn)
    setEditedNameJPN(item.name_jpn)
    setEditedContentEN(item.content_en)
    setEditedContentCN(item.content_cn)
    setEditedContentJPN(item.content_jpn)



  };
  // Function to close the edit modal
  const closeEditModal = () => {
    setEditedPicture('');
    setEditedId('');
    setShowEditModal(false);
    setShowEditModal2(false)
    setFile(null)
    setoldpicname('')
    setPreview(null)
    setEditedContent('')
    setEditedName('')


    setEditedNameEN('')
    setEditedNameCN('')
    setEditedNameJPN('')
    setEditedContentEN('')
    setEditedContentCN('')
    setEditedContentJPN('')

  };



  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);



  const handleSaveEdit = async () => {


    try {
      // Make an API call to update the content
      const response = await fetch(`https://sungroup.co.th/sungroup/Php-Api/About.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editedId,
          content: editedContent,
          name: editedName,
          name_en: editedNameEN,
          name_cn: editedNameCN,
          name_jpn: editedNameJPN,
          content_en: editedContentEN,
          content_cn: editedContentCN,
          content_jpn: editedContentJPN,
        }),
      });

      if (response.ok) {
        // Reload the data to reflect the changes
        fetchData();
        setEditedPicture('');
        setEditedId('');
        setShowEditModal(false);
        setShowEditModal2(false)
        setFile(null)
        setoldpicname('')
        setPreview(null)
        setEditedContent('')
        setEditedName('')
        setEditedNameEN('')
        setEditedNameCN('')
        setEditedNameJPN('')
        setEditedContentEN('')
        setEditedContentCN('')
        setEditedContentJPN('')

      } else {
        console.error('Error saving edit:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };





  return (
    <div className="text-2xl  container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About Backend</h1>

      {/* Render the data here */}<div className='border-4 p-2 border-red-600'>
        <div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {maindata.map((item) => (
              <div key={item.id} className="mb-4">
                <img
                  src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${item.picture}`}
                  alt={item.id}
                  className="max-w-full"
                />
                <textarea
                  value={item.name}
                  disabled
                  rows={1} // Adjust the number of rows as needed
                  className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
                <textarea
                  value={item.content}
                  disabled
                  rows={4} // Adjust the number of rows as needed
                  className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />


                <button
                  className="bg-secondary text-white px-4 py-2 mt-2 rounded-full"
                  onClick={() => openEditModal2(item)}
                >
                  Edit Content
                </button>



                <button
                  className="bg-warning text-white px-4 py-2 mt-2 rounded-full"
                  onClick={() => openEditModal(item)}
                >
                  Edit Picture
                </button>

                <button
                  className="bg-danger text-white px-4 py-2 mt-2 rounded-full"

                  onClick={() => handleDeletePictureAndData(item)}>

                  Delete ข้อมูลหลัก
                </button>
              </div>
            ))}

          </div>
          <button
            onClick={handleAddMain}
            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full"
          >
            Add ข้อมูลหลัก
          </button>

        </div>

      </div>
      {/* Add Award Section */}
      <div className="mt-8 border-4 p-2 border-blue-600 ">
        <h2 className="text-2xl font-semibold mb-4">Add Award</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {awarddata.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${item.picture}`}
                alt={item.id} className="max-w-full mb-4" />

              <textarea
                value={item.name}
                disabled
                rows={1} // Adjust the number of rows as needed
                className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
              <textarea
                value={item.content}
                disabled
                rows={4} // Adjust the number of rows as needed
                className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />


              <button
                className="bg-secondary text-white px-4 py-2 mt-2 rounded-full"
                onClick={() => openEditModal2(item)}
              >
                Edit Content
              </button>



              <button
                className="bg-warning text-white px-4 py-2 mt-2 rounded-full"
                onClick={() => openEditModal(item)}
              >
                Edit Picture
              </button>

              <button
                className="bg-danger text-white px-4 py-2 mt-2 rounded-full"

                onClick={() => handleDeletePictureAndData(item)}>

                Delete ข้อมูลหลัก
              </button>
            </div>
          ))}
        </div>

        <Button onClick={handleAddAward} className="mt-4">
          Add Award
        </Button>
      </div>

      {/* Add Accreditations Section */}
      <div className="mt-8 border-4 p-2 border-green-600">
        <h2 className="text-2xl font-semibold mb-4">Add Accreditations</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Accreditationsdata.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${item.picture}`}
                alt={item.id} className="max-w-full mb-4" />

              <textarea
                value={item.name}
                disabled
                rows={1} // Adjust the number of rows as needed
                className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
              <textarea
                value={item.content}
                disabled
                rows={4} // Adjust the number of rows as needed
                className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />


              <button
                className="bg-secondary text-white px-4 py-2 mt-2 rounded-full"
                onClick={() => openEditModal2(item)}
              >
                Edit Content
              </button>



              <button
                className="bg-warning text-white px-4 py-2 mt-2 rounded-full"
                onClick={() => openEditModal(item)}
              >
                Edit Picture
              </button>

              <button
                className="bg-danger text-white px-4 py-2 mt-2 rounded-full"

                onClick={() => handleDeletePictureAndData(item)}>

                Delete ข้อมูลหลัก
              </button>
            </div>
          ))}
        </div>

        <Button onClick={handleAddAccreditations} className="mt-4">
          Add Accreditations
        </Button>
      </div>

      {/* Edit Picture Modal */}
      <Modal show={showEditModal} onClose={closeEditModal}>
        <Modal.Body>
          {/* Display the current edited picture */}
          <img src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${editedPicture}`}
            alt={`Edited ${editedId}`} className="max-w-full mb-4" />
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
          {/* Add input fields or any other UI elements for editing the picture */}
          {/* ... (your editing UI) */}
        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}
          <Button color="success" onClick={handleUpload}>
            Save Edits
          </Button>

          <Button onClick={closeEditModal}>Cancel</Button>

        </Modal.Footer>
      </Modal>



      <Modal show={showEditModal2} onClose={closeEditModal}>
        <Modal.Body>

          <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาไทย</h1>
          <textarea
            value={editedName}

            rows={1} // Adjust the number of rows as needed
            onChange={(e) => {
              setEditedName(e.target.value)
            }}
            className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <textarea
            value={editedContent}
            rows={4} // Adjust the number of rows as needed

            onChange={(e) => {
              setEditedContent(e.target.value)
            }}
            className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาอังกฤษ</h1>
          <textarea
            value={editedNameEN}

            rows={1} // Adjust the number of rows as needed
            onChange={(e) => {
              setEditedNameEN(e.target.value)
            }}
            className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <textarea
            value={editedContentEN}
            rows={4} // Adjust the number of rows as needed

            onChange={(e) => {
              setEditedContentEN(e.target.value)
            }}
            className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาจีน</h1>
          <textarea
            value={editedNameCN}

            rows={1} // Adjust the number of rows as needed
            onChange={(e) => {
              setEditedNameCN(e.target.value)
            }}
            className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <textarea
            value={editedContentCN}
            rows={4} // Adjust the number of rows as needed

            onChange={(e) => {
              setEditedContentCN(e.target.value)
            }}
            className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />

          <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาญี่ปุ่น</h1>
          <textarea
            value={editedNameJPN}

            rows={1} // Adjust the number of rows as needed
            onChange={(e) => {
              setEditedNameJPN(e.target.value)
            }}
            className=" w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <textarea
            value={editedContentJPN}
            rows={4} // Adjust the number of rows as needed

            onChange={(e) => {
              setEditedContentJPN(e.target.value)
            }}
            className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}
          <Button color="success" onClick={handleSaveEdit}>
            Save Edits
          </Button>

          <Button onClick={closeEditModal}>Cancel</Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AboutBackend;
