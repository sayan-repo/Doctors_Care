import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: [true, "First Name Is Required!"],
      minLength: [3, "Min. 3 Characters!"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name Is Required!"],
      minLength: [3, "Min. 3 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required!"],
      validate: [validator.isEmail, "Please Provide A Valid Email!"],
    },
    phone: {
      type: String,
      required: [true, "Phone No. Is Required!"],
      minLength: [10, "Must Contain Exactly 10 Digits!"],
      maxLength: [10, "Must Contain Exactly 10 Digits!"],
    },
    rid: {
      type: String,
      required: [true, "RID Is Required!"],
      minLength: [3, "Registration ID Must Contain MIN 3 Digits!"],
      maxLength: [7, "Registration ID Must Contain MAX 73 Digits!"],
    },
    dob: {
      type: Date,
      required: [true, "DOB Is Required!"],
    },
    gender: {
      type: String,
      required: [true, "Gender Is Required!"],
      enum: ["Male", "Female"],
    },
    appointment_date: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,    
    },
    doctor: {
      firstname:{
        type: String,
        required: true,
      },
      lastname:{
        type: String,
        required: true,
      },
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    }
});

export const Appointment = mongoose.model("Appoinment", appointmentSchema);