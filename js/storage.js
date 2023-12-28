const STORAGE_TOKEN = 'FCQAGVMQJM61MUKNVL23EGNBJCX4PPRLZG201ARO';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Stores a value in the API.
 * 
 * @param {string} key - The key for the stored value.
 * @param {any} value - The value to be stored.
 * @returns {Promise} - A Promise containing the result of the storage operation in the API.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * Retrieves a value from the API.
 * 
 * @param {string} key - The key for the value to be retrieved.
 * @returns {Promise} - A Promise containing the retrieved value from the API.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}