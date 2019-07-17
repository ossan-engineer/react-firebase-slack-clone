import { useState, useEffect } from 'react';
import { db } from './firebase';

const cache: any = {};
const pendingCache: any = {};

const useDocWithCache = (path: string) => {
  const [doc, setDoc] = useState<any>(cache[path]);

  useEffect(() => {
    if (doc) {
      return;
    }

    const pending = pendingCache[path];
    const promise = pending || (pendingCache[path] = db.doc(path).get());

    promise.then((doc: any) => {
      const user = {
        ...doc.data(),
        id: doc.id,
      };
      setDoc(user);
      cache[path] = user;
    });
  }, [path, doc]);

  return doc;
};

export default useDocWithCache;
