import mongoose from "mongoose";

// represents an individual worker/admin in the system
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },

  shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shift" }],

  availability: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: true },
  },
    daysOff: [{ type: Date }],
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export { User };
