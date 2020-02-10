import { useState } from 'react'

const useBox = (callback) => {
  const [inputs, setInputs] = useState({ omni: '' })

  const handleInputChange = (event) => {
    event.persist()
    setInputs(inputs => ({ omni: event.target.value }))
  }

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}

export default useBox
