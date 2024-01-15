import { API_BASE_URL } from 'config/constants';
import { ErorrType, HTTPResponseType } from 'entities';

class HTTPClient {
  constructor(private baseURL: string) {}

  private async parseResponse<ResDataType, InpuType = any>(res: Response) {
    const json = await res.json();
    if (res.status >= 400 && res.status <= 599) {
      return {
        data: null,
        errors: json.errors as ErorrType<InpuType>,
        statusCode: res.status,
      };
    }

    return {
      data: json.data as ResDataType,
      errors: null,
      statusCode: res.status,
    };
  }
  async post<T>(
    path: string,
    data?: T,
    token?: string
  ): Promise<HTTPResponseType<T>> {
    const res = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return this.parseResponse(res);
  }

  async put<T>(
    path: string,
    data?: T,
    token?: string
  ): Promise<HTTPResponseType<T>> {
    const res = await fetch(`${this.baseURL}${path}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return this.parseResponse(res);
  }

  async delete<T>(
    path: string,
    data?: T,
    token?: string
  ): Promise<HTTPResponseType<T>> {
    const res = await fetch(`${this.baseURL}${path}`, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return this.parseResponse(res);
  }

  async get<T>(path: string, token?: string): Promise<HTTPResponseType<T, T>> {
    try {
      const res = await fetch(`${this.baseURL}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      return this.parseResponse<T>(res);
    } catch (error) {
      return {
        data: null,
        errors: null,
        statusCode: 500,
      };
    }
  }
}

export const apiHTTPClient = new HTTPClient(`${API_BASE_URL}/api`);
