import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        rid,
        role,
    } = req.body;
    if (
        !firstname ||
        !lastname ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !rid
    ) {
        return next(new ErrorHandler("Form Cannot be left blank!", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("Already Registered!", 400));
    }
    user = await User.create({
        firstname,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        rid,
        role,
    });
    generateToken(user, "Registered Successfully!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confirmPassword) {
        return next(
            new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
        );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler(`User Not Found With This Role!`, 400));
    }
    generateToken(user, "Logged in Successfully!", 201, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstname, lastname, email, phone, rid, dob, gender, password } =
        req.body;
    if (
        !firstname ||
        !lastname ||
        !email ||
        !phone ||
        !rid ||
        !dob ||
        !gender ||
        !password
    ) {
        return next(new ErrorHandler("Form cannot be left blank!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler("Email Already Exists!", 400));
    }

    const admin = await User.create({
        firstname,
        lastname,
        email,
        phone,
        rid,
        dob,
        gender,
        password,
        role: "Admin",
    });
    res.status(200).json({
        success: true,
        message: "New Admin Registered",
        admin,
    });
});

export const getAllDoctors = catchAsyncErrors(async(req,res,next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({

        success: true,
        doctors,
    });
});

