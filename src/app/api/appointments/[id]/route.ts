import { doc, getFirestore, getDoc } from 'firebase/firestore';
import { app } from '@/firebase/config';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const db = getFirestore(app);
  const docRef = doc(db, 'appointnments', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return Response.json({ data: null });
  }

  const data = docSnap.data();

  return Response.json({ data });
}
