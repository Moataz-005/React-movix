import axios from 'axios'

export const Base_Url = "https://api.themoviedb.org/3/";

      //  const Api_Key = '9b936da21671babc36137380d1ace7d7'
export const Token =
  " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjkzNmRhMjE2NzFiYWJjMzYxMzczODBkMWFjZTdkNyIsIm5iZiI6MTcyODg1NTU4MS43NzI5NjksInN1YiI6IjY3MGMzZGEzYjE1ZDk3YjFhOTNjYzEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27ztPKQ-OFV9wuDVQ7Lluz_mZXX499dU8YIUolvpOOg";

const headers = {
  Authorization: Token,
};

export default  async function BaseFetch(url , param){  
  // try{
    // const {data} = await axios.get(`https://api.themoviedb.org/3/${url}` , { headers:headers } )
    // console.log(data)
    // return  data.results;

//   } catch(error){
//     return  error 
// }
}




