import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Token } from "../../../Utils/Utils";
import style from "./MoviesDetails.module.css";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Similar from "../Similar/SimilarMovie";
import RecommendationMovies from "../RecommendationsMovies/RecommendationMovies";

export default function MoviesDetails() {

  const [movie, setMovie] = useState({});
  const [cast , setcast] = useState([])
  const [type , settype] = useState([])
  let { id } = useParams();

  const headers = {
    Authorization: Token,
  };

  // async function GetMoviesDetails(id) {
  //    axios
  //     .get(`https://api.themoviedb.org/3/movie/${id}`, { headers: headers })
  //     .then((response) => {

  //       setMovie(response.data)
  //       console.log(response.data)
  //       console.log(movie)
  //     }).catch((error)=> console.log(error));
  // }

  async function GetMoviesDetails(id) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {headers: headers,});
                  setMovie(data);
                  settype(data.genres)
                  topCast(id)
  }

   async  function topCast(id){
     let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits` , {headers: headers,})
     setcast(data.cast)

     }

 

  useEffect(() => {
    GetMoviesDetails(id)
  }, [id]);
  return  <>
      <div className={`container ${style.parent_section}`}>
        <div className={style.content}>
          <div className={`row`}>
            <div className={`col-md-3`}>
              {<img className="w-100" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/> || <Skeleton/>}
              
            </div>
            <div className="col-md-9">
                     <div className={style.caption}>
                      <h1>{movie.title || <Skeleton/>}</h1>
                      <span>Release Date :{dayjs(movie.release_date).format("YYYY")}</span>
                      <div className={style.genes}>
                        {type.map((x)=><div className={style.child} key={x.id}>{x.name}</div>)}
                      </div>
                      <div className={style.watch}>
                        <div className={style.rating}><CircularProgressbar styles={{background:{fill:"red"}}} value={100 - movie.vote_average * 10} text={`${movie.vote_average}`} /></div>
                      <h2 style={{color:"white" , marginLeft:"20px"}}>Watch Now</h2> 
                     </div>
                     <div className={style.movcaption}>
                      <h2>Overview</h2>
                      <p>{movie.overview}</p>
                      <div className={style.detil}>
                       <h3>Status : <span>{movie.status}</span></h3>   
                      <h3>Relased Date : <span>{movie.release_date}</span></h3> 
                      <h3>Run Times: <span >{movie.runtime}</span></h3>
                      </div>
                       
                      </div>
                     </div>
                     
            </div>   
          </div>
        </div>
      <Similar movieId={id}/>
      <RecommendationMovies movieId={id}/>
      </div>
      
    </>
}
