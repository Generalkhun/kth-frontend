import axios from "axios"
import { AZURE_PUBSUB_TOKEN_GENERATOR_ENDPOINT } from "../src/config/url"

export const getWsConnectionToken = async () => {
    const res = await axios({
        method: 'get',
        url: AZURE_PUBSUB_TOKEN_GENERATOR_ENDPOINT
    })
    return res.data
}