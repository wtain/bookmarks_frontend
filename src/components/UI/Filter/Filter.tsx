
import ITagsRepository from "../../../domain/repository/tags/ITagsRepository";
import TagCloud from "../TagCloud/TagCloud";


interface Props {
  tagsRepository: ITagsRepository;
}

const Filter = (props: Props) => {
  return (
    <TagCloud tagsRepository={props.tagsRepository} />
    // todo: Filter closed
  )
}

export default Filter;