import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_LINK,{
        dbName: "HOSPITAL MANAGEMENT SYSTEM"
    }).then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to datasbase: ${err}`);
    });
};