import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

export class AppsyncNextPlaygroundBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, "Api", {
      name: "cdk-notes-appsync-api",
      schema: appsync.Schema.fromAsset("graphql/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region,
    });

    const notesLambda = new lambda.Function(this, "AppSyncNotesHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset("lambda-fns"),
      memorySize: 1024,
    });

    const lambdaDs = api.addLambdaDataSource("lambdaDatasource", notesLambda);

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getNoteById",
    });

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listNotes",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createNote",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteNote",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateNote",
    });

    const notesTable = new dynamodb.Table(this, "CDKNotesTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    notesTable.grantFullAccess(notesLambda);

    notesLambda.addEnvironment("NOTES_TABLE", notesTable.tableName);
  }
}
