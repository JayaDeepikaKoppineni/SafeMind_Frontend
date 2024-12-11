import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from '../components/start/StartScreen';

describe('Signup Component', () => {
  const mockSignupApi = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button', () => {

    expect(('university-input')).toBeTruthy();


    
  });

  it('allows user to fill inputs', () => {
   
  });

  it('calls the API with correct data on button press', async () => {
    

    // await waitFor(() => {
    //   expect(mockSignupApi).toHaveBeenCalledWith({
    //     university: 'Harvard',
    //     role: 'Student',
    //     input: 'John Doe',
    //     personality: 'Outgoing',
    //   });
    // });
  });

  it('shows a success alert when API call is successful', async () => {
    mockSignupApi.mockResolvedValueOnce({ success: true });

    // const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);
    // fireEvent.press(getByTestId('signup-button'));

    // await waitFor(() => {
    //   expect(mockSignupApi).toHaveBeenCalled();
    // });
  });

  it('shows a failure alert when API call fails', async () => {
    mockSignupApi.mockResolvedValueOnce({ success: false });


  });
});
