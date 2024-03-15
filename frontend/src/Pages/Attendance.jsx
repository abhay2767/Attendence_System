import { useAuth } from "../store/auth";
import { Navigate } from 'react-router-dom';

const Attendance = () => {
    const { isLoggedIn, isLoading, attendanceData, user } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }
    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className=" flex flex-wrap justify-center mt-5">
                {attendanceData && attendanceData.map((currdata, index) => {
                    const { timestamp } = currdata || {}; // Added nullish coalescing for safety

                    let utcTimeStr = timestamp;
                    let utcTime = new Date(utcTimeStr);
                    // Convert to Indian Standard Time (IST)
                    let istTime = new Intl.DateTimeFormat('en-US', {
                        timeZone: 'Asia/Kolkata',
                        dateStyle: 'full',
                        timeStyle: 'long'
                    }).format(utcTime);
                    return (
                        <a key={index} className=" m-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{user.name}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Time:-{istTime}</p>
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-green-500 dark:text-white">Present</h3>
                        </a>
                    );
                })}
            </div>
        </>
    );
};

export default Attendance;
