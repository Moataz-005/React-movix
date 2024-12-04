import  BaseFetch  from "../Utils/Utils"

  
export  async function DynamicFetch(url) {
    
  const response = await BaseFetch(url)
  console.log(response)
    return response

}

