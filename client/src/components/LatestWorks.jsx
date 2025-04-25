import {useEffect, useState} from 'react'
import axios from 'axios'
import LatestWorkItem from './LatestWorkItem'
function LatestWorks({listType}) {
    const [lists, setLists] = useState([
      {
        work_id : 1,
        title: "Designing Dashboards" ,
        description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        created_at: "2025-04-25",
        is_active: 0
      },
      {
        work_id : 2,
        title: "Vibrant Portraits of 2024" ,
        description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        created_at: "2024-03-07",
        is_active: 1
      },
      {
        work_id : 3,
        title: "36 Days of Malayalam type" ,
        description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        created_at: "2024-02-15",
        is_active: 1
      },
    ])
    const [isLoading, setIsLoading] = useState(true)
    // useEffect(() => {
    //     axios.get("http://localhost:4000/works")
    //     .then((response) => console.log)
    //     .catch((err) => console.error(err))
    // }, [])
    // if(isLoading) {
    //     return (
    //         <div>로딩중..</div>
    //     )
    // }
  return (
    <div className='py-10'>
      <LatestWorkItem lists={lists} listType={listType} />
    </div>
  )
}

export default LatestWorks