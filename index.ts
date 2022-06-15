import {createServer} from 'http';
import {getUsers, getUser} from './src/controller/UserController';

const PORT = process.env.PORT || 3000;
process.setMaxListeners(0);

const server = createServer(async (req, res) => {
    if (req.url === '/users' && req.method === 'GET') {
        await getUsers(req,res)
    } else if (req.url.match(/\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2];

        await getUser(req,res,id);
    } else {
        res.writeHead(404, {"Content-Type":"application/json"});
        res.end(JSON.stringify({message: 'Route not found'}))
    }
})

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

