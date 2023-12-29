import React, { useEffect, useState } from 'react';
import { fetchData, handlePost, handlePut, handleDelete } from '../Api/api';

function Homepage() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };
  
  const handleCancelEdit = () => {
    setEditItem(null);
  };
  useEffect(() => {
    // Fetch data from the API using the imported fetchData function
    fetchData()
      .then((result) => {   setData(result);  })
      .catch((error) => { console.error('Error fetching data:', error); });
  }, []);

  // Define a function to handle the form submission (POST)
  const handleSubmit = async (newData) => {
    try {
      await handlePost(newData);
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Error posting or fetching data:', error);
    }
  };
  const Delete = async (id) => {
    try {
      await handleDelete(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error posting or fetching data:', error);
    }
  };
  const handleSaveEdit = async () => {
    try {
      if (editItem) {
        await handlePut(editItem.id, editItem);
        const result = await fetchData();
        setData(result);
        setEditItem(null); // Clear the editItem state
        console.log("result",result)

      }
    } catch (error) {
      console.error('Error saving edit or fetching data:', error);
    }
  };

  console.log("editItem",editItem)
  return (
    <div className="p-4">
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>  
    <ul>
      {data.map((item) => (
        <li key={item.id} className="my-4 p-2 border border-gray-300">
          <p className="text-lg">Name: {item.name}</p>
          <p className="text-lg">Email: {item.email}</p>
          <p className="text-lg">Mobile: {item.mobile}</p>
          <p className="text-lg">ID: {item.id}</p>
  
          <button
            onClick={() => Delete(item.id)}
            className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(item)}
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  
    {/* Example form for adding new data */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = {
          name: formData.get('name'),
          email: formData.get('email'),
          mobile: formData.get('mobile'),
        };
        handleSubmit(newData);
      }}
      className="my-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border border-gray-300 p-2 mr-2"
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        className="border border-gray-300 p-2 mr-2"
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        className="border border-gray-300 p-2 mr-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-2 py-1 rounded-md"
      >
        Add
      </button>
    </form>

    {editItem ? (
      <div>
        <input
          type="text"
          value={editItem.name}
          onChange={(e) =>
            setEditItem({ ...editItem, name: e.target.value })
          }
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="text"
          value={editItem.email}
          onChange={(e) =>
            setEditItem({ ...editItem, email: e.target.value })
          }
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="text"
          value={editItem.mobile}
          onChange={(e) =>
            setEditItem({ ...editItem, mobile: e.target.value })
          }
          className="border border-gray-300 p-2 mr-2"
        />
        <button
          onClick={handleSaveEdit}
          className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancelEdit}
          className="bg-gray-500 text-white px-2 py-1 rounded-md"
        >
          Cancel
        </button>
      </div>
    ) : null}
  </div>
  
  );
}

export default Homepage;
