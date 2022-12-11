
interface IAuthService {
    
    login: (username: string, password: string) => Promise<string>;

    isLoggedIn: () => boolean;

    getSessionToken(): string | null;

    getUserName(): string | null;

    logout(): Promise<void>;

    register(fullName: string, username: string, password1: string, password2: string): Promise<boolean>;
}

export default IAuthService;