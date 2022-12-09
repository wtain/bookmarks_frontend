import UserDto from "../../../domain/dto/UserDto";

interface Props {
    user: UserDto;
}

const User = (props: Props) => {
    return (
        <div>
            <h3>{props.user.name}</h3><br />
            {
                props.user.roles.map(role => <div>{role}</div>)
            }
        </div>
    )
}

export default User;