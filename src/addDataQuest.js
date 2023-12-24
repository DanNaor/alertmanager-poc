//@desc 
// this script will add data that either trigger or turn off a grafana alert(add H or L argument to the script execution in order to get the wanted outcome)
const { Sender } = require('@questdb/nodejs-client');

const questDbUrl = 'http://localhost:9000';  // Replace with your QuestDB URL
const tableName = 'fakeData.csv';

// Function to add data to QuestDB
async function triggerAlert(flag) {
  const sender = new Sender();

  await sender.connect({ port: 9009, host: 'localhost' });

  // Adjust colValue based on the flag
  let colValue = (flag === 'H') ? 26000 : 20000;

  sender
    .table(tableName)
    .intColumn('count', colValue)
    .timestampColumn('pickup_datetime', Date.now(), 'ms')
    .at(Date.now(), 'ms');
  
  await sender.flush();
  await sender.close();
  return Promise.resolve(0);
}

// Check if a flag is provided as a command-line argument
const flag = process.argv[2];

// Call the function with the provided flag
triggerAlert(flag)
  .then(() => console.log(`Data added with flag: ${flag}`))
  .catch(console.error);
