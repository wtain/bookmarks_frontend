import EntityDto from "./EntityDto";

interface RoleDto extends EntityDto {
    permissions: string[];
}

export default RoleDto;