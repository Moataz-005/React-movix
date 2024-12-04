import React from 'react'
import style from './Footer.module.css'
import { FaFacebookF , FaInstagram , FaTwitter  , FaLinkedin } from "react-icons/fa";
export default function Footer() {
  return <>
  
  <div className={style.parent}>
    <div className={style.child}>
       <ul>
        <li>Terms Of us</li>
        <li>Privice-Police</li>
        <li>About</li>
        <li>Blog</li>
        <li>FAQ</li>
       </ul>
       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, neque atque voluptas quisquam libero hic inventore! Commodi architecto repudiandae quae praesentium aperiam, ex nesciunt molestiae illo perspiciatis necessitatibus minima et!</p>
    </div>
    <div className={style.awesome}>
    <i className="fa-brands fa-linkedin"></i>
        <div><FaFacebookF/></div>
        <div><FaInstagram/></div>
        <div><FaTwitter/></div>
        <div><FaLinkedin/></div>
    </div>
  </div>
  
  
  </>
}
