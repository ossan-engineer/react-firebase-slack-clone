import { useState, useEffect } from 'react';
import { db } from './firebase';

const useCollection = (path: string, orderBy?: string) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collection: any = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    return collection.onSnapshot(
      (snapshot: firebase.firestore.QuerySnapshot) => {
        const docs: any = [];
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        console.log(docs);
        setDocs(docs);
      },
    );
  }, [path, orderBy]);

  return docs;
};

export default useCollection;
