import { UserDecoded } from "../../../context/loginContext";
import jwt_decode, { jwtDecode } from "jwt-decode";


export function decodeUserJwt(name: string) {
    const jwt = sessionStorage.getItem(name || "");
    const json = jwt ? JSON.parse(jwt) : "";
    const { data } = json;
    let user: UserDecoded = {
        email: "",
        firstname: "",
        lastname: "",
        id: 0,
        isAdmin: false,
        address: ""
    };

    try {
        user = jwtDecode(data?.token);
    } catch (error) {
        console.log(error);
    }
    return user;
}
export function jsonFromJwt(name: string) {
    const jwt = sessionStorage.getItem(name || "");
    const json = jwt ? JSON.parse(jwt) : "";
    return json;
}
