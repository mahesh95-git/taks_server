import e from "express";
import auth from "../middleware/auth.js";
import { createTask, deleteTask, updateTaks ,getTasks} from "../controller/task.js";
const Router = e.Router();      

Router.post("/",auth, createTask);
Router.delete("/:id",auth, deleteTask).patch("/:id", auth,updateTaks);
Router.get("/:projectId",auth, getTasks);


export default Router;