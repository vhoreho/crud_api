"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findUserById = exports.findAllUsers = void 0;
const users_1 = require("../users");
const uuid_1 = require("uuid");
function findAllUsers() {
    return new Promise((resolve) => {
        resolve(users_1.Users);
    });
}
exports.findAllUsers = findAllUsers;
function findUserById(id) {
    return new Promise(resolve => {
        const user = users_1.Users.find(item => item.id === id);
        resolve(user);
    });
}
exports.findUserById = findUserById;
function create(user) {
    return new Promise(resolve => {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, user);
        users_1.Users.push(newUser);
        resolve(newUser);
    });
}
exports.create = create;
