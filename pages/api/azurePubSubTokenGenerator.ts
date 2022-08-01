// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ClientTokenResponse, WebPubSubServiceClient } from '@azure/web-pubsub'

type Data = {
    token: ClientTokenResponse
}

/**@note read https://docs.microsoft.com/en-us/azure/azure-web-pubsub/reference-server-sdk-js */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const serviceClient = new WebPubSubServiceClient(process.env.AZURE_PUBSUB_CONNECTION_STRING, process.env.AZURE_PUBSUB_HUBNAME);

    // Get the access token for the WebSocket client connection to use
    let token = await serviceClient.getClientAccessToken();

    // Or get the access token and assign the client a userId
    token = await serviceClient.getClientAccessToken({ userId: "user1" });

    // return the token to the WebSocket client
    res.status(200).json({ token });
}
