import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';

function Contact_backend() {
    const [data, setData] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    console.log("data", data)
    console.log("selectedContact", selectedContact)

    const fetchData = async () => {
        try {
            const response = await fetch('https://sungroup.co.th/sungroup/Php-Api/Contact.php', {
                headers: {
                    'Accept-Charset': 'utf-8',
                },
            });
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEditClick = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const handleInputChange = (e, property) => {
        setSelectedContact({
            ...selectedContact,
            [property]: e.target.value,
        });
    };

    const handleEdit = () => {
        // Implement logic to send the edited data to your backend API
        console.log("Edited Contact:", selectedContact);
        // Close the modal
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Call the fetchData function when the component mounts
        fetchData();
    }, []);


    const handleAddnewContact = () => {
        fetch('https://sungroup.co.th/sungroup/Php-Api/Contact.php', {
            method: 'POSTADDNEWCONTACT',
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



    const handleDeleteContact = async (id) => {
        const confirmDeletion = window.confirm('Are you sure you want to delete?');

        if (confirmDeletion) {
            try {
                const deleteDataResponse = await fetch(`https://sungroup.co.th/sungroup/Php-Api/Contact.php/${id}`, {
                    method: 'DELETECONTACT', // Use 'DELETE' method for deleting data
                });

                if (deleteDataResponse.ok) {
                    // Data successfully deleted, fetch updated data
                    fetchData(); // Assuming fetchData is a function that fetches the data
                    console.log('Contact deleted successfully.');
                } else {
                    // Handle non-successful response
                    console.error('Error:', deleteDataResponse.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // User cancelled the deletion
            console.log('Deletion cancelled by the user.');
        }
    };



    const handleSaveNewdata = () => {
        if (selectedContact) {
            fetch(`https://sungroup.co.th/sungroup/Php-Api/Contact.php`, {
                method: 'PUTNEWCONTACT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ place_en: selectedContact.place_en, name_en: selectedContact.name_en, id: selectedContact.id, name: selectedContact.name, place: selectedContact.place, tel: selectedContact.tel, email: selectedContact.email, map: selectedContact.map })
            })
                .then(response => response.json())
                .then(data => {
                    fetchData();
                    setSelectedContact(null);
                    setIsModalOpen(false)

                })
                .catch(error => console.error('Error updating category:', error));
        }
    };


    return (
        <div>
            <h1>Contact_backend</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((contact) => (
                    <div key={contact.id} className="bg-white p-4 shadow-md rounded-md mb-4">
                        {/* <img src={contact.picture} alt={contact.name} className="w-full h-32 object-cover mb-4 rounded-md" /> */}
                        <h2 className="text-xl font-semibold">{contact.name}</h2>
                        <p className="text-gray-500 mb-2">Place: {contact.place}</p>
                        <hr />
                        <h2 className="text-xl font-semibold">{contact.name_en}</h2>
                        <p className="text-gray-500 mb-2">Place: {contact.place_en}</p>

                        <hr />

                        <p className="text-gray-500 mb-2">Tel: {contact.tel}</p>
                        <p className="text-gray-500 mb-2">Email: {contact.email}</p>
                        <p className="text-gray-500 mb-2">
                            Map: {contact.map && contact.map.length > 50 ? `${contact.map.substring(0, 50)}...` : contact.map}
                        </p>
                        <div className='flex nowrap gap-3 mt-5'>
                            <Button onClick={() => handleEditClick(contact)}>Edit</Button>
                            <Button color='failure' onClick={(e) => handleDeleteContact(contact.id)}>ลบ</Button>
                        </div>
                    </div>

                ))}
                <div>
                    <Button color='warning' onClick={handleAddnewContact}>เพิ่ม Contact ใหม่</Button>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
                    {selectedContact && (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Edit Contact</h2>
                            <div className="flex justify-end">

                                <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <h1 className='font-bold mb-2'>ข้อมูลภาษาไทย</h1>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                    ชื่อ
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedContact.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="place" className="block text-sm font-medium text-gray-600">
                                    สถานที่
                                </label>
                                <input
                                    type="text"
                                    id="place"
                                    name="place"
                                    value={selectedContact.place}
                                    onChange={(e) => handleInputChange(e, 'place')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>
                            <hr className='mt-3 mb-3' />
                            <h1 className='font-bold mb-2'>ข้อมูลภาษาอังกฤษ</h1>
                            <div className="mb-4">
                                <label htmlFor="name_en" className="block text-sm font-medium text-gray-600">
                                    name
                                </label>
                                <input
                                    type="text"
                                    id="name_en"
                                    name="name_en"
                                    value={selectedContact.name_en}
                                    onChange={(e) => handleInputChange(e, 'name_en')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="place_en" className="block text-sm font-medium text-gray-600">
                                    place
                                </label>
                                <input
                                    type="text"
                                    id="place_en"
                                    name="place_en"
                                    value={selectedContact.place_en}
                                    onChange={(e) => handleInputChange(e, 'place_en')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>
                            <hr className='mt-3 mb-3' />

                            <div className="mb-4">
                                <label htmlFor="tel" className="block text-sm font-medium text-gray-600">
                                    Tel
                                </label>
                                <input
                                    type="text"
                                    id="tel"
                                    name="tel"
                                    value={selectedContact.tel}
                                    onChange={(e) => handleInputChange(e, 'tel')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                    Email
                                </label>
                                <textarea
                                    id="email"
                                    name="email"
                                    value={selectedContact.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                    rows={4} // You can adjust the number of rows as needed
                                />

                            </div>

                            <div className="mb-4">
                                <label htmlFor="map" className="block text-sm font-medium text-gray-600">
                                    Map
                                </label>
                                <input
                                    type="text"
                                    id="map"
                                    name="map"
                                    value={selectedContact.map}
                                    onChange={(e) => handleInputChange(e, 'map')}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                />
                            </div>

                            {/* Add similar blocks for other input fields */}

                            <div className="flex space-x-4">
                                <Button color='success' onClick={handleSaveNewdata}>Save</Button>
                                <Button color='light' onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default Contact_backend;
