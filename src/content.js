export default function createContent(taskArrays = []){
    const container = document.querySelector("#container");
    
    
    let content = document.querySelector(".content");

    //1. verification de si le content est présent ou non 
    if (!content) {
        content = document.createElement("div");
        content.classList.add("content");
        container.appendChild(content);
    } else {
        // S'il existe déjà, on le vide proprement sans innerHTML (sécurisé !)
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    }

    // 2. On remet le titre
    const title = document.createElement("h1");
    title.textContent = "My Task";
    content.appendChild(title);

    // 3. On parcourt le tableau pour recréer les cartes à jour
    taskArrays.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        const cardTitle = document.createElement("h3");
        cardTitle.textContent = task.title; 

        const cardDesc = document.createElement("p");
        cardDesc.textContent = task.description;

        const cardDate = document.createElement("span");
        cardDate.textContent = `Pour le : ${task.dueDate}`;

        const cardPriority = document.createElement("span");
        cardPriority.textContent = `Priorité : ${task.priority}`;

        const cardNotes = document.createElement("span");
        cardNotes.textContent = `Priorité : ${task.notes}`;

        const cardMail = document.createElement("span");
        cardMail.textContent = `Priorité : ${task.mail}`;

        card.append(cardTitle, cardDesc, cardDate, cardPriority, cardNotes, cardMail);
        content.appendChild(card);
    });
};