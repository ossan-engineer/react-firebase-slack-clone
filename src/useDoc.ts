import { useState, useEffect } from 'react';
import { db } from './firebase';

const useDoc = (path: string) => {
  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    return db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id,
      });
    });
  }, [path]);

  return doc;
};

export default useDoc;
