import React from 'react'
import { baseUrl } from "../../constants/api"
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import Heading from "../Layout/Heading"

function Home() {
  const { loading, error, data } = useFetch(baseUrl + `/wp-json/wp/v2/movies`)

  if (loading) return <p className='loading' />
  if (error) return <p>Error!</p>

  console.log(data)

  return (
    <div className='movieWrapper'>
       <Heading title="Movies" />
      {data.map(posts => (
        <div key={posts.id} className="postDetail">
          <h2>{posts.title.rendered}</h2>
          <p className='excerpt' dangerouslySetInnerHTML={{ __html: posts.excerpt.rendered }} />
          <Link to={`/detail/${posts.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}

export default Home