import axios from 'axios'
import { TAGS_ENDPOINT_GET_ALL } from "../../../constants/backend";
import ITagsRepository from "./ITagsRepository";

interface Result {
    tags: string[];
}

class RemoteTagsBookmarksRepository implements ITagsRepository {
    async getTags(): Promise<string[]> {
        return axios.get<Result[]>(TAGS_ENDPOINT_GET_ALL)
            .then((response) => response.data[0].tags);
    }
}

export default RemoteTagsBookmarksRepository;