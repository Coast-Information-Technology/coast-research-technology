import { getTokenFromCookies } from './cookies';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

interface ApiResponse<T> {
  data: T | null;
  message?: string;
}

const getHeaders = (isTokenRequired: boolean): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (isTokenRequired) {
    const token = getTokenFromCookies('Token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const apiRequest = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  isTokenRequired = false,
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  const url = `${BASE_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: getHeaders(isTokenRequired),
    body: body ? JSON.stringify(body) : undefined,
  };

  console.log(`🚀 [${method}] ${url}`, {
    headers: options.headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  console.log('Final Request Options:', options);

  try {
    console.log(`Fetching from: ${url}`);

    const response = await fetch(url, options);
    const responseText = await response.text();

    console.log('Fetching after fetch from:', url);
    console.log('response fetch from:', response);
    console.log('responseTexT:', responseText);

    console.log(
      `📡 Response [${response.status}]:`,
      responseText || '(Empty Response)'
    );

    if (!response.ok) {
      const errorMessage = responseText
        ? JSON.parse(responseText).message || response.statusText
        : response.statusText;
      throw new Error(
        `❌ ${method} Request Failed: ${response.status} - ${errorMessage}`
      );
    }

    return responseText
      ? (JSON.parse(responseText) as ApiResponse<T>)
      : { data: null };
  } catch (error) {
    console.error(`🔥 Error in ${method} Request:`, error);
    throw error;
  }
};

// ✅ API Functions (Typed)
export const postApiRequest = <T>(
  endpoint: string,
  isTokenRequired: boolean,
  body: Record<string, unknown>
) => apiRequest<T>('POST', endpoint, isTokenRequired, body);

export const putApiRequest = <T>(
  endpoint: string,
  isTokenRequired: boolean,
  body: Record<string, unknown>
) => apiRequest<T>('PUT', endpoint, isTokenRequired, body);

export const deleteApiRequest = (endpoint: string, isTokenRequired = false) =>
  apiRequest<void>('DELETE', endpoint, isTokenRequired);

export const getAllApiRequest = <T>(
  endpoint: string,
  isTokenRequired = false
) => apiRequest<T>('GET', endpoint, isTokenRequired);

export const getSingleApiRequest = <T>(
  endpoint: string,
  id: string | number,
  isTokenRequired = false
) => apiRequest<T>('GET', `${endpoint}/${id}`, isTokenRequired);

// ✅ Example Function: Send Activation Link
export const sendActivationLink = async (email: string): Promise<boolean> => {
  try {
    await postApiRequest('/api/verify_email/', false, { email });
    return true;
  } catch (error) {
    console.error('❌ Failed to send activation link:', error);
    return false;
  }
};
