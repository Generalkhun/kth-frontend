// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ClientTokenResponse, WebPubSubServiceClient } from '@azure/web-pubsub'
import { v4 as uuidv4 } from 'uuid';

type Data = {
    token: ClientTokenResponse
}

/**@note read https://docs.microsoft.com/en-us/azure/azure-web-pubsub/reference-server-sdk-js */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const serviceClient = new WebPubSubServiceClient(process.env.AZURE_PUBSUB_CONNECTION_STRING, process.env.AZURE_PUBSUB_HUBNAME);
    /** @Example */
    // const serviceClient = new WebPubSubServiceClient(
    //     'Endpoint=https://kth-service.webpubsub.azure.com;AccessKey=mFT6FVV3N+cHOWfYy6azQbRMLj8IjgB1uTwDoUw3rp8=;Version=1.0;',
    //     'KTH',
    // );

    // Get the access token for the WebSocket client connection to use
    let token = await serviceClient.getClientAccessToken();

    // Or get the access token and assign the client a userId
    token = await serviceClient.getClientAccessToken({ userId: uuidv4() });

    // return the token to the WebSocket client
    res.status(200).json({ token });
}
