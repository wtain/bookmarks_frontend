
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
  const [tags_all, setTagsAll] = useState<boolean>(true);
  const [openClose, setOpenClose] = useState(0);

  // todo: TextFilter with different filter kinds + context hints, e.g. is:Open, is:Closed

  const createFilter = () => {
    let filterObject = {
      ...EmptyFilter,
      tags_all: tags_all,
      tags: tags
    };
    if (openClose == 1) {
      filterObject = {
        ...filterObject,
        is_done: false
      }
    }
    else if (openClose == 2) {
      filterObject = {
        ...filterObject,
        is_done: true
      }
    }
    return filterObject;
  }

  const updateFilter = () => {
    if (props.onFilterChanged) {
      props.onFilterChanged!(createFilter());
    }
  }

  useEffect(() => {
    updateFilter();
  }, [tags, tags_all, openClose]);

  return (
    <>
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
      <input type="checkbox" checked={tags_all} onChange={(e) => {
        setTagsAll(e.target.checked);
      }} />All tags?
      <select value={openClose} onChange={(e) => {
        setOpenClose(parseInt(e.target.value));
      }}>
        <option value={0}>All</option>
        <option value={1}>Todo</option>
        <option value={2}>Done</option>
      </select>
    </>
  )
}

export default BookmarksFilter;