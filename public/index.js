"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const UserController_1 = require("./controller/UserController");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
process.setMaxListeners(0);
const server = (0, http_1.createServer)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url === '/users' && req.method === 'GET') {
        yield (0, UserController_1.getUsers)(req, res);
    }
    else if (req.url.match(/\/users\/(\d+)/) && req.method === 'GET') {
        const id = req.url.split('/')[2];
        yield (0, UserController_1.getUser)(req, res, id);
    }
    else if (req.url === '/users' && req.method === 'POST') {
        yield (0, UserController_1.createUser)(req, res);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
}));
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
