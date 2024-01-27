import { getAuth } from 'firebase/auth';

export const login = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    const data: any = await response.json();
    throw new Error(data.error.code);
  }

  const { data } = await response.json();

  return data;
};

export const logout = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/logout`);
};

export const checkAuth = async () => {
  const auth = getAuth();

  return !!auth?.currentUser;
};
