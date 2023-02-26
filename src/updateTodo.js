const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const updateTodo = async (event) => {
    const { id, completed } = JSON.parse(event.body);

    const params = {
        TableName: 'TodoTable',
        Key: { id },
        UpdateExpression: 'set completed = :completed',
        ExpressionAttributeValues: { ':completed': completed },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const updatedTodo = await dynamodb.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(updatedTodo.Attributes)
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
};

module.exports = {
    handler: updateTodo
}
