import {findAllUsers, findUserById, create, update} from '../models/UserModel';
import {IncomingMessage, ServerResponse} from 'http';
import {getPostData} from "../utils";
import {IUser} from "../users";
import {validate} from 'uuid'

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

        if (validate(id) && !user) {
            res.writeHead(404, {"Content-Type":"application/json"});
            res.end(JSON.stringify({message: 'User not found'}))
        } else if (validate(id)) {
            res.writeHead(200, {"Content-Type":"application/json"});
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(400, {"Content-Type":"application/json"});
            res.end(JSON.stringify({message: 'Please enter correct id to identify user'}))
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
            if (username && age && hobbies && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
                res.writeHead(201, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify(newUser))
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({message: `Your request doesn't exist required fields (username, age, hobbies)`}))
            }
        }
    }
    catch (e) {
        console.log(e.message)
    }
}

export async function updateUser(req:IncomingMessage, res:ServerResponse, id:string) {
    try {
        const user = await findUserById(id);

        if (validate(id) && !user) {
            res.writeHead(404, {"Content-Type":"application/json"});
            res.end(JSON.stringify({message: 'User not found'}))
        } else if (validate(id)) {
            const requestBody = await getPostData(req);
            if (typeof requestBody === "string") {
                const {username, age, hobbies} = JSON.parse(JSON.parse(requestBody));

                const data:IUser = {
                    username: username,
                    age: age,
                    hobbies: hobbies
                };

                console.log(user)
                const newUser = await update(id, data);
                if (username && age && hobbies && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify(newUser))
                } else if (typeof username === 'string' || typeof age === 'number' || Array.isArray(hobbies)) {
                    res.writeHead(400, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({message: `Your request data doesn't valid (username is string, age is number, hobbies is array)`}))
                } else {
                    res.writeHead(400, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({message: `Your request doesn't exist required fields (username, age, hobbies)`}))
                }
            }
        } else {
            res.writeHead(400, {"Content-Type":"application/json"});
            res.end(JSON.stringify({message: 'Please enter correct id to identify user'}))
        }
    }
    catch (e) {
        console.log(e.message)
    }
}