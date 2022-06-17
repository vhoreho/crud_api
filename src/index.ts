import {createServer} from 'http';
import {getUsers, getUser, createUser, updateUser} from './controller/UserController';
import {config} from 'dotenv';

config();

const PORT = process.env.PORT || 3000;
process.setMaxListeners(0);

const server = createServer(async (req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        await getUsers(req,res)
    } else if (req.url.match(/\/users\/(\d+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2];

        await getUser(req,res,id);
    } else if (req.url === '/users' && req.method === 'POST') {
        await createUser(req, res);
    } else if (req.url.match(/\/users\/(\d+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[2];

        await updateUser(req,res, id);
    } else {
        res.writeHead(404, {"Content-Type":"application/json"});
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

