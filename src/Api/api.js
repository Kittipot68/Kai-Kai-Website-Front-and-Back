// api/api.js

const apiUrl = 'https://sungroup.co.th/Php-Api/index2.php/';

export const fetchData = () => {
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

export const handlePost = (newData) => {
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  }).catch((error) => {
    console.error('Error posting data:', error);
  });
};

export const handlePut = (id, newData) => {
  const updateUrl = `${apiUrl}${id}`;
  console.log('handlePut data:', updateUrl); // Add this line for debugging
  console.log('newData newData:', newData); // Add this line for debugging

  return fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  }).catch((error) => {
    console.error('Error updating data:', error);
  });
};

export const handleDelete = (id) => {
  const deleteUrl = `${apiUrl}${id}`;
  console.log('Deleting data:', deleteUrl); // Add this line for debugging

  return fetch(deleteUrl, {
    method: 'DELETE',
  }).catch((error) => {
    console.error('Error deleting data:', error);
  });
};
