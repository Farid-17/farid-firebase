import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfigs from "./configs.js";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const f_filename = fileURLToPath(import.meta.url);
const f_dirname = path.dirname(f_filename);

/**
 * @param {object} configs
 * - apiKey
 * - authDomain
 * - projectId
 * - storageBucket
 * - messagingSenderId
 * - appId
 * - measurementId
 * @returns {object}
 */
export const setConfigs = (configs) => {
    fs.readFile(`${f_dirname}/configs.js`, 'utf8', function (err, data) {
        if (err) {
            return console.error(err);
        }
        let replacement = `export default ${getObjectString(configs)}`;
        var result = replaceFromToString(data, replacement, 'export default {', '}');

        fs.writeFile(`${f_dirname}/configs.js`, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

/**
 * @returns {object}
 */
export const getDB = () => {
    const firebaseConfig = firebaseConfigs;

    const app = initializeApp(firebaseConfig);
    return getFirestore(app);
}

/**
 * @param {object} object
 * @returns {string}
 */
const getObjectString = (object) => {
    let result = "{\n";

    for (const key of Object.keys(object)) {
        result += `\t${key}: '${object[key]}',\n`;
    }

    result += "}";
    return result;
}

/**
 * @param {string} text
 * @param {string} replacement
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
const replaceFromToString = (text, replacement, from, to) => {
    let textLines = text.split("\n"),
        started = false,
        result = "";

    for (const line of textLines) {
        let lineContent = line.trim();

        if (started == false && lineContent == from) {
            started = true;
            result += `${replacement}\n`;
        } else if (started == true && lineContent != to) {
            continue
        } else if (started == true && lineContent == to) {
            started = false;
            continue
        } else {
            result += `${line}\n`;
        }
    }

    return result;
}