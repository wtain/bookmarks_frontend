import renderer from 'react-test-renderer';
import Filter from './Filter';
import MockTagsRepository from '../../../domain/repository/tags/MockTagsRepository';
import { BrowserRouter } from 'react-router-dom';

it('Filter renders correctly', () => {
  const tagsRepository = new MockTagsRepository();

  const tree = renderer
    .create(
      <BrowserRouter>
        <Filter tagsRepository={tagsRepository} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});