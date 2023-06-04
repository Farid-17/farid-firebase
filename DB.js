import { query, collection, doc, getDoc, getDocs, where, setDoc } from "firebase/firestore";
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

export const _save = async (data, collectionName, idOrWhere = null) => {
    const db = getDB(), idOrWhereType = typeof idOrWhere;

    if (idOrWhereType == "object" && idOrWhere != null) {
        await setDoc(doc(collection(db, collectionName), (data.id == undefined ? null : data.id)), data);
    } else {
        await setDoc(doc(collection(db, collectionName), (data.id == undefined ? null : data.id)), data);
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