import e from "express";
import auth from "../middleware/auth.js";
import { createProject, deleteProject, getAllProjects } from "../controller/project.js";
const Router = e.Router();

Router.post("/",auth,createProject);
Router.delete("/:id",auth,deleteProject);
Router.get("/",auth,getAllProjects);

export default Router;

