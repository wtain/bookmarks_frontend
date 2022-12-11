import IAuthService from "./IAuthService";

class AuthServiceMock implements IAuthService {

    public constructor(private isUserLoggedIn: boolean) {
        
    }

    public async login(username: string, password: string): Promise<string> {
        return "";
    }

    public isLoggedIn(): boolean {
        return this.isUserLoggedIn;
    }

    public getSessionToken(): string | null {
        return "";
    }

    public getUserName(): string | null {
        return "";
    }

    public async logout(): Promise<void> {
        
    }

    public async register(fullName: string, username: string, password1: string, password2: string): Promise<boolean> {
        return true;
    }

}

export default AuthServiceMock;