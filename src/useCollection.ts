import { useState, useEffect } from 'react';
import { db } from './firebase';

const useCollection = (path: string, orderBy: string) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    return db
      .collection(path)
      .orderBy(orderBy)
      .onSnapshot(snapshot => {
        const docs: any = [];
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        console.log(docs);
        setDocs(docs);
      });
  }, [path, orderBy]);

  return docs;
};

export default useCollection;
