const settings = require("../../settings.json").settings;
const { SqliteDatabase } = require("../Common.Services/dbHandler").default;
import { Tables } from "../../Constants/Tables";

export class ToDoService {
	#message = null;
	#dbPath = settings.dbPath;
	#dbContext = null;

	constructor(message) {
		this.#message = message;
		this.#dbContext = new SqliteDatabase(this.#dbPath);
	}

	async addToDoItem() {
		let resObj = {};

		try {
			this.#dbContext.open();
			const data = this.#message.data;

			const toDoItemEntity = {
				Name: data.Name,
				Description: data.Description,
				IsCompleted: data.IsCompleted || false,
			};

			const rowId = await this.#dbContext.insertValue(Tables.TODOITEM, toDoItemEntity);
			resObj.success = { message:"Added To Do item successfully", rowId: rowId };
			return resObj;
		} catch (error) {
		} finally {
			this.#dbContext.close();
		}
	}

	async getToDoList() {
		let resObj = {};

		try {
			await this.#dbContext.open();

			let query = `SELECT * FROM TODOITEM`;

			let toDoRows = await this.#dbContext.runSelectQuery(query);

			console.log(toDoRows);

			if (!(toDoRows && toDoRows.length > 0)) {
				response.success = null;
				return response;
			}
			resObj.success = toDoRows;
			return resObj;
		} catch (error) {
			console.log("Error in listing to do items");
		} finally {
			this.#dbContext.close();
		}
	}

	async updateToDoItemCompletion() {
		let resObj = {};
	
		try {
			this.#dbContext.open();

			const data = this.#message.data;

			const updateData = {
				IsCompleted: data.IsCompleted
			};
	
			const result = await this.#dbContext.updateValue(Tables.TODOITEM, updateData, { Id: data.Id });
			resObj.success = {message:"Updated To Do item successfully", changes: result.changes };
			return resObj;
		} catch (error) {
			resObj.error = error.message;
			return resObj;
		} finally {
			this.#dbContext.close();
		}
	}
	
	async removeToDoItem(id) {
		let resObj = {};
	
		try {
			this.#dbContext.open();
			const data = this.#message.data;

			const result = await this.#dbContext.deleteValues(Tables.TODOITEM, { Id: data.Id });
			resObj.success = {message:"Deleted To Do item successfully", changes: result.changes };
			return resObj;
		} catch (error) {
			resObj.error = error.message;
			return resObj;
		} finally {
			this.#dbContext.close();
		}
	}

}
