import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CalendarPage from './CalendarPage';

it('CalendarPage renders correctly', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <CalendarPage />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});