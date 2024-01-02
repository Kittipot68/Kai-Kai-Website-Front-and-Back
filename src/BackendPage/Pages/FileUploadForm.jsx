import React, { useState } from 'react';

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      const uniqueFileName = generateUniqueFileName(file.name); // Generate a unique filename
      formData.append('file', file, uniqueFileName); // Append the unique filename
  
      fetch('https://sungroup.co.th/Php-Api/uploadpicture.php/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert(data.message);
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
  
  function generateUniqueFileName(originalFileName) {
    const timestamp = Date.now(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileExtension = originalFileName.split('.').pop(); // Get the file extension
    const uniqueFileName = `${timestamp}-${randomString}.${fileExtension}`;
    return uniqueFileName;
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUploadForm;
