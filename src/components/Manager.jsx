import React from 'react'
import './Component.css'
import { useState, useEffect } from 'react';
import { IoMdStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setForm] = useState({ title: "", note: "" })
    const [noteArray, setNoteArray] = useState([])
    const [search, setSearch] = useState("")
    const [showFavourite, setShowFavourite] = useState(false)

    useEffect(() => {
        let notes = localStorage.getItem("notes")
        if (notes) {
            setNoteArray(JSON.parse(notes))
        } else {

        }
    }, [])



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = (e) => {
        if (form.note.length > 2 && form.title.length > 2) {
            setNoteArray([...noteArray, { ...form, id: uuidv4() }])
            localStorage.setItem("notes", JSON.stringify([...noteArray, { ...form, id: uuidv4() }]))
            setForm({ title: "", note: "" })
            toast('Note Added!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Info failed to Save!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,

                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value)

    }

    const handleSearch = () => {
        console.log("Search successfull")
        const items = JSON.parse(localStorage.getItem("notes"))
        if (items.length > 0) {
            const filteredItems = items.filter(item =>
                item.title.includes(search) || item.note.includes(search)
            );
            setNoteArray(filteredItems);
        }

    }


    const handleEdit = (id) => {
        setForm(noteArray.filter(item => item.id === id)[0])
        setNoteArray(noteArray.filter(item => item.id != id))
    }

    const handleDelete = (id) => {
        let c = confirm("Do You Really Want To Delete the Note?")
        if (c) {
            setNoteArray(noteArray.filter(item => item.id != id))
            localStorage.setItem("notes", JSON.stringify(noteArray.filter(item => item.id != id)))
            toast('Note Deleted!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,

                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const toggleIconClick = (id) => {
        const updatedNotes = noteArray.map(note =>
            note.id === id ? { ...note, isFavourite: !note.isFavourite } : note
        );
        setNoteArray(updatedNotes)
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const toggleFavourite = () => {
        setShowFavourite(!showFavourite)
     }

    const showAll = () => { 
        setShowFavourite(!showFavourite)
     }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>

            <div className='flex items-center py-16 flex-col'>
                <div className='text-3xl cursor-pointer font-bold'><span className='text-purple-500'>&lt;</span>Notes<span className='text-purple-500'>Vault</span><span className='text-purple-500'>/&gt;</span></div>
                <div className='text-gray-700 text-lg'>Your Own Notes Manager</div>
            </div>
            <div>
                <div action="#" method="POST" className='w-1/2 mx-auto'>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                            Title Of Note
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            id="title"
                            name="title"
                            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                            Description Of Note
                        </label>
                        <textarea
                            id="note"
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            rows="2"
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={savePassword} className='flex justify-center gap-1 items-center bg-purple-400  hover:bg-purple-300 rounded-full px-4 py-2 w-fit border border-purple-600'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                            ></lord-icon>
                            <span className='text-lg font-semibold'>Save</span></button>
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-5 py-10 w-3/4 mx-auto'>
                <div className='text-2xl font-semibold'>Your Notes</div>
                <div className='flex items-center relative'>
                    <input onChange={handleSearchChange} className='border-2 border-white custom-glow placeholder-gray-400 p-1' placeholder='Search...' type="text" name="search" id="" />
                    <button onClick={handleSearch} className='cursor-pointer absolute search-img'>
                        <lord-icon
                            src="https://cdn.lordicon.com/fkdzyfle.json"
                            trigger="click"
                            colors="primary:#a866ee">
                        </lord-icon>
                    </button>
                </div>
            </div>

            <div className="flex justify-around">
                        <button onClick={showAll} className='flex justify-center gap-1 items-center bg-purple-400  active:bg-purple-300 rounded-full px-4 py-2 w-fit border border-purple-600'>
    
                            <span className='text-lg font-semibold'>All Notes</span></button>
                        <button onClick={toggleFavourite} className='flex justify-center gap-1 items-center bg-purple-400  active:bg-purple-300 rounded-full px-4 py-2 w-fit border border-purple-600'>
                            
                            <span className='text-lg font-semibold'>Favourite Notes</span></button>
            </div>

            <section className="text-gray-700 body-font">
                <div className="container px-6 py-10 mx-auto">
                    {noteArray.length === 0 && <div className='text-xl font-semibold flex justify-center'> Add Notes To Visualize!</div>}
                    {noteArray.length != 0 && <div className="flex flex-wrap -m-4 gap-24 justify-center">
                        {noteArray.map((item, index) => {
                            return (showFavourite || item.isFavourite) && <div key={index} className="p-1 md:w-1/3">
                                <div className="h-full border-2 border-gray-400 border-opacity-70 rounded-lg overflow-hidden">
                                    <div className="py-1">
                                        <div className='flex justify-center'>
                                            <h1 className="title-font text-xl font-semibold text-gray-900 my-3">{item.title}</h1>
                                        </div>
                                        <div className='border-b border-gray-400 w-full'></div>
                                        <p className="leading-relaxed my-3 mx-3">{item.note}</p>
                                        <div className='border-b border-gray-400 w-full'></div>
                                        <div className='flex justify-between items-center py-2 px-4'>
                                            <span onClick={() => { handleEdit(item.id) }} className='cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                ></lord-icon>
                                            </span>
                                            <span onClick={() => { handleDelete(item.id) }} className='cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                ></lord-icon>
                                            </span>
                                            <span onClick={() => toggleIconClick(item.id)} style={{ cursor: 'pointer' }}>
                                                {item.isFavourite ? (
                                                    <IoMdStar style={{ width: '32px', height: '32px', paddingLeft: '3px' }} />
                                                ) : (
                                                    <IoMdStarOutline style={{ width: '32px', height: '32px', paddingLeft: '3px' }} />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    }
                </div>
            </section>

        </>
    )
}

export default Manager