export interface IUser {
    id?: string,
    username: string,
    age: number,
    hobbies: string[]
}

export const Users:IUser[] = [
    {
        id: '1hds2',
        username: 'Michael',
        age: 23,
        hobbies: ['football', 'hockey']
    },
    {
        id: '16',
        username: 'Vlad',
        age: 33,
        hobbies: ['football', 'hockey']
    }
]