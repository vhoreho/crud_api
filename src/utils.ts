import {IncomingMessage} from "http";

export async function getPostData(req:IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk: string) => {
                body += chunk.toString();
            })
            req.on('end', () => {
                resolve(JSON.stringify(body))
            })
        }
        catch (e) {
            reject(e)
        }
    })
}