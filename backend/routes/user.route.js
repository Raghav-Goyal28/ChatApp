import express from "express";
import { allUsers, login, logout, Signup } from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router=express.Router();

router.post("/signup",Signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/allusers",secureRoute,allUsers);
export default router;