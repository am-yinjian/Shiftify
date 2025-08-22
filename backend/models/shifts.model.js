import mongoose from "mongoose";


//represents each daily shift for each worker/admin in the system
const shiftSchema = new mongoose.Schema({
  worker: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  notes: { type: String },
}, { timestamps: true });

const Shift = mongoose.model("Shift", shiftSchema);

export { Shift };
