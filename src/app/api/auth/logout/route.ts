import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';

export async function GET(request: Request) {
  await signOut(auth);

  return Response.json(null);
}
