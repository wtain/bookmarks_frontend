import renderer from 'react-test-renderer';
import BookmarkForm from './BookmarkForm';

function run_test(visibility: boolean) {
  const tree = renderer
  .create(
    <BookmarkForm visibility={visibility}  />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
}

it('CalendarPage renders correctly visible', () => {
  run_test(true)
});

it('CalendarPage renders correctly hidden', () => {
  run_test(false)
});