
import Project from "../Object/project.js";
import createContent from "../DOM/content.js";

export default function createProject(projectList, activeProject, header, title){
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
        projectList.push(newProj);
        activeProject = newProj; // Le nouveau projet devient le projet actif
        localStorage.setItem("todo_projects", JSON.stringify(projectList));
        title.textContent = activeProject.name;

        renderProjectButtons(); // Re-génère la liste des boutons
        createContent(activeProject.tasks); // Affiche les tâches (vides) du nouveau projet

        projectForm.reset();
        projectForm.style.display = "none";
    });

    header.appendChild(createProjectButton);
    header.appendChild(projectForm);

}

