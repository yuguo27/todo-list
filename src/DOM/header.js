
import createContent from "./content.js";
import createTask from "../create/createTask.js";
import createProject from "../create/createProject.js";

export default function createHeader(projectList, defaultProject) {
    const container = document.querySelector("#container");
    const header = document.createElement("div");
    header.classList.add("header");

    let activeProject = defaultProject;

    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = activeProject.name;

    /* --- CONTENEUR DES BOUTONS DE PROJET --- */
    const projectsNav = document.createElement("div");
    projectsNav.classList.add("projects-nav");

    /* Fonction pour rendre la liste des projets réactive */
    function renderProjectButtons() {
        projectsNav.innerHTML = ""; // Vider avant de re-rendre

        projectList.forEach(proj => {
            const projectButton = document.createElement("button");
            projectButton.classList.add("project-btn");
            projectButton.textContent = proj.name;

            // Indiquer le projet actif visuellement
            if (proj === activeProject) {
                projectButton.classList.add("active");
            }

            // Écouteur pour changer de projet actif (SWITCH)
            projectButton.addEventListener("click", () => {
                activeProject = proj;
                title.textContent = activeProject.name;
                renderProjectButtons(); // Met à jour la classe active
                createContent(activeProject.tasks);
            });

            projectsNav.appendChild(projectButton);
        });
    }

    

    // Initialisation de la barre de boutons au premier rendu
    renderProjectButtons();
    createTask(activeProject, projectList, header);
    createProject(projectList,activeProject, header, title);
    // Insertion dans le DOM
    header.appendChild(title);
    header.appendChild(projectsNav);

    
    container.appendChild(header);
}