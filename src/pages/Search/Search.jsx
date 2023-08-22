import {useEffect, useState} from 'react'
import { SEARCH_PHOTO } from '../../utils'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PhotoBlock from '../../component/PhotoBlock/PhotoBlock'

const Search = () => {

  const [searchList,setSearchList] = useState([])
  const [page,setPage] = useState(1)
  const {query} = useParams()
  console.log(query);

  const getSearchList = async () =>{
    const result = await axios.get(`${SEARCH_PHOTO}&query=${query}&page=${page}`)
    setSearchList((prev)=>[...prev,...result?.data?.results])
  }
  useEffect(()=>{
    getSearchList()
  },[page,query])

  console.log(searchList);

  const getTopicId = () =>{
      
  }



  // Infinite Scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight - 200
    ) {
      setPage((prev) => prev + 1);
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
          <h1>{query}</h1>
        </div>
        {
          searchList.length === 0 ? <h2>No Result Found for : {query}</h2> :
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