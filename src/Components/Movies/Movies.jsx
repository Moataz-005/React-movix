import React, { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Token } from "../../Utils/Utils";
import axios from "axios";
import style from "./Movies.module.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import noposter from "../../Assets/no-poster.png";
import InfiniteScroll from "react-infinite-scroll-component";
export default function Movies() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [movie, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Whether there's more data to load
  const [genres, setgenres] = useState([]);
  const [movieWithGeneres, setmovieWithGeneres] = useState([]);


  
  const headers = {
    Authorization: Token,
  };

  
  async function allMovies(moviesId) {

    const api = moviesId === undefined || moviesId === ""? "": `&with_genres=${moviesId}`;
   
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${page}${api}`, { headers: headers });
    // setMovies(data.results);
    setHasMore(data.results.length > 0);
    setMovies(prevData => [...prevData, ...data.results]);
    // if(moviesId !== ''){
    //   setMovies(data.results)
    //   console.log('hello from')
    // }else{
    //   return
    // }
    // setpage((prevPage) => prevPage + 1);

console.log(data.results.length)

    getgenres();
    
  }

  async function getgenres() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list`,
      { headers: headers }
    );
    setgenres(data.genres);
  }
  const moviesType = genres.map((type) => ({
    value: type.id,
    label: type.name,
  }));

  const handelChange = async (event) => {
    let selectedMovie = event.map((category) => category.value).join(",");
    setpage(1)
    allMovies(selectedMovie);

  };

  const scroll = async()=>{
    setpage((prevPage) => prevPage + 1);
    allMovies()
      
      // allMovies()
  }
  const colorStyle = {
    control: (style) => ({
      ...style,
      backgroundColor: "#173D77",
      width: "400px",
      borderRadius: "20px",
    }),

    option: (style, state) => ({
      ...style,
      backgroundColor: "",
      color: "",
      padding: "5px",
      cursor: "pointer",
    }),
    singleValue: (style, state) => ({
      ...style,
      backgroundColor: "orange",
    }),
  };

  useEffect(() => {
    allMovies();
  }, []);

  return (
    <>
      <div className="container">
        <div className={style.main_parent}>
          <div className={`row d-flex${style.subparent}`}>
            <div className="col-md-3">
              <h2 style={{ color: "white", fontSize: "25px" }}>
                Explore Movies
              </h2>
            </div>
            <div className="col-md-9  d-flex justify-content-md-end align-items-center">
              <Select
                options={moviesType}
                onChange={handelChange}
                defaultValue={selectedOption}
                placeholder={"Select Movie Type"}
                isMulti
                isSearchable
                noOptionsMessage={() => "No Result Found"}
                styles={colorStyle}
              />
            </div>
          </div>
        </div>

        <div className="row">
          {movie.map((movie) => (
            <div
              className={`col-sm-6  col-md-4 col-lg-3 mt-4 p-3 gx-4 ${style.card}`}
              key={movie.id}
            >
              <Link to={`/movies/${movie.id}`}>
                <div className={style.poster}>
                  {movie.poster_path === null ? (
                    <img className="w-100" src={noposter} alt="post" />
                  ) : (
                    <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=""
                    />
                  )}
                </div>
              </Link>
              <div className="px-2">
                <h4 className={""} style={{ color: "white" }}>
                  {movie.title}
                </h4>
                <span className={style.date}>
                  {dayjs(movie.release_date).format("MMM D YYYY")}
                </span>
              </div>
            </div>
          ))}

          <InfiniteScroll
            dataLength={movie.length }
            next={scroll}
            hasMore={hasMore}
          />
        </div>
      </div>
    </>
  );
}
