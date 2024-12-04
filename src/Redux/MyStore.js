import {configureStore}  from  '@reduxjs/toolkit'
import imageConfig from './ImageSizeConfig'

export const  MyStore = configureStore({
    reducer:{
     imageSize:imageConfig
    },
    
})