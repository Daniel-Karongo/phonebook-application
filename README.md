This project is built using angular for the frontend, express js for the backend and mysql for the database.
I, however, have, for now, been unable to deploy all the three components on vercel and have have them run there.
As such here is the source code for the same and the way to run this is as follows:

- run mysql on your machine and obtain the database user and password for you mmachine.
- create the database and table and populate the same with the queries in the "contacts.sql" file.
- Modify the "server.js" file with the credentials specific to your machine.
- cd into the serverside, run "node server.js" to start the backend server.
- open another terminal and serve the angular project. You will have to run "npm install" first before serving using "ng serve".
- open the UI on "http://localhost:4200".
