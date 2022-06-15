import {IUser, Users} from '../users';
import {v4} from "uuid";

export function findAllUsers () {
    return new Promise((resolve) => {
        resolve(Users)
    })
}

export function findUserById(id:string) {
    return new Promise(resolve => {
        const user = Users.find(item => item.id === id);
        resolve(user);
    })
}
export function create(user:IUser) {
    return new Promise(resolve => {
        const newUser = {id:v4(), ...user};
        Users.push(newUser);
        resolve(newUser);
    })
}