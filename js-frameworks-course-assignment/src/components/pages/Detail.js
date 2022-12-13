import React from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from "../../constants/api"
import useFetch from "../../hooks/useFetch"
import Moment from 'react-moment'
import Heading from "../Layout/Heading"

function Detail() {
    const { id } = useParams();
    const { loading, error, data } = useFetch(baseUrl + `/wp-json/wp/v2/movies/${id}`);  
    const image = useFetch(baseUrl + `/wp-json/wp/v2/media?parent=${id}`)

    if (loading) return <p className='loading' />
    if (error) return <p>Error</p>
    if (data.data === null || image.image === null) return <p></p>

    console.log(data);
    console.log(image);

  return (
    <div className='movieCard'>
      <Heading title={data.title.rendered} />
      <p className="date"><Moment format= "MMMM Do, YYYY" >{data.date}</Moment></p>
      <p className='excerpt' dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
      <img src={image.data[0].guid.rendered} alt={data.slug} />
    </div>
  )
}

export default Detail