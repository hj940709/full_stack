import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value,
    reset: () => setValue(''),
    bind: {
        type,
        value,
        onChange
    }
  }

}

export const useResource = (baseUrl) => {
  const [resources, setResource] = useState([])
  useEffect(() => {
    axios.get(baseUrl).then(response => response.data)
    .then(data=>setResource(data))
  }, [])

  const create = async (resource) => {
    axios.post(baseUrl, resource).then(response=>response.data)
    .then(data=>setResource(resources.concat(data)))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}


