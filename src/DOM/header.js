
import createContent from "./content.js";
import createTask from "../create/createTask.js";
import createProject from "../create/createProject.js";

export default function createHeader(state) {
    const container = document.querySelector("#container");
    const header = document.createElement("div");
    header.classList.add("header");

    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = state.activeProject.name;

    const headerDisplay = document.createElement("div");
    headerDisplay.classList.add("headerDisplay")
    /* --- CONTENEUR DES BOUTONS DE PROJET --- */
    const projectsNav = document.createElement("div");
    projectsNav.classList.add("projects-nav");

    /* Fonction pour rendre la liste des projets réactive */
    function renderProjectButtons() {
        projectsNav.innerHTML = ""; // Vider avant de re-rendre

        state.projects.forEach(proj => {
            const projectClick = document.createElement("div");
            projectClick.textContent = proj.name;
            projectClick.style.cursor = "pointer"

            // Indiquer le projet actif visuellement
            if (proj === state.activeProject) {
                projectClick.classList.add("active");
            }

            // Écouteur pour changer de projet actif (SWITCH)
            projectClick.onclick = () => {
                state.activeProject = proj;
                title.textContent = state.activeProject.name;
                renderProjectButtons(); // Met à jour la classe active
                createContent(state);
            };

            projectsNav.appendChild(projectClick);
        });
    }

    

    // Initialisation de la barre de boutons au premier rendu
    renderProjectButtons();
    createTask(state, header);
    createProject(state, header, () => {
        title.textContent = state.activeProject.name;
        renderProjectButtons();
        createContent(state);
    });
    // Insertion dans le DOM
    header.appendChild(title);
    header.appendChild(projectsNav);

    
    container.appendChild(header);
}