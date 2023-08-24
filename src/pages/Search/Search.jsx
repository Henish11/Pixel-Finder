import {useEffect, useState} from 'react'
import { SEARCH_PHOTO } from '../../utils'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PhotoBlock from '../../component/PhotoBlock/PhotoBlock'

const Search = () => {

  const [searchList,setSearchList] = useState([])
  const [page,setPage] = useState(1)
  const queryData = useParams()
  const updatedQuery = queryData.query.replaceAll(' & ','-')

  console.log(updatedQuery);

  const getSearchList = async () =>{
    const result = await axios.get(`${SEARCH_PHOTO}&query=${updatedQuery}&page=${page}`)
    setSearchList((prev)=>[...prev,...result?.data?.results])
  }
  useEffect(()=>{
    getSearchList()
  },[page,updatedQuery])

  console.log(searchList);


  // Infinite Scroll

  const myDebouunce = (cb,delay)=>{
     let timer;
     return function(){
       if(timer) clearTimeout(timer)
       timer = setTimeout(()=>{
           cb()
        },delay)
     }
  }
  const debounce = myDebouunce(()=>{
    setPage((prev) => prev + 1);
  },200)

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=  document.documentElement.scrollHeight - 500
    ) {
      debounce()
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='searchResult'>
      <div className="container">
        <div className="topBar">
          <h1>{updatedQuery}</h1>
        </div>
        {
          searchList.length === 0 ? setTimeout(()=>{<h2>No Result Found for : {updatedQuery}</h2>},100)  :
          <div className="photosWrap">
          { searchList.length > 0 && searchList.map((item) => {
            return <PhotoBlock item={item} key={item.id} />;
          })}
        </div>
        }
      </div>
    </div>
  )
}

export default Search