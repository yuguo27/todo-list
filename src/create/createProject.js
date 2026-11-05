
import Project from "../Object/project.js";

export default function createProject(state, header, onProjectChange){
    /* --- FORMULAIRE DE CRÉATION DE PROJET --- */
    
    const createProjectButton = document.createElement("button");
    createProjectButton.textContent = "Create a project";

    const projectForm = document.createElement("form");
    projectForm.id = "projectForm";
    projectForm.style.display = "none";
    projectForm.classList.add("form");

    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.placeholder = "Project title";
    projectInput.classList.add("input");

    const submitProjectButton = document.createElement("button");
    submitProjectButton.type = "submit";
    submitProjectButton.textContent = "Ajouter";

    projectForm.appendChild(projectInput);
    projectForm.appendChild(submitProjectButton);

    createProjectButton.addEventListener("click", (e) => {
        e.preventDefault();
        projectForm.style.display = projectForm.style.display === "none" ? "block" : "none";
    });

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!projectInput.value.trim()) return;

        const newProj = new Project(projectInput.value.trim());
        state.projects.push(newProj);
        state.activeProject = newProj;
        localStorage.setItem("todo_projects", JSON.stringify(state.projects));

        onProjectChange();

        projectForm.reset();
        projectForm.style.display = "none";
    });

    header.appendChild(createProjectButton);
    header.appendChild(projectForm);

}
