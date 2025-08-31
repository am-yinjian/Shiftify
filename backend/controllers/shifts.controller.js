
// import mongoose from "mongoose";
import { Shift } from "../models/shifts.model.js";


export const getShifts = async (req, res) => {
    try {
        const shifts = await Shift.find({}).populate("worker");
        res.status(200).json({ success: true, data: shifts });
    } catch (error) {
        console.log("error in fetching shifts:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createShifts = async (req, res) => {
    const {worker, shifts} = req.body;
    if (!worker || !shifts) {
        return res.status(400).json({ success: false, message: "Please provide worker and array of shifts" });
    }
    try {
        const newShifts = shifts.map(shift => ({
            worker,
            startTime: shift.startTime,
            endTime: shift.endTime,
            notes: shift.notes || ""
        }));

        const savedShifts = await Shift.insertMany(newShifts); // bulk insert
        res.status(201).json({ success: true, data: savedShifts });
    } catch (error) {
        console.error("Error creating shifts:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateShifts = async (req, res) => {
    const { id } = req.params;
    const { worker, startTime, endTime, notes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Shift Id" });
    }

    try {
        const updatedShift = await Shift.findByIdAndUpdate(
            id,
            {
                worker,
                startTime,
                endTime,
                notes,
            },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedShift });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteShifts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Shift Id" });
    }

    try {
        await Shift.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Shift deleted" });
    } catch (error) {
        console.log("error in deleting shift:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};



// export const createShift = async (req, res) => {
//     const shift = req.body; 

//     if (!shifts) {
//         return res.status(400).json({ success: false, message: "Please provide all fields" });
//     }
//     const newShift = new ShiftSchema(shift);

//     try {
//         await newShift.save();
//         res.status(201).json({ success: true, data: newUsers });
//     } catch (error) {
//         console.error("Error in Create product:", error.message);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };
