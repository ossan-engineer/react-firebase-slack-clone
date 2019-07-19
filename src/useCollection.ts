import { useState, useEffect } from 'react';
import { db } from './firebase';

const useCollection = (
  path: string,
  orderBy?: string,
  where: [string, string, boolean] = ['', '', false],
) => {
  const [docs, setDocs] = useState([]);
  const [queryField, queryOperator, queryValue] = where;

  useEffect(() => {
    let collection: any = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
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
  }, [path, orderBy, queryField, queryOperator, queryValue]);

  return docs;
};

export default useCollection;
