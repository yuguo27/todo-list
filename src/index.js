import createHeader from "./header.js";
import createContent from "./content.js";
import Project from "./project.js";
import "./styles.css";
import Task from "./task.js";

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
                    rawTask.mail
                );
            });
            
            return project;
        });
        
        return projectList;
    }
    
    return null;
}

let projectList = loadLocalStorage();

// Si le localStorage était vide (première visite)
if (!projectList || projectList.length === 0) {
    projectList = [];
    const defaultProject = new Project("Inbox", []);
    projectList.push(defaultProject);
    
    // On sauvegarde tout de suite l'état initial
    localStorage.setItem("todo_projects", JSON.stringify(projectList));
}

let activeProject = projectList[0];

createHeader(projectList, activeProject);
createContent(activeProject.tasks);