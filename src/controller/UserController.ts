import {findAllUsers, findUserById, create} from '../models/UserModel';
import {IncomingMessage, ServerResponse} from 'http';
import {getPostData} from "../utils";
import {IUser} from "../users";

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

export async function createUser(req:IncomingMessage,res:ServerResponse) {
    try {
        const body = await getPostData(req);

        if (typeof body === "string") {
            const {username, age, hobbies} = JSON.parse(JSON.parse(body));
            const user:IUser = {
                username,
                age,
                hobbies
            }
            const newUser = await create(user);

            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newUser))
        }

    }
    catch (e) {
        console.log(e.message)
    }
}