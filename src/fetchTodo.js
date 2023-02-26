const AWS = require("aws-sdk");

const fetchTodo = async (event) => {
    const db = new AWS.DynamoDB.DocumentClient()
    const id = event.pathParameters.id;

    let todo;

    try {
        const result = await db.get({
            TableName: "TodoTable",
            Key: {id}
        }).promise()
        todo = result.Item;
    }catch (e) {
        console.log(e)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(todo)
    }
};

module.exports = {
    handler: fetchTodo
}
