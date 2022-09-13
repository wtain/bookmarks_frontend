
import TagCloud from "../components/UI/TagCloud/TagCloud";
import ITagsRepository from "../domain/repository/tags/ITagsRepository";

interface Props {
    tagsRepository: ITagsRepository;
}

const TagsPage = (props: Props) => {

    return (
        <TagCloud tagsRepository={props.tagsRepository} />
    )
}

export default TagsPage;