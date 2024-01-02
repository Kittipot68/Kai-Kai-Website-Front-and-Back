import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';

function Home_backend() {
  const [data, setData] = useState([]);
  const introductionData = data.filter((item) => item.type === 'introduction');
  const pictureData = data.filter((item) => item.type === 'picture');
  const aboutusData = data.filter((item) => item.type === 'aboutus');
  const visionmissionData = data.filter((item) => item.type === 'vissionmission');

  const [editMode, setEditMode] = useState(null); // Track which item is in edit mode
  const [editMode2, setEditMode2] = useState(null); // Track which item is in edit mode
  const [editdes, seteditdes] = useState(null); // Track which item is in edit mode

  const [editid, seteditid] = useState(null); // Track which item is in edit mode

  const [editedText, setEditedText] = useState(''); // Store the edited text
  const [editedContent, setEditedContent] = useState('');
  const [editedContentEN, setEditedContentEN] = useState('');
  const [editedContentCN, setEditedContentCN] = useState('');
  const [editedContentJPN, setEditedContentJPN] = useState('');


  const [editedPicture, setEditedPicture] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDescriptionEN, setEditedDescriptionEN] = useState('');
  const [editedDescriptionCN, setEditedDescriptionCN] = useState('');
  const [editedDescriptionJPN, setEditedDescriptionJPN] = useState('');


  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state



  const [oldpicname, setoldpicname] = useState('');


  // console.log("editMode", editMode)
  // console.log("editedText", editedText)
  // console.log("editedContent:", editedContent);
  // console.log("editedPicture:", editedPicture);
  // console.log("editedDescription:", editedDescription);

  // console.log("preview:", preview);
  // console.log("file:", file);
  // console.log("data", data);
  // console.log("data", data);

  // console.log("oldpicname", oldpicname)


  const fetchData = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/Php-Api/Home.php');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  function generateUniqueFileName(originalFileName) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileExtension = originalFileName.split('.').pop(); // Get the file extension
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
    return uniqueFileName;
  }


  const handleEdit = (item) => {
    setEditMode(item.id);
    setEditedPicture(item.picture)
    setEditedContent(item.content)
    setEditedDescription(item.description)
    setPreview(null)
    setFile(null)
    setEditMode2(null);
    seteditid(item.id);
    setoldpicname(item.picture)
    setEditedContentEN(item.content_en)
    setEditedDescriptionEN(item.description_en)

  };

  const handleEdit2 = (item) => {
    setEditMode2(item.id);
    setEditMode(null);
    setEditedPicture(item.picture)
    setEditedContent(item.content)
    setEditedDescription(item.description)
    setPreview(null)
    setFile(file)
    seteditid(item.id);
    setEditedContentEN(item.content_en)
    setEditedDescriptionEN(item.description_en)
    setEditedContentCN(item.content_cn)
    setEditedContentJPN(item.content_jpn)
    setEditedDescriptionCN(item.description_cn)
    setEditedDescriptionJPN(item.description_jpn)
  };

  // console.log(editdes, "editdes")
  const handleCancelEdit = () => {
    seteditdes(null)
    setEditMode(null);
    setEditMode2(null);
    setEditedDescription('');
    setEditedText('');
    setEditedPicture('')
    setEditedContent('')
    setPreview(null)
    setFile(null)
    seteditid(null);
    setoldpicname('')
    setEditedContentEN('')
    setEditedDescriptionEN('')
    setEditedContentCN('')
    setEditedContentJPN('')
    setEditedDescriptionCN('')
    setEditedDescriptionJPN('')
  };

  const handleSaveEdit = async () => {


    try {
      // Make an API call to update the content
      const response = await fetch(`https://sungroup.co.th/Php-Api/Home.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editid,
          content: editedContent,
          picture: editedPicture,
          description: editedDescription,
          content_en: editedContentEN,
          description_en: editedDescriptionEN,
          content_cn: editedContentCN,
          content_jpn: editedContentJPN,
          description_cn: editedDescriptionCN,
          description_jpn: editedDescriptionJPN
        }),
      });

      if (response.ok) {
        // Reload the data to reflect the changes
        fetchData();
        setEditedContent('')
        setEditedPicture('')
        setEditMode(null);
        setEditMode2(null);
        setEditedDescription('')
        setEditedText('');
        setPreview(null)
        setFile(null)
        seteditid(null);
        setoldpicname('')
        setEditedContentEN('')
        setEditedDescriptionEN('')
        setEditedContentCN('')
        setEditedContentJPN('')
        setEditedDescriptionCN('')
        setEditedDescriptionJPN('')
        seteditdes(null)



      } else {
        console.error('Error saving edit:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  // const handleadd = async () => {
  //   fetch('https://sungroup.co.th/Php-Api/Home.php', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       fetchData();
  //     })
  //     .catch(error => console.error('insert picture failed', error));

  // };

  const handleadd = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/Php-Api/Home.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // // You might need to provide some data in the body here
        // body: JSON.stringify({ /* your data here */ }),
      });

      if (response.ok) {
        const data = await response.json();
        fetchData(); // Assuming you want to refetch data after adding
      } else {
        const errorData = await response.text();
        console.error('Error adding new Accreditations:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error adding new Accreditations:', error);
    }
  };




  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const uniqueFileName = generateUniqueFileName(selectedFile.name); // Generate a unique filename
    if (selectedFile) {
      setLoading(true); // Set loading to true while the image is loading

      setEditedPicture(uniqueFileName)

      const reader = new FileReader();
      reader.onload = () => {
        setLoading(false); // Set loading to false when the image has loaded

        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setLoading(false); // Ensure loading is set to false when no file is selected

      setPreview(null);
    }
  };




  useEffect(() => {
    fetchData()

  }, []);




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
      formData.append('file', file, editedPicture); // Append the unique filename
      fetch('https://sungroup.co.th/Php-Api/uploadpicture.php/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
            handleSaveEdit();

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


  const handleDeletePictureAndData = async (item) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete?');

    if (confirmDeletion) {
      try {
        const deleteDataResponse = await fetch(`https://sungroup.co.th/Php-Api/Home.php/${item.id}`, {
          method: 'DELETE',
        });

        if (deleteDataResponse.ok) {
          const deletePictureResponse = await fetch('https://sungroup.co.th/Php-Api/uploadpicture.php/', {
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







  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-4">Home_backend</h1>
      <div className="mb-8 border-b border-gray-300 py-4">
        <h2 className="text-2xl font-semibold mb-4">Pictures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pictureData.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">รุปปัจจุบัน</h3>
              <div className="flex justify-center items-center">

                <img
                  loading='lazy'
                  src={item.picture ? `https://sungroup.co.th/Php-Api/getpicture.php?name=${item.picture}` : 'https://placehold.co/1900x800'}
                  className="mb-4 rounded-md"
                  style={{ width: '200px', height: '100px' }}
                  alt="Item Image"
                />

              </div>

              {editMode === item.id ? (
                <div>
                  <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                  <label htmlFor="fileInput" className="block bg-gray-500 text-white rounded-lg cursor-pointer p-2 hover:bg-gray-600">
                    เลือกไฟล์ใหม่
                  </label>
                  {loading ? (
                    <p className='p-2'>Loading...</p> // Display a loading message while the image is loading
                  ) : (
                    <div>
                      {preview && (

                        <div>
                          <h3 className="text-xl mt-4 font-semibold mb-2">รูปที่ต้องการเปลี่ยน</h3>

                          <img loading='lazy'

                            src={preview}
                            alt="Preview"
                            className="mt-4 mx-auto rounded-md"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />

                        </div>

                      )}
                    </div>
                  )}

                  <button

                    onClick={(e) => handleUpload(oldpicname)}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : editMode2 === item.id ? (
                <div>
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => {
                      setEditedContent(e.target.value)
                    }}
                    className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />

                  <button

                    onClick={handleSaveEdit}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div class='grid grid-cols-1 gap-3'>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                  >
                    แก้ไขรูป
                  </button>

                  <button
                    onClick={() => handleDeletePictureAndData(item)}
                    disabled={pictureData.length === 2} // Disable the button based on the condition

                    className={`bg-red-500 text-white px-4 py-2 rounded-md ${pictureData.length === 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                  >
                    ลบ
                  </button>
                </div>

              )}
            </div>
          ))}
          <button onClick={handleadd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            เพิ่ม
          </button>
        </div>
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {/*  ส่วน mission vission
      <div className="mb-8 border-b border-gray-300 py-4 flex flex-wrap">
        <h2 className="text-2xl font-semibold w-full mb-4">Vision Mission</h2>
        {visionmissionData.map((item) => (
          <div key={item.id} className="mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/10 p-1 mr-3">
            <div className=" flex-col justify-center text-center">

              <input
                type="text"
                value={item.picture}
                readOnly
                disabled
                className={`${editid == item.id ? "hidden" : "border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"}`}
              />


              <h1 className={`${editid == item.id ? "hidden" : "w-ful  border-gray-300 p-2"}`}>ข้อมูล ไทย</h1>

              <textarea
                value={item.content}
                readOnly
                disabled
                rows={4} // Adjust the number of rows as needed
                className={`${editid == item.id ? "hidden" : "w-full rounded-md border border-gray-300 p-2"}`}
              />

              <h1 className={`${editid == item.id ? "hidden" : "w-ful  border-gray-300 p-2"}`}>ข้อมูล อังกฤษ</h1>
              <textarea
                value={item.content_en}
                readOnly
                disabled
                rows={4} // Adjust the number of rows as needed
                className={`${editid == item.id ? "hidden" : "w-full rounded-md border border-gray-300 p-2"}`}
              />

              {editMode === item.id ? (
                <div>
                  <input
                    value={editedPicture}
                    rows={4} // Adjust the number of rows as neededd

                    onChange={(e) => {
                      setEditedPicture(e.target.value)
                    }}
                    className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />

                  <button

                    onClick={handleSaveEdit}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : editMode2 === item.id ? (
                <div>
                  <h1 className='p-2'>ข้อมูลไทย</h1>

                  <textarea
                    value={editedContent}
                    rows={4} // Adjust the number of rows as needed

                    onChange={(e) => {
                      setEditedContent(e.target.value)
                    }}
                    className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />

                  <h1 className='p-2'>ข้อมูลอังกฤษ</h1>

                  <textarea
                    value={editedContentEN}
                    rows={4} // Adjust the number of rows as needed

                    onChange={(e) => {
                      setEditedContentEN(e.target.value)
                    }}
                    className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />

                  <button

                    onClick={handleSaveEdit}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>

                  <button onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">
                    แก้ไขหัวข้อ
                  </button>
                  <button onClick={() => handleEdit2(item)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
                    แก้ไขข้อความ
                  </button>

                </div>
              )}
            </div>
          </div>
        ))}
      </div> */}


      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <div className="mb-8 border-b border-gray-300 py-4 flex flex-wrap">
        <h2 className="text-2xl font-semibold w-full mb-4">Introduction</h2>

        {introductionData.map((item) => (
          <div key={item.id} className="mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/10 p-1 mr-3">
            <div className=" flex-col justify-center text-center">
              <img
                loading='lazy'

                src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${item.picture}`}
                className="mb-4 rounded-md"
                style={{ width: '100%', height: '150px' }}
                alt={item.id}
              />

              <input
                value={item.content}
                readOnly
                disabled
                className={`${editid == item.id ? "hidden" : "cursor-not-allowed w-full rounded-md border border-gray-300 p-2"}`}
              ></input>
              <textarea
                value={item.description}
                readOnly
                disabled
                rows={4} // Adjust the number of rows as needed
                className={`${editid == item.id ? "hidden" : "cursor-not-allowed mt-2 w-full rounded-md border border-gray-300 p-2"}`}
              />


              {/* <h1 className={`${editid == item.id ? "hidden" : " w-full  border-gray-300 p-2"}`}>ข้อมูลภาษาอังกฤษ</h1>

              <input
                value={item.content_en}
                readOnly
                disabled
                className={`${editid == item.id ? "hidden" : "cursor-not-allowed w-full rounded-md border border-gray-300 p-2"}`}
              ></input>
              <textarea
                value={item.description_en}
                readOnly
                disabled
                rows={4} // Adjust the number of rows as needed
                className={`${editid == item.id ? "hidden" : "cursor-not-allowed mt-2 w-full rounded-md border border-gray-300 p-2"}`}
              /> */}







              {editMode === item.id ? (
                <div>
                  <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                  <label htmlFor="fileInput" className="block bg-gray-500 text-white rounded-lg cursor-pointer p-2 hover:bg-gray-600">
                    เลือกไฟล์ใหม่
                  </label>
                  {loading ? (
                    <p className='p-2'>Loading...</p> // Display a loading message while the image is loading
                  ) : (
                    <div>
                      {preview && (

                        <div>
                          <h3 className="text-xl mt-4 font-semibold mb-2">รูปที่ต้องการเปลี่ยน</h3>

                          <img


                            loading='lazy'

                            src={preview}
                            alt="Preview"
                            className="mt-4 mx-auto rounded-md"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />

                        </div>

                      )}
                    </div>
                  )}

                  <button

                    onClick={(e) => handleUpload(oldpicname)}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>

                  <button
                    onClick={() => {
                      handleEdit(item);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2"
                  >
                    แก้ไขรูป
                  </button>
                  <button
                    onClick={() => {
                      handleEdit2(item);
                      seteditdes(true);
                    }}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
                    แก้ไขข้อความ
                  </button>




                </div>
              )}
            </div>
          </div>
        ))}
      </div>


      {/* ////////////////////////////////////////////////////////////////////////////////////////////// */}

      <div className="py-4">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        {aboutusData.map((item) => (
          <div key={item.id} className="mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/10 p-1 mr-3">
            <div className=" flex-col justify-center text-center">
              <img
                loading='lazy'
                src={`https://sungroup.co.th/Php-Api/getpicture.php?name=${item.picture}`}
                className="mb-4 rounded-md"
                style={{ width: '100%', height: '150px' }}
                alt={item.id}
              />
              <textarea
                value={item.content}
                readOnly
                disabled
                rows={4} // Adjust the number of rows as needed
                className={`${editid == item.id ? "hidden" : "w-full rounded-md border border-gray-300 p-2"}`}
              />

              <h1 className={`${editid == item.id ? "hidden" : "w-full  p-2"}`}>ข้อมูลภาษาอังกฤษ</h1>
              <textarea
                value={item.content_en}
                readOnly
                disabled
                rows={4} // Adjust the number of rows as needed
                className={`${editid == item.id ? "hidden" : "w-full rounded-md border border-gray-300 p-2"}`}
              />

              {editMode === item.id ? (
                <div>
                  <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                  <label htmlFor="fileInput" className="block bg-gray-500 text-white rounded-lg cursor-pointer p-2 hover:bg-gray-600">
                    เลือกไฟล์ใหม่
                  </label>
                  {loading ? (
                    <p className='p-2'>Loading...</p> // Display a loading message while the image is loading
                  ) : (
                    <div>
                      {preview && (

                        <div>
                          <h3 className="text-xl mt-4 font-semibold mb-2">รูปที่ต้องการเปลี่ยน</h3>

                          <img
                            loading='lazy'
                            src={preview}
                            alt="Preview"
                            className="mt-4 mx-auto rounded-md"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />

                        </div>

                      )}
                    </div>
                  )}

                  <button

                    onClick={handleUpload}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : editMode2 === item.id ? (
                <div>
                  <textarea
                    value={editedContent}
                    rows={4} // Adjust the number of rows as needed

                    onChange={(e) => {
                      setEditedContent(e.target.value)
                    }}
                    className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />


                  <h1>ข้อมูลภาษาอังกฤษ</h1>
                  <textarea
                    value={editedContentEN}
                    rows={4} // Adjust the number of rows as needed

                    onChange={(e) => {
                      setEditedContentEN(e.target.value)
                    }}
                    className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />

                  <button

                    onClick={handleSaveEdit}
                    className={`mt-3 mb-2 mr-3 px-4 py-2  ${loading ? "cursor-not-allowed bg-gray-100" : " cursor-pointer bg-green-500  text-white  hover:bg-green-500 hover:text-gray-200"} rounded-md `}
                  >
                    Save
                  </button>

                  <button
                    onClick={handleCancelEdit}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>

                  <button onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2">
                    แก้ไขรูป
                  </button>
                  <button onClick={() => handleEdit2(item)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2">
                    แก้ไขข้อความ
                  </button>

                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal show={editMode2} onClose={handleCancelEdit}>

        <Modal.Body>

          <div>
            <h1 className='text-red-600 text2xl font-bold p-2'>ข้อมูลภาษาไทย</h1>

            <textarea
              value={editedContent}
              onChange={(e) => { setEditedContent(e.target.value) }}
              className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {editdes == true && (

              <textarea
                value={editedDescription}
                rows={4} // Adjust the number of rows as needed
                onChange={(e) => {
                  setEditedDescription(e.target.value)
                }}
                className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            )}

            <h1 className='text-red-600 text2xl font-bold p-2'>ข้อมูลภาษาอังกฤษ</h1>

            <textarea
              value={editedContentEN}
              onChange={(e) => { setEditedContentEN(e.target.value) }}
              className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {editdes == true && (

              <textarea
                value={editedDescriptionEN}
                rows={4} // Adjust the number of rows as needed
                onChange={(e) => {
                  setEditedDescriptionEN(e.target.value)
                }}
                className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            )}
            <h1 className='text-red-600 text2xl font-bold p-2'>ข้อมูลภาษาจีน</h1>

            <textarea
              value={editedContentCN}
              onChange={(e) => { setEditedContentCN(e.target.value) }}
              className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {editdes == true && (

              <textarea
                value={editedDescriptionCN}
                rows={4} // Adjust the number of rows as needed
                onChange={(e) => {
                  setEditedDescriptionCN(e.target.value)
                }}
                className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            )}
            <h1 className='text-red-600 text2xl font-bold p-2'>ข้อมูลภาษาญี่ปุ่น</h1>

            <textarea
              value={editedContentJPN}
              onChange={(e) => { setEditedContentJPN(e.target.value) }}
              className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />

            {editdes == true && (

              <textarea
                value={editedDescriptionJPN}
                rows={4} // Adjust the number of rows as needed
                onChange={(e) => {
                  setEditedDescriptionJPN(e.target.value)
                }}
                className="mb-3 w-full mt-2  p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            )}
          </div>



        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}
          <Button color="success" onClick={handleSaveEdit}>
            Save Edits
          </Button>

          <Button onClick={handleCancelEdit}>Cancel</Button>

        </Modal.Footer>
      </Modal>


    </div>
  );

}

export default Home_backend;
