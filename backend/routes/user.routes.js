import express from "express";
import { register, login } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";

const router = express.Router();

router