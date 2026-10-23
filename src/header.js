

export default function createHeader(){

    const container = document.querySelector("#container");
    const header = document.createElement("div");
    header.classList.add("header");
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = 'My Project'
    header.appendChild(title);
    container.appendChild(header);
};