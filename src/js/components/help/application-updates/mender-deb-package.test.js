import React from 'react';
import renderer from 'react-test-renderer';
import DebPackage from './mender-deb-package';

it('renders correctly', () => {
  const tree = renderer.create(<DebPackage />).toJSON();
  expect(tree).toMatchSnapshot();
});
