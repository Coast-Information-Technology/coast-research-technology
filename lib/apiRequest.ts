import { toast } from 'react-toastify';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

interface ApiResponse<T> {
  status: number;
  data: T;
}

/**
 * Makes a GET request to a single API endpoint with authorization token.
 */
export const getSingleApiRequest = async <T>(
  endpoint: string,
  token: string
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Fetches data from an API endpoint.
 */
export const getAllApiRequest = async <T>(
  endpoint: string,
  token: string
): Promise<T> => {
  return getSingleApiRequest(endpoint, token);
};

/**
 * Fetches paginated data from an API endpoint.
 */
export const getAllApiRequestWithPagination = async <T>(
  endpoint: string,
  pageSize: number,
  pageNo: number,
  token: string,
  searchQuery = ''
): Promise<T> => {
  try {
    const query = searchQuery ? `&q=${searchQuery}` : '';
    const response = await fetch(
      `${BASE_URL}${endpoint}?page_size=${pageSize}&page=${pageNo}${query}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Makes a POST request to an API endpoint.
 */
export const postApiRequest = async <T>(
  endpoint: string,
  body: object,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : {};

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to fetch data');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Updates data on the API server using a PUT request.
 */
export const updateApiRequest = async <T>(
  endpoint: string,
  token: string,
  data: object
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Adds a new user.
 */
export const addUser = async (formData: object) => {
  try {
    const response = await postApiRequest('/auth/users/', formData);
    toast.success('User added successfully');
    return response;
  } catch (error) {
    console.error('Failed to add user:', error);
    throw error;
  }
};

/**
 * Updates user information.
 */
export const updateUser = async (
  userId: string,
  formData: object,
  token: string,
  setUser: (data: any) => void
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/users/me/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setUser(data);
    toast.success('User updated successfully');
    return data;
  } catch (error) {
    console.error('Failed to update user:', error);
    toast.error('Failed to update user');
    throw error;
  }
};

/**
 * Makes a POST request and returns the response status and data.
 */
export const postApiCheckerRequest = async <T>(
  endpoint: string,
  body: object,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : {};

    return { status: response.status, data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
