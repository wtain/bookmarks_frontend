import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('renders correctly', () => {
//   const tree = renderer
//     .create(<Link page="http://www.facebook.com">Facebook</Link>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });