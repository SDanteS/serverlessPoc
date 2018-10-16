const AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid/v4");

module.exports.run = async event => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "todos",
    Item: {
      id: uuid(),
      text: data.text,
      checked: false
    }
  };

  try {
    await client.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
