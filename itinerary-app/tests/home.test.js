import React from 'react';
import renderer from 'react-test-renderer';

import HomeScreen from '../app/(tabs)/index';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
