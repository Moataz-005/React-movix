import "./App.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from "./Components/Layout/Layout";
import BaseFetch, { Token } from "./Utils/Utils";
import { useEffect } from "react";
import Home from "./Components/Home/Home";
import MoviesDetails from "./Components/Pages/MoviesDetails/MoviesDetails";
import Tvshow from "./Components/TvShow/Tvshow";
import Movies from "./Components/Movies/Movies";
import TvshowDetails from "./Components/Pages/TvshowDetails/TvshowDetails";
import axios from "axios";
import { configuration, drop } from "./Redux/ImageSizeConfig";
import { useDispatch } from "react-redux";
import Search from "./Components/Search/Search";

function App() {
let dispatch =  useDispatch()
  const headers = {
    Authorization: Token,
  };


async function getConfig(){
 let {data} =   await axios.get(`https://api.themoviedb.org/3/configuration` ,{headers:headers})
 const url ={
  backdrop:data.images.secure_base_url + 'original',
  poster:data.images.secure_base_url + 'original',
  profile:data.images.secure_base_url + 'original',
 }
 dispatch(configuration(url))
 homePoster()
}

async function homePoster(){
  let {data} =  await axios.get(`https://api.themoviedb.org/3/movie/popular`,{ headers: headers})
  dispatch(drop(data.results))
 }


 const routers = createBrowserRouter([
  {path:'' ,element:<Layout/>  , children:[
    {index:true , element:<Home/>},
    {path:'movies' , element:<Movies/>},
    {path:'tvshow' , element:<Tvshow/>},
    {path:'movies/:id' , element:<MoviesDetails/>},
    {path:'tvshow/:id' , element:<TvshowDetails/>},
    {path:'search/:id' , element:<Search/>},
                                   ]},
 ])



useEffect(()=>{
getConfig()  
} ,[])
  return <>
<RouterProvider router={routers}></RouterProvider>

    </>

  ;
}

export default App;
