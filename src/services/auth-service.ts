import { API_BASE_URL } from 'config/constants';
import { LoginResponse } from 'entities';
export class AuthService {
  static async socialLogin(idToken: string) {
    const res = await fetch(`${API_BASE_URL}/api/auth/social-login/`, {
      method: 'POST',
      body: JSON.stringify({ token: idToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await res.json();

    if (res.status !== 200) {
      throw new Error(resData?.message);
    }

    return { data: resData as LoginResponse };
  }
}
