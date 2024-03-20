import { ReactNode, createContext, useEffect, useState } from "react";
import { decodeUserJwt } from "../assets/sass/global/user_decoded";


export interface UserDecoded {
    email: string;
    firstname: string;
    lastname: string;
    id: number;
    isAdmin: boolean;
    address: string;
}
export type LoginContextType = {
    user: UserDecoded | null;
    setUser: React.Dispatch<React.SetStateAction<UserDecoded | null>>;
}

export type Props = { children: ReactNode };

export const LoginContext = createContext<LoginContextType>({
    user: decodeUserJwt("jwtData"),
    setUser: () => { },
});

export const LoginProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserDecoded | null>(
        decodeUserJwt("jwtData")
    );

    useEffect(() => { }, [user]);
    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};