import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';

export class AppsyncNextPlaygroundBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-notes-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        }
      },
      xrayEnabled: true
    })

    new cdk.CfnOutput(this,'GraphQLAPIKey',{
      value: api.apiKey || ''
    })

    new cdk.CfnOutput(this,'Stack Region',{
      value: this.region
    })
  }
}
