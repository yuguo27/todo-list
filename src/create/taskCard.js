
export default function createTaskCard(taskArrays, onUpdate, task, index){
    const card = document.createElement("div");
    card.classList.add("task-card");

    if (task.completed) {
        card.classList.add("completed");
    }

    const completionLabel = document.createElement("label");
    completionLabel.classList.add("task-completion");
    const completionCheckbox = document.createElement("input");
    completionCheckbox.type = "checkbox";
    completionCheckbox.checked = task.completed;
    completionLabel.append(completionCheckbox, " Terminée");
    completionCheckbox.addEventListener("change", () => {
        task.completed = completionCheckbox.checked;
        onUpdate(taskArrays);
    });

    const details = document.createElement("div");
    details.classList.add("task-details");

    const title = document.createElement("h3");
    title.textContent = task.title;
    const description = document.createElement("p");
    description.textContent = task.description;
    const dueDate = document.createElement("p");
    dueDate.textContent = `Pour le : ${task.dueDate}`;
    const priority = document.createElement("p");
    priority.textContent = `Priorité : ${task.priority}`;
    details.append(title, description, dueDate, priority);
    card.append(completionLabel, details);

    

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
        taskArrays.splice(index, 1);
        onUpdate(taskArrays);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Modifier";
    editBtn.addEventListener("click", () => {
        const newTitle = prompt("Modifier le titre :", task.title);
        if (newTitle !== null) {
            task.title = newTitle;
            onUpdate(taskArrays);
        }
    });

    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    
    return card;
}