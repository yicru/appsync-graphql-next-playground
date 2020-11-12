import { Note } from "./Note";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};

async function updateNote(note: Note) {
  const params: Params = {
    TableName: process.env.NOTES_TABLE,
    Key: {
      id: note.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW",
  };

  let prefix = "set ";

  (Object.keys(note) as (keyof Note)[]).forEach((key) => {
    if (key === "id") return;
    params["UpdateExpression"] += prefix + "#" + key + " = :" + key;
    params["ExpressionAttributeValues"][":" + key] = note[key];
    params["ExpressionAttributeNames"]["#" + key] = key;
    prefix = ", ";
  });

  console.log("params: ", params);

  try {
    await docClient.update(params).promise();
    return note;
  } catch (err) {
    console.log("DynamoDB error: ", err);
    return null;
  }
}

export { updateNote };
