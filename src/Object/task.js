/*ici la logique pour créer la tache  */
let Task  = function(title, description, dueDate, priority, notes, mail, completed = false){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.mail = mail;
    this.completed = completed;
}


export default Task;