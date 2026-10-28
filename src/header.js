import Task from "./task.js";
import formFields from "./formFields.json";
import createContent from "./content.js";
import Project from "./project.js";

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

    /* --- FORMULAIRE DE CRÉATION DE TÂCHE --- */
    const createTaskButton = document.createElement("button");
    createTaskButton.textContent = "Create a task";

    const form = document.createElement("form");
    form.classList.add("form");
    form.id = "taskForm";
    form.style.display = "none";
    const inputs = {};

    formFields.forEach(field => {
        let element;
        if (field.name === "priority") {
            element = document.createElement("select");
            element.classList.add("input");
            field.options.forEach(optionText => {
                const option = document.createElement("option");
                option.value = optionText.toLowerCase();
                option.textContent = optionText;
                element.appendChild(option);
            });
        } else {
            element = document.createElement("input");
            element.classList.add("input");
            element.type = field.type;
            element.placeholder = field.placeholder;
        }
        inputs[field.name] = element;
        form.appendChild(element);
    });

    const submitTaskButton = document.createElement("button");
    submitTaskButton.type = "submit";
    submitTaskButton.textContent = "Ajouter";

    const cancelTaskButton = document.createElement("button");
    cancelTaskButton.type = "button";
    cancelTaskButton.textContent = "Annuler";

    cancelTaskButton.addEventListener("click", () => {
        form.style.display = "none";
        form.reset();
    });
    form.append(submitTaskButton, cancelTaskButton);

    createTaskButton.addEventListener("click", () => {
        form.style.display = form.style.display === "none" ? "block" : "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = new Task(
            inputs.title.value,
            inputs.description.value,
            inputs.dueDate.value,
            inputs.priority.value,
            inputs.notes.value,
            inputs.mail.value
        );
        activeProject.tasks.push(newTask);

        localStorage.setItem("todo_projects", JSON.stringify(projectList));
        createContent(activeProject.tasks);
        form.reset();
        form.style.display = "none";
    });

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

    // Initialisation de la barre de boutons au premier rendu
    renderProjectButtons();

    // Insertion dans le DOM
    header.appendChild(title);
    header.appendChild(projectsNav);
    header.appendChild(createTaskButton);
    header.appendChild(createProjectButton);
    header.appendChild(form);
    header.appendChild(projectForm);
    container.appendChild(header);
}