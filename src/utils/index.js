import { useEffect, useRef } from 'react'

export function formatDate (d) {
  return new Date(d).toString().replace(/ GMT[+-][0-9]+ .*$/, '')
}

export function commafy (number) {
  return ('' + number).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function treatDTx (data) {
  return data.map((data, i) => [new Date(data.date), data.transactionCount])
}

export function treatStats (data) {
  const datum = [
    {
      label: 'Bandwidth',
      data: []
    },
    {
      label: 'Encryptions',
      data: []
    }
  ]

  const makeEntry = (data) => {
    const dt = new Date(data.date)
    datum[0].data.push([dt, data.bitsPerSecond])
    datum[1].data.push([dt, data.encryptionsPerSecond])
  }
  data.forEach(makeEntry)
  return datum
}

export function treatIncome (data) {
  return data.map((data, i) => [new Date(data.date), displayPKT(data.received)])
}

export const displayPKT = (amount) => {
  return Number(amount) / 0x40000000
}

export const bpsStr = (bits) => {
  if (bits > (1 << 30)) return `${parseFloat(bits / 1073741824).toFixed(2)} Gb/s`
  if (bits > (1 << 20)) return `${parseFloat(bits / 1048576).toFixed(2)} Mb/s`
  if (bits > (1 << 10)) return `${parseFloat(bits / 1048576).toFixed(2)} Kb/s`
  return `${bits} bits/s`
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
    console.error('error fetching ressource')
    return { error }
  }
}

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
