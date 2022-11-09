import BookmarkDto from './BookmarkDto';

interface FilterResultDto {
  bookmarks: BookmarkDto[];
  count: number;
}

export default FilterResultDto;