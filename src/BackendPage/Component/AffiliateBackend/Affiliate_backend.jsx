import React, { useRef, useState, useEffect } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { fetchData, handlePost, handlePut, handleDelete } from '../../../Api/Affiliate_api';
import { Spinner, Button, Modal } from 'flowbite-react';



function AffiliateBackend() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedPicture, setEditedPicture] = useState('');
  const [editednamebu, setEditedNamebu] = useState('');

  const [editedContentEN, setEditedContentEN] = useState('');
  const [editedContentCN, setEditedContentCN] = useState('');

  const [editedContentJPN, setEditedContentJPN] = useState('');

  const [editednamebuEN, setEditedNamebuEN] = useState('');

  const [editednamebuCN, setEditedNamebuCN] = useState('');
  const [editednamebuJPN, setEditedNamebuJPN] = useState('');


  const [delayedSave, setDelayedSave] = useState(false);
  const [tempcontent, setTempcontent] = useState('');
  const [tempcontentEN, setTempcontentEN] = useState('');
  const [tempcontentCN, setTempcontentCN] = useState('');
  const [tempcontentJPN, setTempcontentJPN] = useState('');



  const [openeditedPicture, setOpenEditedPicture] = useState(false);
  const [openeditedContent, setOpenEditedContent] = useState(false);
  const [openeditedNamebu, setOpenEditedNamebu] = useState(false);



  const [oldpicname, setoldpicname] = useState('');



  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Affiliate.php');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData()

  }, []);

  useEffect(() => {
    if (editedContent === tempcontent) {
      setDelayedSave(true);
    } else {
      setTimeout(function () {
        setDelayedSave(false);
      }, 2500);
    }
    if (editedContentEN === tempcontentEN) {
      setDelayedSave(true);
    } else {
      setTimeout(function () {
        setDelayedSave(false);
      }, 2500);
    }
    if (editedContentCN === tempcontentCN) {
      setDelayedSave(true);
    } else {
      setTimeout(function () {
        setDelayedSave(false);
      }, 2500);
    }
    if (editedContentJPN === tempcontentJPN) {
      setDelayedSave(true);
    } else {
      setTimeout(function () {
        setDelayedSave(false);
      }, 2500);
    }
  }, [editedContent, editedContentEN,editedContentCN,editedContentJPN, tempcontentEN, tempcontent, tempcontentJPN, tempcontentCN])

  const sunEditorRef = useRef(null);

  const handleImageUpload = (file, error, response) => {
    if (error) {
      console.error(error);
    } else {
      const imageUrl = response.url;
      if (sunEditorRef.current) {
        sunEditorRef.current.insertImage(imageUrl, '', sunEditorRef.current);
      }
    }
  };

  const sunEditorOptions = {
    width: '100%',
    height: '300px',
    buttonList: [
      ['fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['removeFormat'],
      ['fontColor', 'hiliteColor'],
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list'],
      ['table'],
      ['link'],
      ['fullScreen', 'showBlocks', 'codeView'],
    ],
    defaultStyle: 'font-family: "PSL369Pro", sans-serif', // Use your desired font-family value
    placeholder: 'Start typing...',
    autoFocus: true,
    imageUpload: {
      // Customize image upload options here
    },
  };


  // console.log("editItem", editItem)
  // console.log("editedContent", editedContent)
  // console.log("editedPicture", editedPicture)
  // console.log("setIsEditing", isEditing)
  // console.log("tempcontent", tempcontent)

  // console.log("delayedSave", delayedSave)
  // console.log("openeditedContent", openeditedContent)
  // console.log("openeditedPicture", openeditedPicture)


  const handleContentChange = (content) => {
    setDelayedSave(true);
    setEditedContent(content);
    // Start a 5-second timer to allow saving after content changes
  };


  const handleContentENChange = (content) => {
    setDelayedSave(true);
    setEditedContentEN(content);
    // Start a 5-second timer to allow saving after content changes
  };

  const handleContentCNChange = (content) => {
    setDelayedSave(true);
    setEditedContentCN(content);
    // Start a 5-second timer to allow saving after content changes
  };

  const handleContentJPNChange = (content) => {
    setDelayedSave(true);
    setEditedContentJPN(content);
    // Start a 5-second timer to allow saving after content changes
  };
  const handleSave = async () => {
    try {

      const response = await fetch(`https://sungroup.co.th/sungroup/Php-Api/Affiliate.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editItem.id,
          content: editedContent,
          picture: editedPicture,
          nameth: editednamebu,
          content_en: editedContentEN,
          content_cn: editedContentCN,
          content_jpn: editedContentJPN,
          name_en: editednamebuEN,
          name_cn: editednamebuCN,
          name_jpn: editednamebuJPN

        }),
      });

      if (response.ok) {
        // Reload the data to reflect the changes
        fetchData();
        setIsEditing(false);
        setEditItem(null);
        setEditedContent('')
        setEditedPicture('')
        setEditedNamebu('')
        setTempcontent('')
        setTempcontentEN('')
        setTempcontentCN('')
        setTempcontentJPN('')

        setEditedContentEN('')
        setoldpicname('')

        setEditedNamebuCN('')
        setEditedNamebuJPN('')
        setEditedContentCN('')
        setEditedContentJPN('')
        setFile(null)
        setPreview(null)
      } else {
        console.error('Error saving edit:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditItem(null);
    setEditedContent(''); // Clear the edited content
    setEditedPicture('')
    setTempcontent('')
    setTempcontentEN('')
    setEditedNamebu('')
    setOpenEditedContent(false);
    setOpenEditedPicture(false);
    setOpenEditedNamebu(false);
    setPreview(null)
    setFile(null)

    setEditedContentEN('')
    setEditedNamebuCN('')
    setEditedNamebuJPN('')
    setTempcontentCN('')
    setTempcontentJPN('')
    setoldpicname('')

  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
      setEditedPicture(imageUrl); // Set the edited picture to the URL
    }
  };



  const renderEditPicture = () => (
    <div className="w-2/3 mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Picture</h2>
      {/* <div className="mb-4">
        <label htmlFor="fileInput" className="block text-gray-700 font-medium mb-2">
          Picture Name
        </label>
        <input
          type="text"
          value={editItem.name}
          onChange={(e) => {
            const newName = e.target.value;
          }}
          className="border rounded-md p-2 w-full"
        />
      </div> */}

      {editItem.picture && (
        <div>
          <h3 className="text-xl font-semibold mb-2">รุปปัจจุบัน</h3>
          <img
            src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${editItem.picture}`} // Replace 'your-base-url' with the actual base URL
            alt="Current Picture"
            className="mb-4 rounded-md"
            style={{ maxWidth: '200px' }}
          />
        </div>
      )}

      <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
      <label htmlFor="fileInput" className="block bg-blue-500 text-white rounded-lg cursor-pointer p-2 hover:bg-blue-600">
        Choose a File
      </label>
      {preview && (
        <div>
          <h3 className="text-xl mt-4 font-semibold mb-2">รูปที่ต้องการเปลี่ยน</h3>
          <img
            src={preview}
            alt="Preview"
            className="mt-4 mx-auto rounded-md"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </div>

      )}
      <button onClick={handleUpload} className="block bg-blue-500 text-white rounded-lg p-2 mt-4 hover-bg-blue-600">
        Upload
      </button>
    </div>
  );


  const renderEditContent = () => (
    <div>
      <div className='border mb-4'>
        <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาไทย</h1>

        <SunEditor
          setOptions={sunEditorOptions}
          // onImageUpload={handleImageUpload}
          ref={sunEditorRef}
          setContents={editedContent}
          onChange={(content) => handleContentChange(content)}
          height="auto"
          width='auto' />

      </div>


      <div className='border mb-4'>
        <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาอังกฤษ</h1>
        <SunEditor
          setOptions={sunEditorOptions}
          // onImageUpload={handleImageUpload}
          ref={sunEditorRef}
          setContents={editedContentEN}
          onChange={(content) => handleContentENChange(content)}
          height="auto"
          width='auto' />

      </div>

      <div className='border mb-4'>
        <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาจีน</h1>
        <SunEditor
          setOptions={sunEditorOptions}
          // onImageUpload={handleImageUpload}
          ref={sunEditorRef}
          setContents={editedContentCN}
          onChange={(content) => handleContentCNChange(content)}
          height="auto"
          width='auto' />
      </div>

      <div className='border mb-4'>
        <h1 className='text-red-600 text-2xl font-bold p-2'>ข้อมูลภาษาญี่ปุ่น</h1>
        <SunEditor
          setOptions={sunEditorOptions}
          // onImageUpload={handleImageUpload}
          ref={sunEditorRef}
          setContents={editedContentJPN}
          onChange={(content) => handleContentJPNChange(content)}
          height="auto"
          width='auto' />
      </div>

      <div>

        {delayedSave && <Spinner aria-label="Extra small spinner example" size="md" />}

        <button
          className={`mr-2 bg-blue-300  py-2 px-4 rounded mt-4 ${delayedSave ? 'cursor-not-allowed disabled text-black bg-gray-200' : ''
            }`}
          onClick={handleSave}
          disabled={delayedSave}
        >
          {delayedSave ? 'เพิ่มข้อมูลแล้ว รอสักครู่...' : 'Save'}
        </button>
      </div>
    </div>
  );


  const renderEditnamebu = () => (
    <div className="flex flex-col">
      <h1 className='text-red-600 text2xl font-bold p-2'>ชื่อภาษาไทย</h1>

      <input
        placeholder='โปรดกรอกชื่อบริษัทภาษาไทย'
        value={editednamebu}
        onChange={(e) => setEditedNamebu(e.target.value)}
        style={{ minWidth: '250px', width: editednamebu ? editednamebu.length + 'ch' : '150px' }}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
      />


      <h1 className='text-red-600 text2xl font-bold p-2'>ชื่อภาษาอังกฤษ</h1>
      <input
        placeholder='โปรดกรอกชื่อบริษัทภาษาอังกฤษ'
        value={editednamebuEN}
        onChange={(e) => setEditedNamebuEN(e.target.value)}
        style={{ minWidth: '250px', width: editednamebuEN ? editednamebuEN.length + 'ch' : '150px' }}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
      />

      <h1 className='text-red-600 text2xl font-bold p-2'>ชื่อภาษาจีน</h1>
      <input
        placeholder='โปรดกรอกชื่อบริษัทภาษาจีน'
        value={editednamebuCN}
        onChange={(e) => setEditedNamebuCN(e.target.value)}
        style={{ minWidth: '250px', width: editednamebuCN ? editednamebuCN.length + 'ch' : '150px' }}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
      />

      <h1 className='text-red-600 text2xl font-bold p-2'>ชื่อภาษาญี่ปุ่น</h1>
      <input
        placeholder='โปรดกรอกชื่อบริษัทภาษาญี่ปุ่น'
        value={editednamebuJPN}
        onChange={(e) => setEditedNamebuJPN(e.target.value)}
        style={{ minWidth: '250px', width: editednamebuJPN ? editednamebuJPN.length + 'ch' : '150px' }}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
      />


      <button
        className={`mr-2 bg-blue-500 text-white py-2 px-4 rounded mt-4`}
        onClick={handleSave}
      >
        save
      </button>
    </div>

  );


  const handleEditPicture = (item) => {
    setEditItem(item);
    setIsEditing(true);
    setEditedPicture(item.picture);
    setEditedContent(item.content); // Clear the edited content
    setTempcontent('')
    setTempcontentEN('')
    setTempcontentCN('')
    setTempcontentJPN('')
    setEditedNamebu(item.nameth)

    setEditedContentEN(item.content_en)
    setEditedNamebuEN(item.name_en)
    setoldpicname(item.picture)
    setFile(null)

    setOpenEditedContent(false);
    setOpenEditedPicture(true);
    setOpenEditedNamebu(false)
  };

  const handleEditContent = (item) => {
    setEditItem(item);
    setIsEditing(true);
    setEditedContent(item.content);
    setTempcontent(item.content)
    setTempcontentEN(item.content_en)



    setEditedPicture(item.picture);
    setEditedNamebu(item.nameth)

    setEditedContentEN(item.content_en)
    setEditedContentCN(item.content_cn)
    setEditedContentJPN(item.content_jpn)

    setEditedNamebuEN(item.name_en)
    setTempcontentCN(item.content_cn)
    setTempcontentJPN(item.content_jpn)

    setOpenEditedContent(true);
    setOpenEditedPicture(false);
    setOpenEditedNamebu(false)

  };


  const handleEditnamebu = (item) => {
    setEditItem(item);
    setIsEditing(true);
    setEditedContent(item.content);
    setTempcontent('')
    setTempcontentEN('')
    setTempcontentCN('')
    setTempcontentJPN('')
    setEditedPicture(item.picture);

    setEditedContentEN(item.content_en)

    setEditedNamebu(item.nameth)
    setEditedNamebuEN(item.name_en)
    setEditedNamebuCN(item.name_cn)
    setEditedNamebuJPN(item.name_jpn)

    setOpenEditedContent(false);
    setOpenEditedPicture(false);
    setOpenEditedNamebu(true)

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
            handleSave();

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

  function generateUniqueFileName(originalFileName) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileExtension = originalFileName.split('.').pop(); // Get the file extension
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
    return uniqueFileName;
  }


  const handleadd = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/Affiliate.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        fetchData();
      })
      .catch(error => console.error('Error adding new Accreditations:', error));
  }

  const handleDeletePictureAndData = async (item) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete?');

    if (confirmDeletion) {
      try {
        const deleteDataResponse = await fetch(`https://sungroup.co.th/sungroup/Php-Api/Affiliate.php/${item.id}`, {
          method: 'DELETE',
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

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Affiliate Backend</h1>
      {isEditing ? (
        <div>
          {openeditedPicture ? renderEditPicture() : null}
          {openeditedContent ? renderEditContent() : null}
          {openeditedNamebu ? renderEditnamebu() : null}

          <button
            className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap border p-4 gap-4">
          {data.map((item) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 border" key={item.id}>
              <p className="text-lg font-bold mb-2">{item.nameth}</p>
              <p className="text-lg font-bold mb-2">{item.name_en}</p>

              <div className='flex flex-col '>

                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                  onClick={() => handleEditPicture(item)}
                >
                  แก้ไขภาพ
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded mt-2"
                  onClick={() => handleEditContent(item)}
                >
                  แก้ไขคอนเทนต์
                </button>

                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded mt-2"
                  onClick={() => handleEditnamebu(item)}
                >
                  แก้ไขชื่อบริษัท
                </button>

                <button
                  onClick={() => handleDeletePictureAndData(item)}
                  disabled={data.length === 2} // Disable the button based on the condition

                  className={`bg-red-500 mt-2 text-white px-4 py-2 rounded-md ${data.length === 2 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                >
                  ลบ
                </button>

              </div>
            </div>
          ))}
          <button onClick={handleadd} className="p-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            เพิ่ม
          </button>
        </div>
      )}
    </div>
  );

}

export default AffiliateBackend;
