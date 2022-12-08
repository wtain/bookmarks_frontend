import EntityDto from "./EntityDto";

interface UserDto extends EntityDto {
    passwordHash: string;
    sessionIds: string[];
    roles: string[];
}

export default UserDto;