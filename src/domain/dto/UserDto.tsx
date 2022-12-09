import EntityDto from "./EntityDto";

interface UserDto extends EntityDto {
    // Server-side
    // passwordHash: string;
    // sessionIds: string[];
    password1: string;
    password2: string;
    roles: string[];
}

export default UserDto;