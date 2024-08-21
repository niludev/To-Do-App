import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import TodosPage from "./components/TodosPage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const getProtectedData = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setIsLoggedIn(false)
                return;
            }

            const response = await fetch('http://127.0.0.1:5000/token-validate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (response.ok) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        }

        getProtectedData()
    }, [])

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <Router>
            {
                isLoggedIn ?
                    <>
                        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
                            <div className="flex-1 text-center font-bold">
                                <h1 className="text-xl font-bold">Todo App</h1>
                            </div>

                            <button
                                className="ml-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </nav>
                        <Routes>
                            <Route path="/todos" element={<TodosPage/>}/>
                            <Route path="*" element={<Navigate to={'/todos'}/>}/>
                        </Routes>
                    </>
                    :
                    <Routes>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Navigate to={'/login'}/>}/>
                    </Routes>
            }
        </Router>
    );
}

export default App;
