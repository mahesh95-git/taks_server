import e from "express";
import auth from "../middleware/auth.js";
import { createTask, deleteTask, updateTaks ,getTasks} from "../controller/task.js";
import checkRole from "../util/checkRole.js";
const Router = e.Router();      

Router.post("/",auth,checkRole(["PROJECT_MANAGER"]), createTask);
Router.delete("/:id",auth, checkRole(["PROJECT_MANAGER"]),deleteTask).patch("/:id",checkRole(["EMPLOYEE"]), auth,updateTaks);
Router.get("/:projectId",auth,checkRole(["PROJECT_MANAGER","EMPLOYEE"]), getTasks);


export default Router;