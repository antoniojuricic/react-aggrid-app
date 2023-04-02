import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase'; // import your Firebase instance

// Create a new document in the specified collection
const createDocument = async (collectionName, data) => {
  try {
    const newDocRef = await addDoc(collection(db, collectionName), data);
    return newDocRef.id;
  } catch (error) {
    console.error('Error creating document:', error);
    return null;
  }
};

// Get all documents from the specified collection
const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    return null;
  }
};

// Get a specific document from the specified collection
const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

// Update a specific document in the specified collection
const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
};

// Delete a specific document from the specified collection
const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

// Get documents from the specified collection matching the given query
const getDocumentsByQuery = async (collectionName, field, operator, value) => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, collectionName),
        where(field, operator, value)
      )
    );
    const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return documents;
  } catch (error) {
    console.error('Error getting documents by query:', error);
    return null;
  }
};

export default {
  createDocument,
  getAllDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByQuery
};
