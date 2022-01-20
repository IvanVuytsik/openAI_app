import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from "dotenv";

dotenv.config();
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, "BaseLayer", {
      code: lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_9],
    });

    const apiLambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9, 
      code: lambda.Code.fromAsset("../app/"),
      handler: "ai_app_api.handler",
      layers: [layer],
      environment: {
        KEY: process.env.KEY ?? "",
      },
    });
    // api gateway 
    const aiAppApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName: "AI APP API", 
    });
    aiAppApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apiLambda),
    });
  }
}
