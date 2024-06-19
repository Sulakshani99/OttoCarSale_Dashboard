import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('handles sign in with valid data', async () => {
    const axios = require('axios');
    const axiosPostMock = jest.fn(() => Promise.resolve({ status: 200, data: { token: 'mockToken', user: { _id: 'mockUserId' } } }));
    axios.post = axiosPostMock;

    const { getByPlaceholderText, getByText } = render(<Login />);
    
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
    
    fireEvent.click(getByText('Log in'));
    
    await waitFor(() => expect(axiosPostMock).toHaveBeenCalled());
    // Add more assertions as needed
  });

  it('handles sign up with valid data', async () => {
    const axios = require('axios');
    const axiosPostMock = jest.fn(() => Promise.resolve({ status: 201, data: { message: 'User registered successfully' } }));
    axios.post = axiosPostMock;

    const { getByPlaceholderText, getByText, getByLabelText } = render(<Login />);
    
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
    
    // Simulate file upload
    const file = new File(['mockImage'], 'profile.jpg', { type: 'image/jpeg' });
    fireEvent.change(getByLabelText('Upload Profile Picture'), { target: { files: [file] } });
    
    fireEvent.click(getByText('Register'));
    
    await waitFor(() => expect(axiosPostMock).toHaveBeenCalled());
    // Add more assertions as needed
  });
});
