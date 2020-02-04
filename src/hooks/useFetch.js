import { useState, useEffect } from 'react'
const useFetch = (url) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setData(data)
        } else {
          setError(new Error(response.statusText))
        }
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    })()
  }, [url])
  return { error, loading, data }
}

export default useFetch
