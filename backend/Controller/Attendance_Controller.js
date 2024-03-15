const User = require('../Model/User_Model')
const Attendance = require('../Model/Attendance_Model')
const {oneMinute} = require('../Helper/NextDay')

const Add_attendance = async (req, res) => {
    try {
        const user_id = req.user._id;
        const { inSide } = req.body;

        // Find the latest attendance record for the user
        const latestAttendance = await Attendance.findOne({ user: user_id }).sort({ timestamp: -1 });

        // If there's a latest attendance record
        if (latestAttendance) {
            const currentTime = new Date();
            const timeDiff = currentTime - latestAttendance.timestamp; // Difference in milliseconds

            // Check if less than a minute has passed since the last attendance
            if (timeDiff < 60000) { // 60000 milliseconds = 1 minute
                return res.status(400).json({ success: false, message: "Cannot mark attendance more than once per minute" });
            }
        }

        // Create a new attendance record
        const attendance_data = new Attendance({
            user: user_id,
            inSide
        });
        await attendance_data.save();

        res.status(200).json({ message: "Attendance marked Present" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const Get_attendance = async(req,res)=>{
    try {
         const allAttendance = await Attendance.find({});

         if (!allAttendance || allAttendance.length === 0) {
             return res.status(404).json({ success: false, message: "No attendance records found" });
         }
 
         res.status(200).json( allAttendance );
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    Add_attendance,
    Get_attendance
}