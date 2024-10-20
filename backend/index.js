import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import router from "./routes/user.routes.js";

dotenv.config({});

const app = express();

//middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions))

const port = process.env.PORT || 3000

app.use("/api/v1/user", router)

app.listen(port, () => {
    connectDB();
    console.log(`server is running on port ${port}`);
})

