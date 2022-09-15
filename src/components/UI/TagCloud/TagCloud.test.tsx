import renderer from 'react-test-renderer';
import MockTagsRepository from '../../../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';
import TagCloud from './TagCloud';

it('TagCloud renders correctly', () => {
  const tagsRepository = new MockTagsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <TagCloud tagsRepository={tagsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});