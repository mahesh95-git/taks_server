import e from "express";
import { signinService, signupService } from "../contoller/user.js";
const Router = e.Router();

Router.post('/user/signup',signupService);
Router.post('/user/signin',signinService);

export default Router;