import { getTokenFromCookies } from "./cookies";

interface ApiResponse<T> {
  data: T;
  message: string;
}

// POST request
export const postApiRequest = async <T>(
  endpoint: string,
  isToken: boolean,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add token to headers if provided
    if (isToken) {
      const token = getTokenFromCookies("Token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      // Parse response data
      const responseData = await response.json();
      console.log("Post Request successful");
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Post Request failed");
    }
  } catch (error) {
    console.error("Post Request failed", error);
    throw error;
  }
};

// GET request
export const getApiRequest = async <T>(
  endpoint: string,
  token?: string
): Promise<ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {};

    // Add token to headers if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("GET Request successful");
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "GET Request failed");
    }
  } catch (error) {
    console.error("GET Request failed", error);
    throw error;
  }
};

// PUT request
export const putApiRequest = async <T>(
  endpoint: string,
  token: string | undefined,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add token to headers if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("PUT Request successful");
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "PUT Request failed");
    }
  } catch (error) {
    console.error("PUT Request failed", error);
    throw error;
  }
};

// DELETE request
export const deleteApiRequest = async (
  endpoint: string,
  token?: string
): Promise<void> => {
  try {
    const headers: HeadersInit = {};

    // Add token to headers if provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: headers,
      credentials: "include",
    });

    if (response.ok) {
      console.log("DELETE Request successful");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "DELETE Request failed");
    }
  } catch (error) {
    console.error("DELETE Request failed", error);
    throw error;
  }
};

// Send activation link to the borrower to verify
type SendActivationLinkResponse = boolean;

export const sendActivationLink = async (
  email: string
): Promise<SendActivationLinkResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/verify_email/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send activation link");
    }

    return true; // Indicate success
  } catch (error) {
    console.error("Error sending activation link:", error);
    throw new Error("Failed to send activation link");
  }
};
