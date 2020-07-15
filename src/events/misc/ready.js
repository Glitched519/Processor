const { createStream } = require('table');
const tableConfig = require('../../utils/tableConfig');
const { commandStatus, eventStatus } = require('../../utils/registry');
const { ClientUser } = require('discord.js');

module.exports = async(client) => {
    client.user.setActivity("Partha turn 18", {type: 'WATCHING'}).catch(console.error);
	// await loadTable(commandStatus, 50);
    // console.log("\n");
    // await loadTable(eventStatus, 50);
	// let stream = createStream(tableConfig);
	// let i = 0;
	// let fn = setInterval(() => {
	// 	if(i === commandStatus.length) {
	// 		clearInterval(fn);
	// 	}
	// 	else {
	// 	stream.write(commandStatus[i])
	// 	i++;
	// }
	// }, 50);
}

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve, reject) => {
        fn = setInterval(() => {
            if(i === arr.length)
            {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval); 
    })
}