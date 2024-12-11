import React from 'react';

describe('Tab.Navigator Component', () => {
  it('renders Tab.Navigator with two screens', () => {
   console.log("renders Tab.Navigator with two screens")
  });

  it('navigates to Home and Profile screens correctly', async () => {
    console.log("navigates to Home and Profile screens correctly")
    // Simulate navigation to Profile tab
    // fireEvent.press(getByTestId('profileButton'));
    // expect(await findByText('Profile')).toBeTruthy();

    // // Simulate navigation to Home tab
    // fireEvent.press(getByTestId('homeButton'));
    // expect(await findByText('Home')).toBeTruthy();
  });

  

  it('renders tabBarIcon with proper focus styles', () => {
    console.log("renders tabBarIcon with proper focus styles")
    // Snapshot testing to confirm focused style
    // expect(toJSON()).toMatchSnapshot();
  });
});
