export class ToDoItemDto {
    id;
    name;
    description;
    isCompleted;
    constructor(id, name, description, isCompleted = false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isCompleted = isCompleted;
    }
}