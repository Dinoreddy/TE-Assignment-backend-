import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skillSet:{
        type: String,
        required: true
    },
    no_of_members: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: () => {
            const istDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            return new Date(istDate);
          }
    },
    
    
});

export const Project = mongoose.model("Project", projectSchema);