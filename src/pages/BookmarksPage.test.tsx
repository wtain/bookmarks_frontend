import renderer from 'react-test-renderer';
import BookmarksPage from './BookmarksPage';
import MockBookmarksRepository from '../domain/repository/bookmarks/MockBookmarksRepository';
import MockTagsRepository from '../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('BookmarksPage renders correctly', () => {
  const bookmarksRepository = new MockBookmarksRepository();
  const tagsRepository = new MockTagsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <BookmarksPage bookmarksRepository={bookmarksRepository} tagsRepository={tagsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});