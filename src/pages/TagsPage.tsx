
import TagCloud from "../components/UI/TagCloud/TagCloud";
import ITagsRepository from "../domain/repository/tags/ITagsRepository";
import { useNavigate } from "react-router-dom";

interface Props {
    tagsRepository: ITagsRepository;
}

// todo: remove
const TagsPage = (props: Props) => {

    const navigate = useNavigate();

    return (
        <TagCloud tagsRepository={props.tagsRepository}
            onTagClick={
                (tag: string) => {
                    navigate("/bookmarks/" + tag)
                }}
            onClearTagsClick={
                () => {
                    navigate("/bookmarks")
                }
            } />
    )
}

export default TagsPage;