import Task from "../Object/task.js";
import formFields from "../formFields.json";
import createContent from "../DOM/content.js";

export default function createTask(state, header){

    const createTaskButton = document.createElement("button");
    createTaskButton.textContent = "Create a task";

    const taskForm = document.createElement("form");
    taskForm.classList.add("form");
    taskForm.id = "taskForm";
    taskForm.style.display = "none";

    /* --- FORMULAIRE DE CRÉATION DE TÂCHE --- */
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
        taskForm.appendChild(element);
    });

    const submitTaskButton = document.createElement("button");
    submitTaskButton.type = "submit";
    submitTaskButton.textContent = "Ajouter";

    const cancelTaskButton = document.createElement("button");
    cancelTaskButton.type = "button";
    cancelTaskButton.textContent = "Annuler";

    cancelTaskButton.addEventListener("click", () => {
        taskForm.style.display = "none";
        taskForm.reset();
    });
    taskForm.append(submitTaskButton, cancelTaskButton);

    createTaskButton.addEventListener("click", () => {
        taskForm.style.display = taskForm.style.display === "none" ? "block" : "none";
    });

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTask = new Task(
            inputs.title.value,
            inputs.description.value,
            inputs.dueDate.value,
            inputs.priority.value,
            inputs.notes.value,
            inputs.mail.value
        );
        state.activeProject.tasks.push(newTask);

        localStorage.setItem("todo_projects", JSON.stringify(state.projects));
        createContent(state);
        taskForm.reset();
        taskForm.style.display = "none";
    });

    header.appendChild(createTaskButton);
    header.appendChild(taskForm);

}