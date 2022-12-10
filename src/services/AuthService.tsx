import axios from "axios";
import { AUTHENTICATION_ENDPOINT_LOGIN, AUTHENTICATION_ENDPOINT_LOGOUT, AUTHENTICATION_ENDPOINT_REGISTER } from "../constants/backend";

class AuthService {

    public async login(username: string, password: string): Promise<string> {
        return await axios
            .post(AUTHENTICATION_ENDPOINT_LOGIN, {
                username, 
                password
            })
            .then(response => {
                if (response.data) {
                    localStorage.setItem("sessionId", response.data);
                    localStorage.setItem("userName", username);
                }
                return response.data;
            })
    }

    public isLoggedIn(): boolean {
        const sessionToken = this.getSessionToken();
        return sessionToken !== null && sessionToken !== undefined;
    }

    public getSessionToken() {
        return localStorage.getItem("sessionId");
    }

    public getUserName() {
        return localStorage.getItem("userName");
    }

    public async logout(): Promise<void> {
        await axios
            .get(AUTHENTICATION_ENDPOINT_LOGOUT + `?sessionToken=${this.getSessionToken()}&userName=${this.getUserName()}`);
    }

    public async register(fullName: string, username: string, password1: string, password2: string): Promise<boolean> {
        const password = password1;
        if (password !== password2) {
            return false;
        }
        return await axios
            .post(AUTHENTICATION_ENDPOINT_REGISTER, {
                fullName,
                username,
                password
            })
            .then(response => response.status == 200)
    }
}

export default new AuthService;