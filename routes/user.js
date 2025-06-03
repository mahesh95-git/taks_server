import e from "express";
import { signupService ,signinService} from "../controller/user.js";
import { signinLimiter,signupLimiter } from "../util/rateLimit.js";
const Router = e.Router();

Router.post('/signup',signupLimiter,signupService);
Router.post('/signin',signinLimiter,signinService);

export default Router;