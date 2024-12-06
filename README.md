## Prerequisites

1. **Install the following:**
   - [Git](https://git-scm.com/)
   - [Node.js](https://nodejs.org/)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/)

2. **Install `hp-devkit`:**
   - Run the command: `npm i -g hpdevkit`

---

## Running the Smart Contract Locally (on Windows)

1. Navigate to the `./todo-contract/` directory.
2. Run `npm i` to install the required Node.js packages (this step is only needed once).
3. Start the smart contract locally:
   - Run `npm run start` to build and execute the contract using `hp-devkit`.
4. Stop the `hp-devkit` service when done:
   - Run `hpdevkit stop`.

> **Note:** Docker must be running when you try to run the smart contract. If you encounter any issues with `hp-devkit`, run the command `hpdevkit clean` to reset its state.

---

## Running the Client app (on Windows)

1. Navigate to the `./todo-client/` directory.
2. Run `npm i` to install the required Node.js packages (this step is only needed once).
3. Execute the client application:
   - Run `node todo-client.js`.

> **Important:** Ensure the smart contract is running before executing the client application to perform CRUD operations on the database.
