import { handleCreateGroup } from '../utils/createGroupApi';
import EncryptedStorage from 'react-native-encrypted-storage';

jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn(),
}));

global.fetch = jest.fn();

describe('handleCreateGroup', () => {
  const mockDate = new Date(2024, 10, 24, 10, 30); // Nov 24, 2024, 10:30 AM
  const createGroupUrl = 'https://gymvibe.hemolink.in:8000/createGroup';

  beforeEach(() => {


    
    jest.clearAllMocks();
  });

  it('throws an error if required fields are missing', async () => {
    await expect(
      handleCreateGroup({ groupname: '', groupDescription: '', date: null, createGroup: createGroupUrl })
    ).rejects.toThrow('Please Enter details');
  });

  it('throws an error if session is not found', async () => {
    EncryptedStorage.getItem.mockResolvedValue(null);

    await expect(
      handleCreateGroup({ groupname: 'Test Group', groupDescription: 'Description', date: mockDate, createGroup: createGroupUrl })
    ).rejects.toThrow('Session not found');
  });

  it('creates a group successfully', async () => {
    EncryptedStorage.getItem.mockResolvedValue(
      JSON.stringify({
        data: JSON.stringify([{ name: 'John Doe', university: 'Harvard' }]),
        acesstoken: 'test-token',
      })
    );

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ success: true }),
    });

    const response = await handleCreateGroup({
      groupname: 'Test Group',
      groupDescription: 'Description',
      date: mockDate,
      createGroup: createGroupUrl,
    });

    expect(response).toEqual({ success: true, message: 'Successfully created Group' });
    expect(fetch).toHaveBeenCalledWith(createGroupUrl, expect.objectContaining({ method: 'POST' }));
  });

  it('handles API errors gracefully', async () => {
    EncryptedStorage.getItem.mockResolvedValue(
      JSON.stringify({
        data: JSON.stringify([{ name: 'John Doe', university: 'Harvard' }]),
        acesstoken: 'test-token',
      })
    );

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ success: false, Message: 'API Error' }),
    });

    await expect(
      handleCreateGroup({
        groupname: 'Test Group',
        groupDescription: 'Description',
        date: mockDate,
        createGroup: createGroupUrl,
      })
    ).rejects.toThrow('API Error');
  });

  it('handles network errors gracefully', async () => {
    EncryptedStorage.getItem.mockResolvedValue(
      JSON.stringify({
        data: JSON.stringify([{ name: 'John Doe', university: 'Harvard' }]),
        acesstoken: 'test-token',
      })
    );

    fetch.mockRejectedValueOnce(new Error('Network Error'));

    await expect(
      handleCreateGroup({
        groupname: 'Test Group',
        groupDescription: 'Description',
        date: mockDate,
        createGroup: createGroupUrl,
      })
    ).rejects.toThrow('Please Try again');
  });
});
