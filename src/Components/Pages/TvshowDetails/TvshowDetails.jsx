import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Token } from "../../../Utils/Utils";
import style from "./TvshowDetails.module.css";
import dayjs from "dayjs";

export default function TvshowDetails() {

  const [tvshow, settvshow] = useState({});
  const [type , settype] = useState([])
  let { id } = useParams();
console.log(id)
  const headers = {
    Authorization: Token,
  };


  async function GetMoviesDetails() {
    let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {headers:headers});
                  settvshow(data);
                  settype(data.genres)
                  // console.log(profile);
  }

  useEffect(() => {
    GetMoviesDetails(id);
  }, []);




  return <>
  
      <div className={`container ${style.parent_section}`}>
        <div className={style.content}>
          <div className={`row`}>
            <div className={`col-md-3`}>
              <img className="w-100" src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`} alt=""/>
            </div>
            <div className="col-md-9">
                     <div className={style.caption}>
                      <h1>{tvshow.original_name}</h1>
                      <span>Release Date :{dayjs(tvshow.first_air_date).format("YYYY")}</span>
                      <div className={style.genes}>
                        {type.map((x)=><div className={style.child} key={x.id}>{x.name}</div>)}
                      </div>
                      <div className={style.watch}>
                        {/* <div className={style.rating}><CircularProgressbar styles={{background:{fill:"red"}}} value={100 - movie.vote_average * 10} text={`${movie.vote_average}`} /></div> */}
                      <h2 style={{color:"white" , marginLeft:"20px"}}>Watch Now</h2> 
                     </div>
                     <div className={style.movcaption}>
                      <h2>Overview</h2>
                      <p>{tvshow.overview}</p>  
                     </div>
                     </div>      
            </div>   
          </div>
        </div>
      </div>
  
  
  </>

}