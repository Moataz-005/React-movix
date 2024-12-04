import React from 'react'
import axios from "axios";
import style from "./MostPopular.module.css";
import { useEffect, useState } from "react";
import { Token } from "../../../Utils/Utils";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
export default function MostPopular(){
  const headers = {
    Authorization: Token,
  };

  const [Tranding, setTranding] = useState([]);
  async function GetTranding(term) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${term}/popular`,{ headers: headers });
    setTranding(data.results);
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

  const percentage = 66;

  <CircularProgressbar
    text={`${percentage}%`}
    styles={buildStyles({
      // Rotation of path and trail, in number of turns (0-1)
      rotation: 0.25,

      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
      strokeLinecap: "butt",

      // Text size
      textSize: "16px",

      // How long animation takes to go from one percentage to another, in seconds
      pathTransitionDuration: 0.5,

      // Can specify path transition in more detail, or remove it entirely
      // pathTransition: 'none',

      // Colors
      pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
      textColor: "#f88",
      trailColor: "#d6d6d6",
      backgroundColor: "white",
    })}
  />;

  useEffect(() => {
    GetTranding("tv");
  }, []);
  return <>
      <div className={style.Parent_section}>
        <div className={style.parent}>
          <h1>What's Popular</h1>
          {/* <div className={style.btn}>
            <button onClick={() => GetTranding("movie")} className={style.first}>
              Movies
            </button>
            <button onClick={() => GetTranding("tv")}>Tv Show</button>
          </div> */}
        </div>
        <div className={style.section}>
          <Carousel responsive={responsive}>
            {Tranding.map((movie) => 
              <div className={`col-md-10 ${style.card}`} key={movie.id}>
                <Link to={`tvshow/${movie.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="poster"
                  />
                  {/* <div className={`${style.rating}`}><CircularProgressbar  value={movie.vote_average} text={`${percentage}%`} /></div> */}
                </Link>
                <div className="px-2">
                    <div className="">{movie.name}</div>
                    <span className={style.date}>{dayjs(movie.release_date).format('MMM D YYYY')}</span>
                  </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>
</>
}
