import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "hello world",
        success: true
    })
})

//middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOptions))

const port = 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})