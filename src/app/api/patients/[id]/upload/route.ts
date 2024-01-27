import { storage } from '@/firebase/config';
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const patientId = params.id;
  const listRef = ref(storage, patientId);
  const res = await listAll(listRef);

  const filesMetaPromises = res.items.map((itemRef: any) => {
    return getMetadata(itemRef);
  });

  const filesDownloadPromises = res.items.map((itemRef: any) => {
    return getDownloadURL(itemRef);
  });

  const filesMetaResult = await Promise.allSettled(filesMetaPromises);
  const filesDownloadResult: any = await Promise.allSettled(
    filesDownloadPromises
  );

  const data: any = filesMetaResult.map((file: any, index: number) => {
    const obj = {
      ...file.value,
      id: index,
      url: filesDownloadResult[index].value,
    };
    return obj;
  });

  return Response.json({ data });
}
