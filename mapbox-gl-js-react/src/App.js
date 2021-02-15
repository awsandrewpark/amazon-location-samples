import Amplify, { Auth } from 'aws-amplify';
import Location from "aws-sdk/clients/location";
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const createClient = async () => {
    const credentials = await Auth.currentCredentials();
    const client = new Location({
        credentials,
        region: awsconfig.aws_project_region,
   });
   console.log(client)
   return client;
}

// const myclient = createClient();