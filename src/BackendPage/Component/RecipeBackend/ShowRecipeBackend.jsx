import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { Modal } from 'flowbite-react';

const ShowRecipeBackend = ({ product, onClose }) => {

  const [how, sethow] = useState([]);
  const [ingrediant, setingrediant] = useState([]);
  const [detail, setdetail] = useState([]);

  const [newcontent, setnewcontent] = useState([])
  const [showEditingredientPopup, setshowEditingredientPopup] = useState(false)
  const [showEdithow, setshowEdithowPopup] = useState(false)

  const [editedcontent, seteditedcontent] = useState("")
  const [editedcontentEN, seteditedcontentEN] = useState("")
  const [editedcontentCN, seteditedcontentCN] = useState("")
  const [editedcontentJPN, seteditedcontentJPN] = useState("")

  const [editedid, seteditedid] = useState("")


  const [editedServes, setEditedServes] = useState("");
  const [editedCalories, setEditedCalories] = useState("");
  const [editedTime, setEditedTime] = useState("");
  const [editedYoutube, setEditedYoutube] = useState("");


  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Clean up the effect when the component is unmounted
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);

  const handleBackToProduct = () => {
    onClose(); // Close the ShowRecipe component
  };




  const fetchrecipehow = () => {
    fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
      method: 'GETRECIPEHOW',
      headers: {
        'Content-Type': 'application/json'
        // Add other necessary headers
      }
    })
      .then(response => response.json())
      .then(data => {
        sethow(data)
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  const fetchrecipeingrediant = () => {
    fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
      method: 'GETRECIPEINGREDIANT',
      headers: {
        'Content-Type': 'application/json'
        // Add other necessary headers
      }
    })
      .then(response => response.json())
      .then(data => {
        setingrediant(data)
      })
      .catch(error => console.error('Error fetching products:', error));
  };






  const handleEditingredient = (ingredient) => {
    seteditedcontent(ingredient.content)
    seteditedid(ingredient.id)
     seteditedcontentEN(ingredient.content_en)
     seteditedcontentCN(ingredient.content_cn)
    seteditedcontentJPN(ingredient.content_jpn)
    setshowEditingredientPopup(true)
    setshowEdithowPopup(false)

  }

  const handleEdithow = (how) => {
    seteditedid(how.id)
    seteditedcontent(how.content)
    seteditedcontentEN(how.content_en)
    seteditedcontentCN(how.content_cn)
   seteditedcontentJPN(how.content_jpn)
    setshowEdithowPopup(true)
    setshowEditingredientPopup(false)

  }

  const handleCloseEditPopup = () => {
    seteditedid("")
    seteditedcontent("")
    setshowEditingredientPopup(false)
    seteditedcontentEN("")
    seteditedcontentCN("")
   seteditedcontentJPN("")
    setshowEdithowPopup(false)
  }






  const handleDeleteingredient = (id) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${id}`, {
        method: 'DELETEINGREDIENT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            fetchrecipeingrediant();

          } else {
            throw new Error('Failed to delete the category');
          }
        })
        .catch(error => console.error('Error deleting category:', error));
    }
  }

  const handleAddingredient = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/Recipe.php', {
      method: 'POSTADDINGREDIENT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_recipe: product.id, content: "" })
    })
      .then(response => response.json())
      .then(data => {
        fetchrecipeingrediant();

      })
      .catch(error => console.error('Error adding new category:', error));
  }

  const handleUpdateingrediant = () => {
    if (editedid) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php`, {
        method: 'PUTNEWINGREDIENT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editedid, content: editedcontent, content_en: editedcontentEN, content_cn: editedcontentCN, content_jpn: editedcontentJPN })
      })
        .then(response => response.json())
        .then(data => {
          fetchrecipeingrediant()
          seteditedcontent("");
          seteditedcontentCN("")
          seteditedcontentEN("")
          seteditedcontentJPN("")
          seteditedid("");
          setshowEditingredientPopup(false);
        })
        .catch(error => console.error('Error updating category:', error));
    }
  }





  const handleDeleteHOW = (id) => {
    if (window.confirm("Are you sure you want to delete this HOW?")) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${id}`, {
        method: 'DELETEHOW',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            fetchrecipehow();

          } else {
            throw new Error('Failed to delete the category');
          }
        })
        .catch(error => console.error('Error deleting category:', error));
    }
  }

  const handleAddHOW = () => {
    fetch('https://sungroup.co.th/sungroup/Php-Api/Recipe.php', {
      method: 'POSTADDHOW',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_recipe: product.id, content: "" })
    })
      .then(response => response.json())
      .then(data => {
        fetchrecipehow();

      })
      .catch(error => console.error('Error adding new category:', error));
  }



  const handleUpdatehow = () => {
    if (editedid) {
      fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php`, {
        method: 'PUTNEWHOW',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editedid, content: editedcontent, content_en: editedcontentEN, content_cn: editedcontentCN, content_jpn: editedcontentJPN })

      })
        .then(response => response.json())
        .then(data => {
          fetchrecipehow()
          seteditedcontent("");
          seteditedcontentCN("")
          seteditedcontentEN("")
          seteditedcontentJPN("")
          seteditedid("");
          setshowEdithowPopup(false);
        })
        .catch(error => console.error('Error updating category:', error));
    }
  }

  const handlesaveSecond = () => {
    fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php`, {
      method: 'PUTNEWCOOKINGTIME',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: product.id, cookingtime: editedTime, calorie: editedCalories, serves: editedServes, youtube: editedYoutube })
    })
      .then(response => response.json())
      .then(data => {
        fetchproductdetail();
      })
      .catch(error => console.error('Error updating category:', error));

  }


  const fetchproductdetail = () => {
    fetch(`https://sungroup.co.th/sungroup/Php-Api/Recipe.php/${product.id}`, {
      method: 'GETDETAIL',
      headers: {
        'Content-Type': 'application/json'
        // Add other necessary headers
      }
    })
      .then(response => response.json())
      .then(data => {
        setEditedServes(data[0].serves);
        setEditedCalories(data[0].calorie);
        setEditedTime(data[0].cookingtime);
        setEditedYoutube(data[0].youtube)
      })
      .catch(error => console.error('Error fetching products:', error));
  };



  useEffect(() => {
    fetchrecipehow();
    fetchrecipeingrediant();
    fetchproductdetail();
  }, [])

  return (
    <div className="recipe-details p-4 md:p-8 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 md:mb-4">{product.name}</h2>

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* First Column - Picture */}
        <div>
          <img
            src={`https://sungroup.co.th/sungroup/Php-Api/getpicture.php?name=${product.picture}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Second Column - YouTube Iframe */}
        <div className="md:pl-4">
          {/* Replace 'yourYouTubeVideoID' with the actual ID of your YouTube video */}
          <div className="responsive-iframe-container">
            <iframe
              title="recipe-video"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${editedYoutube}`}
              frameBorder="0"
              allowFullScreen
              className="object-cover"
            ></iframe>
          </div>




        </div>
      </div>


      <div className="flex flex-wrap mb-4">
        {/* <div className="flex items-center">
          <p className="text-sm md:text-base mr-2">Cooking Time:</p>
          <input
            type="text"
            value={editedTime}
            onChange={(e) => setEditedTime(e.target.value)}
            className="mr-4 border w-20 border-gray-300 rounded p-1"
          />
        </div>



        <div className="flex items-center">
          <p className="text-sm md:text-base mr-2">Calories:</p>
          <input
            type="text"
            value={editedCalories}
            onChange={(e) => setEditedCalories(e.target.value)}
            className="mr-4 border w-20 border-gray-300 rounded p-1"
          />
        </div>

        <div className="flex items-center">
          <p className="text-sm md:text-base mr-2">Serve:</p>
          <input
            type="text"
            value={editedServes}
            onChange={(e) => setEditedServes(e.target.value)}
            className="mr-4 border w-20 border-gray-300 rounded p-1"
          />
        </div> */}


        <div className="flex items-center">

          <p className="text-sm md:text-base mr-2">Youtube ID:</p>
          <input
            type="text"
            value={editedYoutube}
            onChange={(e) => setEditedYoutube(e.target.value)}
            className="mr-4 border w-36 border-gray-300 rounded p-1"
          />
        </div>


        <button
          onClick={handlesaveSecond}
          className="ml-2 bg-blue-500 text-white hover:bg-blue-600 rounded px-2 py-1"
        >
          Save
        </button>
      </div>



      {/* Third Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Column - Show Ingredients */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
          <ul>
            {ingrediant.map((ingredient, index) => (
              <li key={index} className="mt-3 text-sm md:text-base">
                {index + 1}. {ingredient.content}
                <button
                  onClick={() => handleEditingredient(ingredient)} // Replace handleEdit with your actual edit function
                  className="ml-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteingredient(ingredient.id)} // Replace handleDelete with your actual delete function
                  className="ml-2 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>

            ))}
          </ul>
          <button onClick={() => handleAddingredient()} className=" mt-5 bg-slate-400 px-2 py-2 rounded text-white hover:underline"
          >เพิ่ม ส่วนผสม</button>
        </div>

        {/* Second Column - Show Steps to Cook */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Steps to Cook</h3>
          <ol>
            {how.map((step, index) => (
              <li key={index} className="mt-3 text-sm md:text-base">
                {index + 1}. {step.content}
                <button
                  onClick={() => handleEdithow(step)} // Replace handleEdit with your actual edit function
                  className="ml-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteHOW(step.id)} // Replace handleDelete with your actual delete function
                  className="ml-2 text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}

            <button onClick={() => { handleAddHOW() }} className=" mt-5 bg-slate-400 px-2 py-2 rounded text-white hover:underline"
            >เพิ่ม วิธีทำ</button>
          </ol>
        </div>

      </div>

      {/* Back to Product Button */}
      <Button
        className="bg-blue-500 text-white hover:bg-blue-700 transition duration-300 ease-in-out py-2 px-4 rounded-md mt-4"
        onClick={handleBackToProduct}
      >
        Back to Product
      </Button>



      {/* {showEditingredientPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ zIndex: 999 }}>
          <div className="absolute bg-black bg-opacity-50 w-full h-full" onClick={handleCloseEditPopup} style={{ zIndex: 1 }} />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md" style={{ zIndex: 1000 }}>
            <p className="text-lg font-bold mb-2">Edit ingredient</p>
            <textarea
              value={editedcontent}
              onChange={(e) => seteditedcontent(e.target.value)}
              placeholder="Enter new ingredient content"
              className="border w-96 border-gray-300 rounded p-2 mb-2"
            />

            <button
              onClick={handleUpdateingrediant}
              className={`px-4 ml-3 py-2 rounded ${editedcontent.length <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              disabled={editedcontent.length <= 0}
            >
              Update
            </button>
          </div>
        </div>
      )} */}


      {/* {showEdithow && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ zIndex: 999 }}>
          <div className="absolute bg-black bg-opacity-50 w-full h-full" onClick={handleCloseEditPopup} style={{ zIndex: 1 }} />
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md" style={{ zIndex: 1000 }}>
            <p className="text-lg font-bold mb-2">Edit Content</p>
            <textarea
              value={editedcontent}
              onChange={(e) => seteditedcontent(e.target.value)}
              placeholder="เพิ่มวิธีทำ"
              className="border w-96  border-gray-300 rounded p-2 mb-2"
            />

            <button
              onClick={handleUpdatehow}
              className={`px-4 ml-3 py-2 rounded ${editedcontent.length <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              disabled={editedcontent.length <= 0}
            >
              Update
            </button>
          </div>
        </div>
      )} */}



      <Modal show={showEdithow} >
        {/* onClose={closeEditModal} */}
        <Modal.Body>
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาไทย</h1>
          <textarea
            value={editedcontent}
            onChange={(e) => seteditedcontent(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาอังกฤษ</h1>

          <textarea
            value={editedcontentEN}
            onChange={(e) => seteditedcontentEN(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาจีน</h1>

          <textarea
            value={editedcontentCN}
            onChange={(e) => seteditedcontentCN(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาญี่ปุ่น</h1>

          <textarea
            value={editedcontentJPN}
            onChange={(e) => seteditedcontentJPN(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />


        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}

          <button
            onClick={handleUpdatehow}
            className={`px-4 ml-3 py-2 rounded ${editedcontent.length <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={editedcontent.length <= 0}
          >
            Update
          </button>



          <Button onClick={handleCloseEditPopup} >Cancel</Button>
          {/* onClick={closeEditModal} */}
        </Modal.Footer>
      </Modal>


      <Modal show={showEditingredientPopup} >
        {/* onClose={closeEditModal} */}
        <Modal.Body>
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาไทย</h1>
          <textarea
            value={editedcontent}
            onChange={(e) => seteditedcontent(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาอังกฤษ</h1>

          <textarea
            value={editedcontentEN}
            onChange={(e) => seteditedcontentEN(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาจีน</h1>

          <textarea
            value={editedcontentCN}
            onChange={(e) => seteditedcontentCN(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />
          <h1 className='text-2xl font-bold text-red-600'>ข้อมูลภาษาญี่ปุ่น</h1>

          <textarea
            value={editedcontentJPN}
            onChange={(e) => seteditedcontentJPN(e.target.value)}
            placeholder="เพิ่มวิธีทำ"
            className="border w-full border-gray-300 rounded p-2 mb-2"
          />



        </Modal.Body>
        <Modal.Footer>
          {/* Add buttons or actions for saving/canceling the edits */}

          <button
            onClick={handleUpdateingrediant}
            className={`px-4 ml-3 py-2 rounded ${editedcontent.length <= 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={editedcontent.length <= 0}
          >
            Update
          </button>



          <Button onClick={handleCloseEditPopup} >Cancel</Button>
          {/* onClick={closeEditModal} */}
        </Modal.Footer>
      </Modal>



    </div>
  );
};

export default ShowRecipeBackend;
