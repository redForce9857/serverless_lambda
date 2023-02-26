const {v4} = require("uuid");
const AWS = require("aws-sdk");

const addTodo = async (event) => {
    const db = new AWS.DynamoDB.DocumentClient()

    const {todo} = JSON.parse(event.body);
    const createdAt = new Date().toISOString()
    const id = v4()

    console.log("This is an id", id)

    const newTodo = {
        id,
        todo,
        createdAt,
        completed: false
    }

    await db.put({
        TableName: "TodoTable",
        Item: newTodo
    }).promise()

    return  {
        statusCode: 201,
        body: JSON.stringify(newTodo)
    }
};

module.exports = {
    handler: addTodo
}
