import renderer from 'react-test-renderer';
import MockBookmarksRepository from '../domain/repository/bookmarks/MockBookmarksRepository';
import { BrowserRouter } from 'react-router-dom';
import BookmarkPage from './BookmarkPage';
import MockCommentsRepository from '../domain/repository/comments/MockCommentsRepository';

it('BookmarkPage renders correctly', () => {
  const bookmarksRepository = new MockBookmarksRepository();
  const commentsRepository = new MockCommentsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <BookmarkPage bookmarksRepository={bookmarksRepository} commentsRepository={commentsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});