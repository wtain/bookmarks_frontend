import renderer from 'react-test-renderer';
import MockTagsRepository from '../../../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import BookmarksFilter from './BookmarksFilter';

it('BookmarksFilter renders correctly', () => {
  const tagsRepository = new MockTagsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <BookmarksFilter tagsRepository={tagsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});