import createHeader from "./DOM/header.js";
import createContent from "./DOM/content.js";
import Project from "./Object/project.js";
import "./styles.css";
import Task from "./Object/task.js";




function loadLocalStorage() {
    let savedData = localStorage.getItem("todo_projects");
    
    if (savedData) {
        let rawProjects = JSON.parse(savedData);
        
        // On reconstruit de vrais objets Project et Task à partir des données brutes
        let projectList = rawProjects.map(rawProj => {
            let project = new Project(rawProj.name);
            
            // Pour chaque tâche du projet, on recrée une vraie instance de Task
            project.tasks = rawProj.tasks.map(rawTask => {
                return new Task(
                    rawTask.title,
                    rawTask.description,
                    rawTask.dueDate,
                    rawTask.priority,
                    rawTask.notes,
                    rawTask.mail,
                    rawTask.completed ?? false
                );
            });
            
            return project;
        });
        
        return projectList;
    }
    
    return null;
}

let projects = loadLocalStorage();
// Si le localStorage était vide (première visite)
if (!projects || projects.length === 0) {
    projects = [];
    const defaultProject = new Project("Inbox", []);
    projects.push(defaultProject);
    
    // On sauvegarde tout de suite l'état initial
    localStorage.setItem("todo_projects", JSON.stringify(projects));
}

const state = {
    projects,
    activeProject: projects[0]
};

createHeader(state);
createContent(state);