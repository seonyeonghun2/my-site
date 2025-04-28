import {useEffect, useState} from 'react'
import axios from 'axios'
import LatestWorkItem from './LatestWorkItem'
function LatestWorks({listType, stringToDate}) {
    const [lists, setLists] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        async function getLists () {
          await axios.get("http://localhost:4000/works/all")
        .then((response) => {
          if (response.status === 200 || response.statusText === 'OK') {
            setIsLoading(false)
            setLists(response.data.data)
            // console.log(response)
          }
        })
        .catch((err) => console.error(err))
        }
        getLists();
    }, [])
    if(isLoading) {
        return (
            <div>로딩중..</div>
        )
    }
  return (
    <div className='py-10'>
      <LatestWorkItem lists={lists} listType={listType} />
    </div>
  )
}

export default LatestWorks