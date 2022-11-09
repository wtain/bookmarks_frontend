import renderer from 'react-test-renderer';
import MockBookmarksRepository from '../domain/repository/bookmarks/MockBookmarksRepository';
import MockTagsRepository from '../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import BookmarksViewPage from './BookmarksViewPage';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('BookmarksViewPage renders correctly', () => {
  const bookmarksRepository = new MockBookmarksRepository();
  const tagsRepository = new MockTagsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <BookmarksViewPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});