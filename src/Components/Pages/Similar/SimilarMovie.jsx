import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Token } from '../../../Utils/Utils';
import style from './SimilarMovie.module.css'
import dayjs from "dayjs";
import Carousel from "react-multi-carousel";
import noposter from '../../../Assets/no-poster.png'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from 'react-router-dom';

export default function SimilarMovie({movieId}) {

const [similar , setsimilar] = useState([])
const headers = {Authorization: Token,};    

async function getSimilar(movieId){
 let {data} = await axios.get(` https://api.themoviedb.org/3/movie/${movieId}/similar` , {headers:headers})
    setsimilar(data.results)
    console.log(similar)
}

useEffect(()=>{
    getSimilar(movieId)
} ,[movieId])

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items:4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }; /////////////////////////////////carsolue


  return <>
  <div className={style.Parent_section}>
        <div className={style.parent}>
          <h1>Similar Movies</h1>

        </div>
        <div className={style.section}>
          <Carousel responsive={responsive}>
            {similar.map((movie) => (
              <div className={`col-md-10 ${style.card}`} key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                  {movie.poster_path === null? <img className="w-100" src={noposter} alt="post"/>:
                  <img className="w-100" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}alt="poster"/>
                  }
                  
                  {/* <div className={`${style.rating}`}><CircularProgressbar  value={movie.vote_average} text={`${percentage}%`} /></div> */}
                </Link>
                <div className="px-2">
                    <div className="">{movie.title}</div>
                    <span className={style.date}>{dayjs(movie.release_date).format('MMM D YYYY')}</span>
                  </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
  </>
}
