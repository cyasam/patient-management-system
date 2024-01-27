import {
  collection,
  getFirestore,
  getDocs,
  getDoc,
  doc,
} from 'firebase/firestore';
import { app } from '@/firebase/config';

const getPatientData = async (patientId: string) => {
  const db = getFirestore(app);
  const docPatientRef = doc(db, 'patients', patientId);
  const docPatientSnap = await getDoc(docPatientRef);

  return docPatientSnap.data();
};

export async function GET(request: Request) {
  const db = getFirestore(app);
  const collectionRef = collection(db, 'appointments');
  const docsSnap = await getDocs(collectionRef);

  const data: any = [];

  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get('doctorId');
  const patientId = searchParams.get('patientId');

  docsSnap.forEach((document: any) => {
    const docData = document.data();
    const docDoctorId = docData.doctorId;
    const docPatientId = docData.patientId;

    if (doctorId && patientId) {
      if (docDoctorId === doctorId && docPatientId === patientId) {
        data.push({ id: document.id, ...docData });
      }
    } else if (doctorId) {
      if (docDoctorId === doctorId) {
        data.push({ id: document.id, ...docData });
      }
    } else {
      data.push({ id: document.id, ...docData });
    }
  });

  const dataWithPatient = await Promise.all(
    data.map(async (item: any) => {
      const patientData = await getPatientData(item.patientId);
      return {
        ...item,
        patientData,
      };
    })
  );

  return Response.json({ data: dataWithPatient });
}
