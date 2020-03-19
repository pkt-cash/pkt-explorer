import { useState } from 'react'
import { fetchJson } from '../utils'
import nThen from 'nthen'
import endpoints from '../utils/endpoints'
const { addrMetaApi, blkUpApi, blockApi, txApi } = endpoints

const useBox = (histHook) => {
  const [inputs, setInputs] = useState({ omni: '' })

  const handleInputChange = (event) => {
    event.persist()
    // console.log(event)
    setInputs(inputs => ({ omni: event.target.value }))
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    let failed = false
    const error = (msg) => {
      if (failed) { return }
      failed = true
      // TODO(cjd): Jerome, can we have something a bit nicer, note how the old explorer works
      alert(msg)
    }
    const input = ('' + inputs.omni).trim()
    if (input === Number(input).toString()) {
      const nIn = Number(input)
      if (nIn < 0 || nIn !== Math.floor(nIn)) {
        return console.error('Block number must be a positive integer or zero')
      } else {
        // It's a block number
        fetchJson(`${blkUpApi}/1/${Number(input) + 1}`).then((json) => {
          if (json.code === 404) {
            error(`Block #${input} not found`)
          } else if (json.results && json.results.length === 1) {
            histHook.push(`/block/${json.results[0].hash}`)
          } else {
            error(`Error requesting block #${input}`)
          }
        })
      }
    } else if (/[a-f0-9]{64}/.test(input)) {
      // Hmm, it might be a block hash and then it might be a tx hash
      // We make two requests, but in the next page load one of them will be useful
      let res
      nThen((w) => {
        fetchJson(`${blockApi}/${input}`).then(w((json) => {
          if (json.code === 404) {
          } else if (json.hash) {
            res = 'block'
          } else {
            error(`Error requesting block with hash ${input}`)
          }
        }))
        fetchJson(`${txApi}/${input}`).then(w((json) => {
          if (json.code === 404) {
          } else if (json.txid) {
            res = 'tx'
          } else {
            error(`Error requesting transaction with hash ${input}`)
          }
        }))
      }).nThen((w) => {
        if (res) {
          histHook.push(`/${res}/${input}`)
        } else {
          error('No such block or transaction found')
        }
      })
    } else {
      // None of the above, so it could be an address but we need to check
      fetchJson(`${addrMetaApi}/${input}`).then((json) => {
        if (json.code === 400) {
          error(`${input} is not a valid address`)
        } else if (typeof (json.balance) === 'string') {
          histHook.push(`/address/${input}`)
        } else {
          error(`Error requesting address ${input}`)
        }
      })
    }
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}

export default useBox
