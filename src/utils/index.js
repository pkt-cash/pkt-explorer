export function treatDTx (data) {
  return data.map((data, i) => [new Date(data.date), data.transactionCount])
}

export const displayPKT = (amount) => Number(amount) / 0x40000000

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
  console.log('hash L', l)
  if (l * letW < w) return hash
  else {
    const maxl = w / letW
    const bitL = (maxl - 3) / 2
    console.log('max letter for this hash is', maxl, 'bitL', bitL)
    return `${hash.substr(0, bitL)}…${hash.substr(-1 * (bitL), bitL)}`
  }
}