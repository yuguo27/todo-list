import Task from "./task.js";
import formFields from "./formFields.json";
import createContent from "./content.js";


export default function createHeader(){
    let taskArrays = [];
    const container = document.querySelector("#container");
    const header = document.createElement("div");
    header.classList.add("header");
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = 'My Project'
    /*bouton de creation d'une tache */
    const createTaskButton = document.createElement("button");
    createTaskButton.textContent = "create a task"
    const form  = document.createElement("form");
    form.classList.add("form");
    form.id = "taskForm";
    form.style.display = "none";
    const inputs = {};
    /*parcourir le JSON pour les inputs */
    formFields.forEach(field => {
        let element;
        if (field.name === "priority") {
            // On crée un <select> pour la priorité
            element = document.createElement("select");
            element.classList.add("input");

            // On ajoute les options Low, Medium, High
            field.options.forEach(optionText => {
                const option = document.createElement("option");
                option.value = optionText.toLowerCase();
                option.textContent = optionText;
                element.appendChild(option);
            });
        } else {
            // On crée un <input> classique pour le reste
            element = document.createElement("input");
            element.classList.add("input");
            element.type = field.type;
            element.placeholder = field.placeholder;
        }

        inputs[field.name] = element;
        form.appendChild(element);
    });

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Ajouter";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Annuler";

    cancelButton.addEventListener("click", () => {
        form.style.display = "none";
        form.reset();
    });
    form.append(submitButton, cancelButton);

    

    createTaskButton.addEventListener("click", () => {
        form.style.display = form.style.display === "none" ? "block" : "none";
    });

    form.addEventListener("submit" , (e) => {
        e.preventDefault();
        const newTask = new Task(
            inputs.title.value,
            inputs.description.value,
            inputs.dueDate.value,
            inputs.priority.value,
            inputs.notes.value,
            inputs.mail.value
        );
        taskArrays.push(newTask);

        createContent(taskArrays);
        form.reset();
        form.style.display = "none";
    })

    header.appendChild(title);
    header.appendChild(createTaskButton);
    header.appendChild(form);

    container.appendChild(header);
};