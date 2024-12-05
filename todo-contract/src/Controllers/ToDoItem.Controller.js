import { ToDoService } from "../Services/Domain.Services/ToDoService";

export class ToDoItemController {
	#message = null;
	#service = null;

	constructor(message) {
		this.#message = message;
		this.#service = new ToDoService(message);
	}

	async handleRequest() {
		try {
			switch (this.#message.subType) {
				case "AddToDoItem":
					return await this.#service.addToDoItem();
				case "GetToDoList":
					return await this.#service.getToDoList();
				case "UpdateToDoItemCompletion":
					return await this.#service.updateToDoItemCompletion();
				case "RemoveToDoItem":
					return await this.#service.removeToDoItem();
				default:
					return { error: "Invalid request subType.", request: this.#message };
			}
		} catch (error) {
			return { error: error };
		}
	}
}