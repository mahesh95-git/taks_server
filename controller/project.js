import trycatchWrapper from "../util/trycatch.js";
import { prisma } from "../util/postgresdp.js";
import response from "../util/response.js";


const createProject = trycatchWrapper(async (req, res, next) => {

    const {name,userId} =req.body;
    if (!name || !userId) {
        return response(res, 400, "All fields are required", false, null);
    }
    const project =await prisma.project.create({
        data:{
            name,
            userId
        },
        select:{
            name: true,
            userId: true,
            id: true,
        }
    })


})

const getProject=trycatchWrapper(async (req, res, next) => {

    const userId=req.userId;
    if (!userId) {
        return response(res, 400, "User ID is required", false, null);
    }
    const projects = await prisma.project.findMany({
        where: {
            userId: userId
        },
        select: {
            name: true,
            userId: true,
            id: true,
        }
    });
    if (projects.length === 0) {
        return response(res, 404, "No projects found for this user", false, null);
    }
    return response(res, 200, "Projects retrieved successfully", projects, true, projects);
})


const deleteProject = trycatchWrapper(async (req, res, next) => {

    const { id } = req.params;
    if (!id) {
        return response(res, 400, "Project ID is required", false, null);
    }
    const project = await prisma.project.delete({
        where: {
            id: id
        }
    });
    if (!project) {
        return response(res, 404, "Project not found", false, null);
    }
    return response(res, 200, "Project deleted successfully", project, true, null);

})

export {
    getProject,
    createProject,
    deleteProject
}