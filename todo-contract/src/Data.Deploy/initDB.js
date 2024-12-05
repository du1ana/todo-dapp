import { Tables } from "../Constants/Tables";

const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const settings = require("../settings.json").settings;

export class DBInitializer {
	static #db = null;

	static async init() {
		// If database does not exist. (In an initial run)
		if (!fs.existsSync(settings.dbPath)) {
			this.#db = new sqlite3.Database(settings.dbPath);

		// Create table ToDoItem
		await this.#runQuery(`CREATE TABLE IF NOT EXISTS ${Tables.TODOITEM} (
			Id INTEGER,
			Name TEXT NOT NULL,
			Description TEXT,
			IsCompleted BOOLEAN,
			PRIMARY KEY("Id" AUTOINCREMENT)
		)`);

		// Check if the table is empty
        const result = await this.#runSelectQuery(`SELECT COUNT(*) as count FROM ${Tables.TODOITEM}`);
		if (result[0].count === 0) {
			// Insert dummy data
			await this.#runQuery(`INSERT INTO ${Tables.TODOITEM} (Name, Description, IsCompleted) VALUES 
				('Sample Task 1', 'Description for Sample Task 1', 0),
				('Sample Task 2', 'Description for Sample Task 2', 1),
				('Sample Task 3', 'Description for Sample Task 3', 0),
				('Sample Task 4', 'Description for Sample Task 4', 0)
			`);
		}
			this.#db.close();
		}
	}

	static #runQuery(query, params = null) {
		return new Promise((resolve, reject) => {
			this.#db.run(query, params ? params : [], function (err) {
				if (err) {
					reject(err);
					return;
				}

				resolve({ lastId: this.lastID, changes: this.changes });
			});
		});
	}

	static #runSelectQuery(query, params = null) {
		return new Promise((resolve, reject) => {
			this.#db.all(query, params ? params : [], (err, rows) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(rows);
			});
		});
	}

}
