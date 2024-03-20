import { createContext, useEffect, useState } from "react";
import getAxiosInstance from "../axios-service";


export interface User {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface UsersType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserContext = createContext<any>({
    users: [],
    setUsers: () => { },
})

export const UserProvider = (props: any) => {
    const [users, setUsers] = useState<User[]>([]);

    async function getUsers() {
        const { data } = await getAxiosInstance().get("/user");
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, [])
    return (
        <UserContext.Provider value={{ users, setUsers, getUsers }}>
            {props.children}
        </UserContext.Provider>
    );
}