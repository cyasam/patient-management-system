import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const data = await signInWithEmailAndPassword(auth, email, password);

    return Response.json({ data });
  } catch (error: any) {
    if (error?.name === 'FirebaseError') {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json(
      { error: { code: 500, message: 'Internal Error' } },
      { status: 500 }
    );
  }
}
