import React from "react";
import {Link} from "react-router-dom";

function Register() {
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        })

        const data = await response.json();
        setMessage(data.message)
        window.location.href = "/login"
    }

    return (
        <div className="bg-teal-400 min-h-screen">
            <div className="flex flex-col h-screen justify-center items-center px-6 py-12 lg:px-8">
                <div className="bg-white rounded p-5 pt-2 mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-teal-400 text-center text-2xl font-bold leading-9 tracking-tight">Register</h2>
                    <form className=" space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300">
                            Register
                        </button>
                    </form>
                    {message && <p>{message}</p>}

                    <p className="mt-3">
                        Do you have an account? <Link to="/login"
                                                      className="text-teal-300 border-b-2 border-teal-300">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
