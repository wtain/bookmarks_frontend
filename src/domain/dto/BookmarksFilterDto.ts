
// Copied from server
interface BookmarksFilterDto {
  summary: string | null;
  description: string | null;
  created_from: Date | null;
  created_to: Date | null;
  is_done: boolean | null;
  tags: string[];
  tags_all: boolean | null;
  start: number | null;
  page_size: number | null;
}

export default BookmarksFilterDto;

export const EmptyFilter: BookmarksFilterDto = {
  summary: null,
  description: null,
  created_from: null,
  created_to: null,
  is_done: null,
  tags: [],
  tags_all: null,
  start: null,
  page_size: null
};