import renderer from 'react-test-renderer';
import TagDto from '../../../domain/dto/TagDto';
import TagsEditor from './TagsEditor';

it('TagsEditor renders correctly', () => {

  const tags: TagDto[] = [
    {
      name: "tag1",
      id: "tag1-id"
    },
    {
      name: "tag2",
      id: "tag2-id"
    },
    {
      name: "tag3",
      id: "tag3-id"
    }
  ]

  const tree = renderer
    .create(
      <TagsEditor tags={tags} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});