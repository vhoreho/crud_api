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
        try {
            const newUser:IUser = {id:v4(), ...user};
            Users.push(newUser);
            resolve(newUser);
        }
        catch (e) {
            console.log(e.message)
        }
    })
}

export function update(id: string, data:IUser) {
    return new Promise(resolve => {
        const userIndex = Users.findIndex(item => item.id === id);
        Users[userIndex] = {id, ...data}
        resolve(Users[userIndex]);
    })
}