import renderer from 'react-test-renderer';
import CalendarPage from './CalendarPage';

it('CalendarPage renders correctly', () => {
  const tree = renderer
    .create(
      <CalendarPage />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});