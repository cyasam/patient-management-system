import { getAuth } from 'firebase/auth';

export const login = async (email: string, password: string) => {
  const response = await fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data: any = await response.json();
    throw new Error(data.error.code);
  }

  const { data } = await response.json();

  return data;
};

export const logout = async () => {
  return await fetch(`http://localhost:3000/api/auth/logout`);
};

export const checkAuth = async () => {
  const auth = getAuth();

  return !!auth?.currentUser;
};
