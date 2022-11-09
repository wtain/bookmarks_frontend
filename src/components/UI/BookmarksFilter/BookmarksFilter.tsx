
import { useState, useEffect } from 'react';
import ITagsRepository from "../../../domain/repository/tags/ITagsRepository";
import TagCloud from "../TagCloud/TagCloud";
import BookmarksFilterDto from '../../../domain/dto/BookmarksFilterDto';
import { EmptyFilter } from '../../../domain/dto/BookmarksFilterDto';


interface Props {
  tagsRepository: ITagsRepository;
  onFilterChanged?: (filter: BookmarksFilterDto) => void;
}

// Copy of Filter
const BookmarksFilter = (props: Props) => {

  const [summary, setSummary] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tags, setTags] = useState<string[]>([]);

  // todo: TextFilter with different filter kinds + context hints, e.g. is:Open, is:Closed

  const createFilter = () => {
    return {
      ...EmptyFilter,
      tags_all: true,
      tags: tags
    };
  }

  const updateFilter = () => {
    if (props.onFilterChanged) {
      props.onFilterChanged!(createFilter());
    }
  }

  useEffect(() => {
    updateFilter();
  }, [tags]);

  return (
    <TagCloud tagsRepository={props.tagsRepository}
      onTagSelected={(tag: string) => {
        setTags([...tags, tag]);
      }}
      onTagDeSelected={(tag: string) => {
        setTags(tags.filter(v => v !== tag));
      }}
      onClearTagsClick={() => {
        setTags([]);
      }}
    />
    // todo: Filter closed
  )
}

export default BookmarksFilter;