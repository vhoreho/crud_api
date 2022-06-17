export interface IUser {
    id?: string,
    username: string | unknown,
    age: number | unknown,
    hobbies: string[] | unknown[];
}

export const Users:IUser[] = []