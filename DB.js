import { query, collection, doc, getDoc, getDocs, where, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getDB } from "./firebase-config.js";

/**
 * @param {string} collectionName
 * @param {object, string, null} idOrWhere
 * @returns {Promise}
 */
export const _get = async (collectionName, idOrWhere = null) => {
    try {
        const db = getDB(), idOrWhereType = typeof idOrWhere;
        let querySnapshot;

        if (idOrWhereType == "object" && idOrWhere != null) {
            let queryGenerated = query(collection(db, collectionName), ...getWhereArray(idOrWhere));
            querySnapshot = await getDocs(queryGenerated);
        } else if (idOrWhereType == "string" && idOrWhere != null) {
            querySnapshot = await getDoc(doc(db, collectionName, idOrWhere));
        } else {
            querySnapshot = await getDocs(collection(db, collectionName));
        }

        let data;
        if (idOrWhereType == "object" || idOrWhereType == null) {
            data = [];
            querySnapshot.forEach((doc) => {
                data.push(getDocumentData(doc.data(), doc.id));
            });
        } else {
            data = getDocumentData(querySnapshot.data(), idOrWhere);
        }

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * @param {string} collectionName
 * @param {object, string, null} idOrWhere
 * @returns {Promise}
 */
export const _first = async (collectionName, idOrWhere) => {
    try {
        const db = getDB(), idOrWhereType = typeof idOrWhere;
        let querySnapshot;

        if (idOrWhereType == "object") {
            let queryGenerated = query(collection(db, collectionName), ...getWhereArray(idOrWhere));
            querySnapshot = await getDocs(queryGenerated);
        } else {
            querySnapshot = await getDoc(doc(db, collectionName, idOrWhere));
        }

        let data;
        if (idOrWhereType == "object") {
            querySnapshot.forEach((doc) => {
                data = getDocumentData(doc.data(), doc.id);
                return;
            });
        } else {
            data = getDocumentData(querySnapshot.data(), idOrWhere);
        }

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * @param {object} data
 * @param {string} collectionName
 * @param {object, string, null} idOrWhere
 * @returns {boolean}
 */
export const _save = async (data, collectionName, idOrWhere = null) => {
    const db = getDB(), idOrWhereType = typeof idOrWhere;

    try {
        if (idOrWhereType == "object" && idOrWhere != null) {
            let queryGenerated = query(collection(db, collectionName), ...getWhereArray(idOrWhere));
            let querySnapshot = await getDocs(queryGenerated);
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, data);
            });
        } else if (idOrWhereType == "string" && idOrWhere != null) {
            await updateDoc(doc(db, collectionName, idOrWhere), data);
        } else {
            if (data.id == undefined) {
                await setDoc(doc(collection(db, collectionName)), data);
            } else {
                await setDoc(doc(db, collectionName, data.id), data);
            }
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * @param {string} collectionName
 * @param {object, string} idOrWhere
 * @returns {boolean}
 */
export const _delete = async (collectionName, idOrWhere) => {
    const db = getDB(), idOrWhereType = typeof idOrWhere;

    try {
        if (idOrWhereType == "object") {
            let queryGenerated = query(collection(db, collectionName), ...getWhereArray(idOrWhere));
            let querySnapshot = await getDocs(queryGenerated);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        } else {
            await deleteDoc(doc(db, collectionName, idOrWhere));
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * @param {object} conditions
 * - column
 * - value
 * - operation: optional
 * @returns {object}
 */
const getWhereArray = (conditions) => {
    let wheres = [];

    for (const condition of conditions) {
        let operation = "==";

        if (condition.operation != undefined) {
            operation = condition.operation;
        }

        wheres.push(where(condition.column, operation, condition.value));
    }

    return wheres;
}

/**
 * @param {object} document
 * @param {string, null} id
 * @returns {object}
 */
const getDocumentData = (document, id = null) => {
    let data = {};

    if (id != null) {
        data.id = id;
    }

    for (const key of Object.keys(document)) {
        data[key] = document[key];
    }

    return data
}