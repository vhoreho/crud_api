import {findAllUsers, findUserById} from '../models/UserModel';
import {IncomingMessage, ServerResponse} from 'http';

export async function getUsers (req:IncomingMessage,res:ServerResponse) {
    try {
        const users = await findAllUsers();

        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(users));
    }
    catch (e) {
        console.log(e.message)
    }
}

export async function getUser(req:IncomingMessage,res:ServerResponse,id:string) {
    try {
        const user = await findUserById(id);

        if (!user) {
            res.writeHead(404, {"Content-Type":"application/json"});
            res.end(JSON.stringify({message: 'User not found'}))
        } else {
            res.writeHead(200, {"Content-Type":"application/json"});
            res.end(JSON.stringify(user));
        }

    }
    catch (e) {
        console.log(e.message)
    }
}