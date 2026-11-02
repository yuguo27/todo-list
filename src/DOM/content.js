import createTaskCard from "../create/taskCard.js";


export default function createContent(taskArrays) {
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

    const refresh = () => createContent(taskArrays);

    const title = document.createElement("h1");
    title.textContent = "My Task";
    content.appendChild(title);


    taskArrays.forEach((task, index) => {
        createTaskCard(taskArrays, refresh, task, index);
        content.appendChild(createTaskCard(taskArrays, refresh, task, index));
    });

    
    
}