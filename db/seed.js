const { client, getAllUsers } = require("./index");

// async function testDB() {
//   try {
//     //connect the client to the database
//     client.connect();

//     //queries are promises, so we can await them
//     const result = await client.query("SELECT * FROM users;");

//     //for now, logging is a fine way to see what's up
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     //it's important to close out the client connection
//     client.end();
//   }
// }

// testDB();

// async function testDB() {
//   try {
//     client.connect();

//     const users = await getAllUsers();
//     console.log(users);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     client.end;
//   }
// }

// testDB();

//this function should call a query which drops all tables from our database
async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query("DROP TABLE IF EXISTS users;");

    console.log("finished dropping tables!");
  } catch (error) {
    throw error; //we pass the error up to the function that calls dropTables
  }
}

//this function should call a query which creates all tables for our database
async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(`CREATE TABLE users (
        id SERIAL PRIMARY Key,
        username varchar(255) UNIQUE NOT null,
        password varchar(255) NOT NULL);`);

    console.log("Finished building tables");
  } catch (error) {
    throw error; //we pass the error up to the function that calls createTables
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    const users = await getAllUsers();
    console.log("getAllUsers:", users);

    console.log("Finished database tests!");
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
