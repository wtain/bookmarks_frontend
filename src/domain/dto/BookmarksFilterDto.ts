
// Copied from server
interface BookmarksFilterDto {
  summary: string | null | undefined;
  description: string | null | undefined;
  created_from: Date | null | undefined;
  created_to: Date | null | undefined;
  is_done: boolean | null | undefined;
  tags: string[];
  tags_all: boolean | null | undefined;
  start: number | null | undefined;
  page_size: number | null | undefined;
}

export default BookmarksFilterDto;

export const EmptyFilter: BookmarksFilterDto = {
  summary: undefined,
  description: undefined,
  created_from: undefined,
  created_to: undefined,
  is_done: undefined,
  tags: [],
  tags_all: undefined,
  start: undefined,
  page_size: undefined
};