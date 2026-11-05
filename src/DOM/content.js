import createTaskCard from "../create/taskCard.js";


export default function createContent(state) {
    const container = document.querySelector("#container");
    const taskArrays = state.activeProject.tasks;
    
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

    const refresh = () => {
        localStorage.setItem("todo_projects", JSON.stringify(state.projects));
        createContent(state);
    };

    const title = document.createElement("h1");
    title.textContent = "My Task";
    content.appendChild(title);


    taskArrays.forEach((task, index) => {
        content.appendChild(createTaskCard(taskArrays, refresh, task, index));
    });

    
    
}