import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    password: {
      type: String,
      required: [true, "Password Is Required!"],
      minLength: [8, "Password Must Contain At Least 8 Characters!"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "User Role Required!"],
      enum: ["Patient", "Doctor", "Admin"],
    },
    doctorDepartment:{
      type: String,
    },
    docAvatar: {
      public_id: String,
      url: String,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);