import { ServiceTypes } from "./Constants/ServiceTypes";
import { ToDoItemController } from "./Controllers/ToDoItem.Controller";

const settings = require("./settings.json").settings;

export class Controller {
	dbPath = settings.dbPath;
	#toDoItemController = null;

	async handleRequest(user, message, isReadOnly) {
		this.#toDoItemController = new ToDoItemController(message);

		let result = {};

		if (message.type == ServiceTypes.TODO) {
			result = await this.#toDoItemController.handleRequest();
		} else {
			result = { success: "Invalid request type", message:message, messageType: message.type };
		}

		if (isReadOnly) {
			await this.sendOutput(user, result);
		} else {
			await this.sendOutput(
				user,
				message.promiseId ? { promiseId: message.promiseId, ...result } : result
			);
		}
	}

	sendOutput = async (user, response) => {
		console.log("Sending response to user: ", response);
		await user.send(response);
		console.log("Response sent to user");
	};
}
