import { Project } from "../models/projectsModel.js"

export const getProjects = async(req, res) => {
    try {
        const projects = await Project.find();

        if(!projects) return res.status(404).json({message: "No projects found"})
       return res.status(200).json(projects)
    } catch (error) {
        console.log("error in getting projects",error)
        res.status(500).json({message:"Error in getting projects"});
    }
}

export const createProject = async(req, res) => {
    try{
        const {title, description, skillSet, no_of_members} = req.body;
        const project = await Project.create({title, description, skillSet, no_of_members,});
        
        console.log(project)
        
        return res.status(200).json(project);
    }catch(error){
        console.log("error in creating project",error)
        res.status(500).json({message:"Error in creating project"});
    }
}

export const deleteProject = async(req,res)=>{
    try {
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        return res.json({message:"Project deleted successfully"});
    } catch (error) {
        console.log("error in deleting project",error)
        res.status(500).json({message:"Error in deleting project"});
    }
}
export const updateProject = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log(id)

        const project = await Project.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json({message:"Project updated successfully",project});
    } catch (error) {
        console.log("error in updating project",error)
        res.status(500).json({message:"Error in updating project",error:error});
    }
}

export const getProjectById = async(req,res)=>{
    try {
        const {id} = req.params;
        const project = await Project.findById(id);
        return res.status(200).json(project);
    } catch (error) {
        console.log("error in getting project by id",error)
        res.status(500).json({message:"Error in getting project by id"});
    }
}