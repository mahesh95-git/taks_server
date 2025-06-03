import e from "express";
import auth from "../middleware/auth.js";
import { createProject, deleteProject, getAllProjects } from "../controller/project.js";
import checkRole from "../util/checkRole.js";
const Router = e.Router();

Router.post("/",auth,checkRole(["PROJECT_MANAGER"]),createProject);
Router.delete("/:id",auth,checkRole(["PROJECT_MANAGER"]),deleteProject);
Router.get("/",auth,checkRole(["PROJECT_MANAGER"]),getAllProjects);

export default Router;

