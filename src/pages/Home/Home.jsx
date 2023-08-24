import axios from "axios";
import { useEffect, useState } from "react";
import { DATA_LIST } from "../../utils";
import PhotoBlock from "../../component/PhotoBlock/PhotoBlock";
import "./Home.scss";
import HeroBanner from "../../component/HeroBanner/HeroBanner";

const Home = () => {

  const [photoList, setPhotoList] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch Data
  const getData = async () => {
    try {
      const result = await axios.get(`${DATA_LIST}&page=${page}`);
      setPhotoList((prev) => [...prev, ...result?.data]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(photoList);

  useEffect(() => {
    getData();
  }, [page]);

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
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight - 500
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
    <>
      <HeroBanner/>
      <div className="container">
        <div className="photosWrap">
          {photoList.map((item) => {
            return <PhotoBlock item={item} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
