const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getNoteById(noteId: string) {
  const params = {
    TableName: process.env.NOTES_TABLE,
    key: {
      id: noteId,
    },
  };

  try {
    const { Item } = await docClient.get(params).promise();
    return Item;
  } catch (err) {
    console.log("DynamoDB error: ", err);
  }
}

export { getNoteById };
