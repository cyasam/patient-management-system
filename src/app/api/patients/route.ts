import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { app } from '@/firebase/config';
import { calculateAge } from '@/utils';

export async function GET(request: Request) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'patients');

  const docsSnap = await getDocs(collectionRef);

  const data: any = [];

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const filterBy = searchParams.get('filterBy');

  docsSnap.forEach((doc: any) => {
    const docData = doc.data();
    docData.age = calculateAge(docData.birthDate)?.toString();

    if (query && filterBy) {
      const filterData: string = docData[filterBy];

      const searchQuery = query.toLowerCase();

      if (filterData.toLowerCase().includes(searchQuery)) {
        data.push({ id: doc.id, ...docData });
      }
    } else {
      data.push({ id: doc.id, ...docData });
    }
  });

  return Response.json({ data });
}
