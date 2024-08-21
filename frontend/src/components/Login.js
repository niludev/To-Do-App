import React, {useState} from "react";
import {Link} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({username, password}),
        })

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        setMessage(data.message)
        window.location.href = "/"
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-auto w-auto"
                     src="/4957412_Mobile-login.svg" alt="Your Company"/>
                {/*<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">*/}
                {/*    Sign in to your account*/}
                {/*</h2>*/}
            </div>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300">
                        Login
                    </button>
                </form>
                {message && <p>{message}</p>}
            <p className="mt-3">
                Don't have an account yet? <Link to="/register" className="text-teal-300 border-b-2 border-teal-300">Register</Link>
            </p>
            </div>
        </div>
    )
}

export default Login;