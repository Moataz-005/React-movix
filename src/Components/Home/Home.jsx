import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import style from './Home.module.css'
import Tranding from '../Pages/Tranding/Tranding'
import MostPopular from '../Pages/MostPopular/MostPopular'
import TopRelated from '../Pages/TopRelated/TopRelated'
import axios from 'axios'
import { Token } from '../../Utils/Utils'
import { useNavigate } from 'react-router-dom'
export default function Home() {
let  navigate =   useNavigate()
let [Background ,SetBackground] = useState('') 
let [Query , setQuery] = useState('')

const searchQueryhandel =(event)=>{
if(event.key === "Enter" && Query.length > 0){
navigate(`/search/${Query}`)
}
}


let {imageSize} = useSelector((store)=> store)


const index = Math.floor(Math.random() * 20)
useEffect(()=>{
  if(imageSize.baseUrl && imageSize.backdrop ){
const bg =`${imageSize.baseUrl?.backdrop}${imageSize.backdrop[index]?.backdrop_path}`
SetBackground(bg)
  }


} ,[imageSize])




  return <>
  <div className={style.homeland} style={{backgroundImage:`url(${Background})`}}>
    <div className={style.opcity}></div>
    <div className={style.contant}>
    <h1>Weclcome.</h1>
    <p>Millions of movies, TV shows and people to discover. Explore now.</p>
    <div className='search d-flex align-items-md-center'>
      <input onChange={(e)=>{setQuery(e.target.value)}} onKeyUp={searchQueryhandel} type="text" placeholder='Search for a movie or tv show' className={`form-control ${style.inp}`}/><button>Search</button>
    </div>
    </div>

  </div>
  <div className={`container`}>
    <Tranding/>
   <MostPopular/>
  <TopRelated/>   
  </div>
  </>
}
