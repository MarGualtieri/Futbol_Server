require('dotenv').config();
const connection = require("./connection");

const ObjectId = require("mongodb").ObjectId;

{/*-----------------GET ALL USERS---------------*/ }

async function getAllUsers() {
  const connectiondb = await connection.getConnection();
  const users = await connectiondb
    .db("parqueNorte")
    .collection("jugadores")
    .find()
    .toArray();
  return users;
}



{/*-----------------UPDATE USER---------------*/ }

async function updateUser(myUser) {
    const connectiondb = await connection.getConnection();
    const query = { _id: new ObjectId(myUser._id) };
    const newvalues = {
      $set: {
        name: myUser.name,
        language: myUser.language,
        age: myUser.age,
      },
    };
  
    const result = await connectiondb
      .db("parqueNorte")
      .collection("jugadores")
      .updateOne(query, newvalues);
  
    return result;
  }
  
  {/*-----------------ADD USER---------------*/ }
  
  async function addUser(user) {

    
    const connectiondb = await connection.getConnection();
  
  
    const userExists = await connectiondb
      .db("parqueNorte")
      .collection("jugadores")
      .findOne({ nombre: user.nombre });
      
    if (!userExists) {
      const result = await connectiondb
        .db("parqueNorte")
        .collection("jugadores")
              .insertOne({ ...user, _id: new ObjectId() });
              
              console.log(JSON.stringify(user));
        return result.ops[0];
  
    } else if (userExists)  {
  
      throw new Error("ERROR GARRAFAL EN DATA/USER");
    }
  
  }


  module.exports = {
    addUser,
    getAllUsers,
    updateUser,
  
  };
  