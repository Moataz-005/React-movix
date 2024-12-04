import React from 'react'
import { Link } from 'react-router-dom'
import pict from '../../Assets/movix-logo.svg'
import  style from './Navbar.module.css'
import { CiSearch } from "react-icons/ci";
export default function Navbar() {

  return <>
  
 <nav className={`navbar navbar-expand-lg `}>
  <div className="container ">
    <Link className="navbar-brand" href="#" ><img src={pict} alt="" className={style.logo}  /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className={`navbar-nav ms-auto mb-2 mb-lg-0  p-0 ${style.ulColor}`}>
        <li className="nav-item" >
          <Link className="nav-link active" aria-current="page" to={'/movies'}>Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/tvshow'}>TV Show</Link>
        </li>
        {/* <li className="nav-item">
        <Link className="nav-link active" aria-current="page"><CiSearch/></Link>
         </li>
         */}

        
      </ul>
    </div>
  </div>
</nav>

  </>
}
