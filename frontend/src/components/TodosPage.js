import React, {useEffect, useState} from "react";
import Modal from "./Modal"

function TodosPage() {
    const [todos, setTodos] = useState(null);
    const [error, setError] = useState('');

    const [newTodo, setNewTodo] = useState({title: '', description: ''});
    const [editTodo, setEditTodo] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null)

    useEffect(() => {
        getUserTodos()
    }, [])

    const getUserTodos = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setError('no token found, please login.')
            return;
        }

        const response = await fetch('http://127.0.0.1:5000/todos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (response.ok) {
            const data = await response.json();
            setTodos(data)
        } else {
            setError('Failed to fetch protected data')
        }
    }


    const handleAddTodo = async () => {

        const token = localStorage.getItem("access_token");
        const response = await fetch('http://127.0.0.1:5000/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newTodo)
        })

        if (response.ok) {
            setNewTodo({title: '', description: ''});
            getUserTodos()
        } else {
            setError('Failed to create new todo')
        }
    }

    const handleEditClick = (todo) => {
        setEditTodo(todo)
    }

    const handleEditTodo = async () => {
        const token = localStorage.getItem("access_token");
        const todoId = editTodo.id;
        const response = await fetch(`http://127.0.0.1:5000/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(editTodo)

            /*body: JSON.stringify({
                title: editTodo.title,
                description: editTodo.description,
                done: editTodo.done
            }),*/
        })

        if (response.ok) {
            setEditTodo(null);
            getUserTodos()
        } else {
            setError('Failed to create new todo')
        }

    }

    const openModal = (todo) => {
        setTodoToDelete(todo)
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setTodoToDelete(null)
        setIsModalOpen(false);
    }

    const handleDeleteTodo = async (id) => {
        if (!todoToDelete) return

        const token = localStorage.getItem("access_token");
        const response = await fetch(`http://127.0.0.1:5000/todos/${todoToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (response.ok) {
            getUserTodos()
            closeModal()
        } else {
            setError('Failed to create new todo')
        }
    }

    return (
        <div className="p-4">
            {error && <p>{error}</p>}

            <div className="my-5">
                <h2 className="mb-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">Add a new To-Do</h2>
                <div className="flex ">
                    <input
                        className="block w-2/5 my-1 mr-1 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        placeholder="Title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                        required
                    />

                    <input
                        className="block w-2/5 my-1 mr-1 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        placeholder="Description"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                        required
                    />

                    <button className="block w-1/5 my-1  rounded bg-green-600 button text-sm text-white hover:bg-green-500 active:bg-green-700" onClick={handleAddTodo}>Add Todo</button>
                </div>
            </div>

            {todos && todos.length > 0
                ? <table className="mt-16 p-6 table-auto w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-teal-400 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Done</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map((todo, idx) => {
                            return <tr key={idx}>
                                {/*style={{margin: 8, padding: 8, background: "#eee"}}*/}
                                <td className="border border-gray-300 px-4 py-2">
                                    {editTodo && editTodo.id === todo.id ? (
                                        <input
                                            className="rounded-lg border border-gray-200 w-full pl-1"
                                            type="text"
                                            value={editTodo.title}
                                            onChange={(e) => setEditTodo({...editTodo, title: e.target.value})}
                                        />
                                    ) : (
                                        todo.title
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editTodo && editTodo.id === todo.id ? (
                                        <input
                                            className="rounded-lg border border-gray-200 w-full pl-1"
                                            type="text"
                                            value={editTodo.description}
                                            onChange={(e) => setEditTodo({
                                                ...editTodo,
                                                description: e.target.value
                                            })}
                                        />
                                    ) : (
                                        todo.description
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editTodo && editTodo.id === todo.id ? (
                                        <label>
                                            Done:
                                            <input
                                                className="border border-gray-300 ml-2"
                                                type="checkbox"
                                                checked={editTodo.done}
                                                onChange={(e) => setEditTodo({...editTodo, done: !editTodo.done})}
                                            />
                                        </label>
                                    ) : (
                                        // style={{color: 'green'}}
                                        todo.done
                                            ?
                                            <span className="flex justify-center items-center text-teal-400">✔️</span>
                                            :
                                            <span className="flex justify-center items-center text-red-500">✘</span>
                                        // style={{color: 'red'}}
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editTodo && editTodo.id === todo.id ? (
                                        <div className="flex justify-center items-center">
                                            <button className="mr-4 rounded bg-green-600 button w-full py-1 text-sm text-white hover:bg-green-500 active:bg-green-700" onClick={handleEditTodo}>Save</button>
                                            <button className="mr-4 rounded bg-red-600 button w-full py-1 text-sm text-white hover:bg-red-500 active:bg-red-700" onClick={() => setEditTodo(null)}>Cancel</button>
                                        </div>
                                    ) : (

                                        <div className="flex justify-center items-center">

                                            {/*edit button*/}
                                            <button className="mr-4"
                                                onClick={() => handleEditClick(todo)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                                                </svg>
                                            </button>

                                            {/*delete button*/}
                                            <button
                                                onClick={() => openModal(todo)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     stroke-width="1.5" stroke="currentColor" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                </svg>

                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                : null
            }
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onCOnfirm={handleDeleteTodo}
            />
        </div>
    )
}

export default TodosPage;