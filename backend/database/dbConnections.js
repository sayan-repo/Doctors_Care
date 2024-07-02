import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_LINK,{
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    }).then(()=>{
        console.log("Connected to database");
    })
    .catch((err)=>{
        console.log(`Some error occured while connecting to datasbase: ${err}`);
    });
};