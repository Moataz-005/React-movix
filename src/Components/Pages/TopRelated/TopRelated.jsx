import React from 'react'
import axios from "axios";
import style from "./TopRelated.module.css";
import { useEffect, useState } from "react";
import { Token } from "../../../Utils/Utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
export default function TopRelated() {
  const headers = {
    Authorization: Token,
  };

  const [related, setrelated] = useState([]);
  const [name , setname] = useState('')
  async function getRelated(term) {
    if(term === "movie"){
      let { data } = await axios.get(`https://api.themoviedb.org/3/${term}/top_rated`,{ headers: headers });
      setrelated(data.results);
      setname("movie")  
    }else{
      let { data } = await axios.get(`https://api.themoviedb.org/3/${term}/top_rated`,{ headers: headers });
      setrelated(data.results);  
      setname("tv")
    }
  }

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

  useEffect(() => {
    getRelated("movie");
  }, []);
  return <>
    <div className={style.Parent_section}>
        <div className={style.parent}>
          <h1>Top Related</h1>
          <div className={style.btn}>
            <button onClick={() => getRelated("movie")} className={style.first}>
              Movies
            </button>
            <button onClick={() => getRelated("tv")}>Tv Show</button>
          </div>
        </div>
        <div className={style.section}>
          <Carousel responsive={responsive}>
            {related.map((movie) => (
              <div className={`col-md-10 ${style.card}`} key={movie.id}>
                {name === 'movie'?<Link to={`movies/${movie.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="poster"
                  />
                  {/* <div className={`${style.rating}`}><CircularProgressbar  value={movie.vote_average} text={`${percentage}%`} /></div> */}
                </Link>:<Link to={`tvshow/${movie.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="poster"
                  />
                  {/* <div className={`${style.rating}`}><CircularProgressbar  value={movie.vote_average} text={`${percentage}%`} /></div> */}
                </Link>}
                
                <div className="px-2">
                    {name === "movie"?<div className="">{movie.title}</div>:<div className="">{movie.name}</div>}
                    <span className={style.date}>{dayjs(movie.release_date).format('MMM D YYYY')}</span>
                  </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
  
  </>
}
