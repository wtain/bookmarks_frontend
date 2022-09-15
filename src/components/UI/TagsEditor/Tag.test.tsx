import renderer from 'react-test-renderer';
import Tag from './Tag';

it('Tag renders correctly', () => {
  const tag = {
    name: "tag1",
    id: "some-id"
  };

  const tree = renderer
    .create(
      <Tag tag={tag} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});