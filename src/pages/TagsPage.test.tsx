import renderer from 'react-test-renderer';
import MockTagsRepository from '../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import TagsPage from './TagsPage';

it('TagsPage renders correctly', () => {
  const tagsRepository = new MockTagsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <TagsPage tagsRepository={tagsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});