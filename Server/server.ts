import express from "express";
import cors from "cors";
import { DataSource } from "typeorm"
import "reflect-metadata";


import { User } from "./entity/User"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "viaduct.proxy.rlwy.net",      // Hostname only
  port: 40611,                         // Port number
  username: "postgres",                // Database username
  password: "kTdVwIWuntjAPSHwnegcMkGJsMdYyfxv", // Database password
  database: "railway",                 // Database name
  entities: [User],                    // Entities (your models)
  synchronize: true,                   // Whether to synchronize the schema
  logging: false,                      // Logging setting
});

// Get All Users
const getUsers = async() => {
  const users =await  AppDataSource.manager.find(User);
  console.log(users)
  return users



};
// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database

// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
      

      
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))






const corsOptions = {
  origin: (["http://localhost:5173"]),
};
const app = express();
app.use(cors(corsOptions));

app.get('/api',async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});