import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import ForgetPassword from '../pages/ForgetPassword';

// Mock axios post function
jest.mock('axios');

describe('ForgetPassword Component', () => {
  test('renders email input and send link button', () => {
    render(<ForgetPassword />);
    
    // Check if email input is rendered
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

    // Check if send link button is rendered
    expect(screen.getByText('Send Link to Email')).toBeInTheDocument();
  });

  test('sends reset password link when send link button is clicked', async () => {
    // Mock successful response from axios post
    axios.post.mockResolvedValue({ status: 200 });

    render(<ForgetPassword />);
    
    // Fill in email input
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Click send link button
    fireEvent.click(screen.getByText('Send Link to Email'));

    // Wait for axios post to resolve
    await waitFor(() => {
      // Check if success message is displayed
      expect(screen.getByText('Password reset link sent successfully')).toBeInTheDocument();
    });

    // Check if axios post is called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/v1/user/forgot', { email: 'test@example.com' });
  });

  test('displays error message when axios post fails', async () => {
    // Mock error response from axios post
    axios.post.mockRejectedValue(new Error('Error sending reset password link'));

    render(<ForgetPassword />);
    
    // Fill in email input
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Click send link button
    fireEvent.click(screen.getByText('Send Link to Email'));

    // Wait for axios post to reject
    await waitFor(() => {
      // Check if error message is displayed
      expect(screen.getByText('Error sending reset password link. Please try again.')).toBeInTheDocument();
    });

    // Check if axios post is called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/api/v1/user/forgot', { email: 'test@example.com' });
  });
});
