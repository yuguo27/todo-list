
export default function createTaskCard(taskArrays, onUpdate, task, index){
    const card = document.createElement("div");
    card.classList.add("task-card");

    card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Pour le : ${task.dueDate}</p>
        <p>Priorité : ${task.priority}</p>
    `;

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