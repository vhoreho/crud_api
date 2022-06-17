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
exports.createUser = exports.getUser = exports.getUsers = void 0;
const UserModel_1 = require("../models/UserModel");
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, UserModel_1.findAllUsers)();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(users));
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
exports.getUsers = getUsers;
function getUser(req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, UserModel_1.findUserById)(id);
            if ((0, uuid_1.validate)(id) && !user) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
            else if ((0, uuid_1.validate)(id)) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: 'Please enter correct id to identify user' }));
            }
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield (0, utils_1.getPostData)(req);
            if (typeof body === "string") {
                const { username, age, hobbies } = JSON.parse(JSON.parse(body));
                const user = {
                    username,
                    age,
                    hobbies
                };
                const newUser = yield (0, UserModel_1.create)(user);
                if (username && age && hobbies) {
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify(newUser));
                }
                else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `Your request doesn't exist required fields (username, age, hobbies)` }));
                }
            }
        }
        catch (e) {
            console.log(e.message);
        }
    });
}
exports.createUser = createUser;
