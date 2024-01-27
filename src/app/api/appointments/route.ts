import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { app } from '@/firebase/config';

export async function GET(request: Request) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'appointments');
  const docsSnap = await getDocs(collectionRef);

  const data: any = [];

  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId');
  const patientId = searchParams.get('patientId');

  docsSnap.forEach((doc: any) => {
    const docData = doc.data();
    const docDoctorId = docData.doctorId;
    const docPatientId = docData.patientId;

    if (doctorId && patientId) {
      if (docDoctorId === doctorId && docPatientId === patientId) {
        data.push({ id: doc.id, ...docData });
      }
    } else if (doctorId) {
      if (docDoctorId === doctorId) {
        data.push({ id: doc.id, ...docData });
      }
    } else {
      data.push({ id: doc.id, ...docData });
    }
  });

  return Response.json({ data });
}
