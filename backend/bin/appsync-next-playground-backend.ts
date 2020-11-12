#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppsyncNextPlaygroundBackendStack } from '../lib/appsync-next-playground-backend-stack';

const app = new cdk.App();
new AppsyncNextPlaygroundBackendStack(app, 'AppsyncNextPlaygroundBackendStack');
