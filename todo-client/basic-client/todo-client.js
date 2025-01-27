const HotPocket = require('hotpocket-js-client');
async function clientApp() {

    const userKeyPair = await HotPocket.generateKeys();
    const pkhex = Buffer.from(userKeyPair.publicKey).toString('hex');
    const pvtkhex = Buffer.from(userKeyPair.privateKey).toString('hex');
    console.log('My public key is: ' + pkhex);
    console.log('My private key is: ' + pvtkhex);
    const client = await HotPocket.createClient(['wss://localhost:8081'], userKeyPair);

    // Establish HotPocket connection.
    if (!await client.connect()) {
        console.log('Connection failed.');
        return;
    }

    console.log('HotPocket Connected.');
    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'GetToDoList'}));

    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'AddToDoItem', data: {Name: 'Buy Milk', Description: 'Buy Milk from the store'}}));

    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'GetToDoList'}));

    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'UpdateToDoItemCompletion', data: {Id: 5, IsCompleted: true}}));

    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'GetToDoList'}));

    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'RemoveToDoItem', data: {Id: 5}}));

    await client.submitContractInput(JSON.stringify({type:'ToDo', subType: 'GetToDoList'}));

    client.on(HotPocket.events.contractOutput, (result) => {
        console.log("Received outputs:");
        result.outputs.forEach((o) => console.log(o));
      });
}

clientApp();