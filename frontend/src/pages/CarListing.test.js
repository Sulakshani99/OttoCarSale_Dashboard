import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import CarListing from './CarListing';

jest.mock('axios');

describe('CarListing Component', () => {
  test('renders loading component while fetching data', async () => {
    axios.get.mockResolvedValueOnce({ data: { car: [] } });
    
    const { getByTestId } = render(<CarListing />);
    const loadingComponent = getByTestId('loading-component');

    expect(loadingComponent).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  test('renders error message if fetching data fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));
    
    const { getByText } = render(<CarListing />);
    const errorMessage = getByText(/Failed to fetch data/i);

    expect(errorMessage).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  test('renders empty message if no car data is returned', async () => {
    axios.get.mockResolvedValueOnce({ data: { car: [] } });
    
    const { getByText } = render(<CarListing />);
    const emptyMessage = getByText(/No Car found/i);

    expect(emptyMessage).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  test('renders car items if car data is returned', async () => {
    axios.get.mockResolvedValueOnce({ data: { car: [{ id: 1, name: 'Car 1' }] } });
    
    const { getByText } = render(<CarListing />);
    const carName = getByText(/Car 1/i);

    expect(carName).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
