import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { RANDOM_PHOTO } from "../../utils"
import { useNavigate } from 'react-router-dom';
import {IoSearchOutline} from 'react-icons/io5'
import Img from '../Lazyload/Img';

const HeroBanner = () => {

    const [randomPhoto, setRandomPhoto] = useState([]);
    const [query,setQuery] = useState('')

    // Random Image
    const getRandomPhoto = async () => {
        try {
            const result = await axios.get(RANDOM_PHOTO);
            setRandomPhoto(result?.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getRandomPhoto();
    }, []);
    console.log(randomPhoto);

    // Search
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(query.length > 0){
            navigate(`/photos/${query}`)
        }
    }
    
    return (
    <div className="heroBanner">
        <Img
          className='bannerImage'
          src={randomPhoto?.urls?.raw}
          alt={randomPhoto?.alt_description}
        />
            
        <form className='searchForm' onSubmit={handleSubmit}>
          <h1>Pixel Finder</h1>
          <input type="text" placeholder="Search high-resolution images" value={query} onChange={(e)=>{setQuery(e.target.value)}}/>
          <button type="submit"><IoSearchOutline/></button>
        </form>
    </div>
  )
}

export default HeroBanner