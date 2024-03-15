import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLs, Apipath, isLoggedIn, isLoading } = useAuth();
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    try {
      const response = await fetch(`${Apipath}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.username, password: user.password })
      });
      const json = await response.json()
      // console.log(json)

      if (response.ok) {
        toast.success("Logged in succussful")
        navigate('/')
      }
      else {
        toast.error(json.extra_Error ? json.extra_Error : json.message)
      }
      // console.log(json.token)
      // localStorage.setItem("Token", json.token);
      storeTokenInLs(json.token)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoggedIn) {
    return <Navigate to='/' />
  }
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <form method="POST" className="max-w-sm mx-auto">
        <h1 className="text-4xl flex justify-center">Login</h1>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="text" name="username" onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" name="password" onChange={handleInput} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="........" required />
        </div>
        <div>
          <Link to='/ragister'><a className="resetpass" >Click here for <b>Signup</b></a></Link>
        </div>

        <button type="submit" onClick={handleSubmit} className="flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </>
  )
}

export default Login