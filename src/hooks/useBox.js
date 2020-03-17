import { useState } from 'react'
import endpoints from '../utils/endpoints'
const { addrMetaApi } = endpoints

const useBox = (histHook) => {
  const [inputs, setInputs] = useState({ omni: '' })

  const handleInputChange = (event) => {
    event.persist()
    console.log(event)
    setInputs(inputs => ({ omni: event.target.value }))
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    const input = inputs.omni
    try {
      console.log('test addres')
      fetch(`${addrMetaApi}/${input}`)
        .then((json) => { // since there is no error we have adress metadata, we can link to the address
          histHook.push(`/address/${input}`) // used to link to routes progamatically
        })
    } catch (error) {
      console.log('this is not an adress')
    }
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}

export default useBox
