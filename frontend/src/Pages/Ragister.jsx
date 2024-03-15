import { useState } from "react"
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ragister = () => {
    const navigate = useNavigate();
    const { storeTokenInLs, Apipath, isLoggedIn, isLoading } = useAuth();

    const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [image, setimage] = useState('')


  const handleInput1 = (e) => {
    setname(e.target.value)
  }
  const handleInput2 = (e) => {
    setemail(e.target.value)
  }
  const handleInput3 = (e) => {
    setpassword(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData
      formdata.append('name', name)
      formdata.append('email', email)
      formdata.append('password', password)
      formdata.append('images', image)

        const response = await fetch(`${Apipath}/api/ragister`, {
          method: "POST",
          body: formdata,
        });
        const json = await response.json()
        // console.log(json)

        if (response.ok) {
            toast.success("Ragistration succussful")
          navigate('/')
          storeTokenInLs(json.token)
        }
      }
    catch (error) {
      console.log(error)
    }
  }


  if (isLoggedIn) {
    return <Navigate to='/' />
  }
  if (isLoading) {
    return <h1>Loading....</h1>
  }

    return (
        <>
            <form method="POST" className="max-w-sm mx-auto">
                <h1 className="text-4xl flex justify-center">Signup</h1>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleInput1} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name="email" value={email} onChange={handleInput2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" name="password" value={password} onChange={handleInput3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="........" required />
                </div>
                <div>
                  <label className='lable' htmlFor='image'>Upload Image</label>
                  <input type="file" accept="image/*" name="image" onChange={(e) => setimage(e.target.files[0])} placeholder='Upload your image' required autoComplete='off' />
                </div>
                <div>
                <Link to='/login'><a className="resetpass" >Click here for <b>Login</b></a></Link>
              </div>
                
                <button type="submit" onClick={handleSubmit} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </>
    )
}

export default Ragister