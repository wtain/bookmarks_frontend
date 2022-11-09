
import ITagsRepository from "../../../domain/repository/tags/ITagsRepository";
import TagCloud from "../TagCloud/TagCloud";
import { useNavigate } from "react-router-dom";

interface Props {
  tagsRepository: ITagsRepository;
}

const Filter = (props: Props) => {
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
      }/>
    // todo: Filter closed
  )
}

export default Filter;