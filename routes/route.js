import e from "express";
import { signinService, signupService } from "../controller/user.js";
const Router = e.Router();

Router.post('/signup',signupService);
Router.post('/signin',signinService);

export default Router;