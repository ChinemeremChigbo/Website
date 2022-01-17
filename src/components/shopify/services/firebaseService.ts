import firestore from '../firebaseSetup';
import { Picture } from '../types';

const db = firestore.collection('favoritePictures');

const firebaseService = {
  async get() {
    const favoritePictures: Picture[] = [];
    const snapshot = await db.get();
    snapshot.forEach((doc) => {
      const data = doc.data() as Picture;
      favoritePictures.push({ ...data, id: doc.id });
    });
    return favoritePictures;
  },

  create(picture: Picture) {
    return db.add(picture);
  },

  async delete(id: string) {
    return await db.doc(id).delete();
  },

  async deleteCollection() {
    const batch = firestore.batch();
    const snapshot = await db.get();
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
};

export default firebaseService;
