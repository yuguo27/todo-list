export default function createContent(taskArrays = []) {
    const container = document.querySelector("#container");
    
    let content = document.querySelector(".content");

    if (!content) {
        content = document.createElement("div");
        content.classList.add("content");
        container.appendChild(content);
    } else {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    }

    const title = document.createElement("h1");
    title.textContent = "My Task";
    content.appendChild(title);

    taskArrays.forEach((task, index) => {
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
            createContent(taskArrays);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Modifier";
        editBtn.addEventListener("click", () => {
            const newTitle = prompt("Modifier le titre :", task.title);
            if (newTitle !== null) {
                task.title = newTitle;
                createContent(taskArrays);
            }
        });

        card.appendChild(deleteBtn);
        card.appendChild(editBtn);
        content.appendChild(card);
    });
}