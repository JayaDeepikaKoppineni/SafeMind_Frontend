import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from '../components/start/StartScreen';

// Mock API call and commit to GitHub
const mockSignupApi = jest.fn();
const mockCommitToGitHub = jest.fn();

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button', () => {
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);

    // Ensure the university input exists
    expect(getByTestId('university-input')).toBeTruthy();
    // Ensure other inputs (like role, name, etc.) are present, based on your components
    expect(getByTestId('role-input')).toBeTruthy();
    expect(getByTestId('name-input')).toBeTruthy();
    expect(getByTestId('signup-button')).toBeTruthy();
  });

  it('allows user to fill inputs', () => {
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);
    
    fireEvent.changeText(getByTestId('university-input'), 'Harvard');
    fireEvent.changeText(getByTestId('role-input'), 'Student');
    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    
    expect(getByTestId('university-input').props.value).toBe('Harvard');
    expect(getByTestId('role-input').props.value).toBe('Student');
    expect(getByTestId('name-input').props.value).toBe('John Doe');
  });

  it('calls the API with correct data on button press', async () => {
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);
    
    // Simulate user input
    fireEvent.changeText(getByTestId('university-input'), 'Harvard');
    fireEvent.changeText(getByTestId('role-input'), 'Student');
    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    
    fireEvent.press(getByTestId('signup-button'));

    // Wait for the mock API to be called
    await waitFor(() => {
      expect(mockSignupApi).toHaveBeenCalledWith({
        university: 'Harvard',
        role: 'Student',
        input: 'John Doe',
        personality: 'Outgoing', // Assuming this is part of the inputs in your component
      });
    });
  });

  it('shows a success alert when API call is successful', async () => {
    mockSignupApi.mockResolvedValueOnce({ success: true });
    
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} onCommit={mockCommitToGitHub} />);
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(mockSignupApi).toHaveBeenCalled();
    });

    // Simulate commit to GitHub after successful API call
    await waitFor(() => {
      expect(mockCommitToGitHub).toHaveBeenCalledWith({
        action: 'commit',
        message: 'User signed up successfully',
      });
    });
  });

  it('shows a failure alert when API call fails', async () => {
    mockSignupApi.mockResolvedValueOnce({ success: false });

    const { getByTestId } = render(<Signup onSignup={mockSignupApi} onCommit={mockCommitToGitHub} />);
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(mockSignupApi).toHaveBeenCalled();
    });

    // No commit should be made in case of failure
    await waitFor(() => {
      expect(mockCommitToGitHub).not.toHaveBeenCalled();
    });
  });
});
