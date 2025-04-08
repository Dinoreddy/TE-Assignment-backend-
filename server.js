import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./lib/firebaseAdmin.js"; // Just runs the setup
import projectRouter from "./routes/projectRouter.js";

const app = express();
dotenv.config();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true
}));
app.use(express.json());

app.use("/api/projects", projectRouter);


const port = process.env.PORT || 5000;
app.listen(port, () =>{ console.log(`Server started on port ${port}`)
});