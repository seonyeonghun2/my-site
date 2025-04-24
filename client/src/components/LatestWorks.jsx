import {useEffect, useState} from 'react'
import axios from 'axios'
function LatestWorks() {
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get("http://localhost:4000/works")
        .then((response) => console.log)
        .catch((err) => console.error(err))
    }, [])
    if(isLoading) {
        return (
            <div>로딩중..</div>
        )
    }
  return (
    <div>LatestWorks</div>
  )
}

export default LatestWorks