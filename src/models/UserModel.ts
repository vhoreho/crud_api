import { Users } from '../users';

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