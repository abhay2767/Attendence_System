import { useAuth } from '../store/auth'
import profile from '../Images/profile.png'
import { useEffect, useState } from 'react';

const Home = () => {
    const { isLoggedIn, Apipath, user, isLoading, userAuthentication, AuthorizationToken, userAttendance } = useAuth();
    const [data, setData] = useState(true)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const handleSubmit = async () => {
        try {

            setIsButtonDisabled(true);
            console.log("Inside" + data)
            const response = await fetch(`${Apipath}/api/add_attendance`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthorizationToken,
                },
                body: JSON.stringify({ inSide: data })
            });
            setData(true)
            const result = await response.json()
            console.log(result)

            alert("Checked in at " + Date() + "try after 1 min")
            console.log(data)
            userAttendance()

            setTimeout(() => {
                setIsButtonDisabled(false);
            }, 60000);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        userAuthentication()
    }, [])

    return (
        <>
            <div className='h-fit'>
                <div className="flex justify-center">
                    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center pb-10 mt-5">
                            {
                                user && isLoggedIn && !isLoading ? <img className="w-24 h-24 mb-3 rounded-full shadow-lg mt-10" alt="hello" src={`${Apipath}/api/images/${user.images}`} />
                                    :
                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg mt-10" src={profile} alt="profile" />
                            }
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{isLoggedIn && user && !isLoading ? user.name
                                : "Guest"}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{isLoggedIn && user && !isLoading ? user.email
                                : "Guest"}</span>
                            <div className="flex mt-4 md:mt-6">
                                <button onClick={handleSubmit}
                                    disabled={isButtonDisabled}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none dark:focus:ring-blue-800
                                ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}`}
                                >Checked-In
                                </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home