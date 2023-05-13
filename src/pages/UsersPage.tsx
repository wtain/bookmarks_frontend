import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/UI/Loading/Loading";
import User from "../components/UI/User/User";
import UserDto from "../domain/dto/UserDto";
import BaseEntityRepository from "../domain/repository/BaseEntityRepository";

// Todo: Page could also be templated

interface Props {
    usersRepository: BaseEntityRepository<UserDto>
}

const UsersPage = (props: Props) => {

    const { id } = useParams();

    // const [newUserId, setNewUserId] = useState<string | undefined>("");

    const [users, setUsers] = useState<UserDto[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const getData = async (): Promise<UserDto[]> => {
        if (id) {
            return [await props.usersRepository.get(id)];
        }
        
        return await props.usersRepository.list();
    }

    const loadBookmarks = async (success: (users: UserDto[]) => void, error: (e: any) => void) => {
        try {
            const users = await getData();
            success(users)
        } catch (e) {
            error(e)
        }
    }

    useEffect(() => {
        setLoading(true);
        loadBookmarks((users: UserDto[]) => {
            setUsers(users)
            setLoading(false);
        }, 
            (e) => {
                setLoading(false);
            })
    }, [id])

    const doUpdatePoll = async () => {
        const users = await getData();
        setUsers(users);
    }

    useEffect(() => {
        const interval = setInterval(() => doUpdatePoll(), 20 * 1000);
        return () => clearInterval(interval);
    }, [id]);

    if (loading) {
        return (<Loading /> )
    }

    return (
        <div>
            {users.map(user => <User user={user} />)}
        </div>    
    )
}

export default UsersPage;