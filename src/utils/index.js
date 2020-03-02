
export function treatDTx (data) {
  return data.map((data, i) => [new Date(data.date), data.transactionCount])
}
export function treatStats (data) {
  return data.map((data, i) => [new Date(data.date), (data.bitsPerSecond / data.encryptionsPerSecond) * 10])
}

export function treatIncome (data) {
  return data.map((data, i) => [new Date(data.date), displayPKT(data.received)])
}

export const displayPKT = (amount) => {
  return Number(amount) / 0x40000000
}

/**
 * truncate the hash depending on the container width
 *
 * @param {string} hash the hash to truncate
 * @param {number} w the container width
 * @param {number} letW width of a single letter (default is)
 * @returns
 */
export function trHash (hash, w, letW = 9) {
  const l = hash.length
  if (l * letW < w) return hash
  else {
    const maxl = w / letW
    const bitL = Math.floor((maxl - 3) / 2)
    return `${hash.substr(0, bitL)}…${hash.substr(-1 * (bitL), bitL)}`
  }
}

/**
 * helper to convert a js date obj to a formatted string (dd-mm-yyyy)
 *
 * @param {{}} dt a date object
 * @returns {string} the formated date string dd-mm-yyyy
 */
export function dtToStr (dt) {
  return `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getYear() + 1900}`
}

/**
 * fetch a json at a given url and return it, or an error if any
 *
 * @param {string} url
 * @returns {Array | {}}
 */
export const fetchJson = async (url) => {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (error) {
    console.log('error fetching ressource')
    return { error }
  }
}
