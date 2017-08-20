import React from 'react';
import App from '../src/components/App';
import renderer from 'react-test-renderer';

test('it should do something', () => {
  const component = renderer.create(
    <App></App>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});