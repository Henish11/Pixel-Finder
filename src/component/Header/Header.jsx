import React, { useState,useEffect} from 'react'
import {ReactComponent as SiteLogo} from '../../assets/site-logo.svg'
import { Link } from "react-router-dom"
import axios from 'axios'
import { LIST_OF_TOPIC } from '../../utils'

const Header = () => {

  const [topics,setTopics] = useState([])

  const gettopic = async ()=>{
    const {data} = await axios.get(LIST_OF_TOPIC)
    setTopics(data)
  } 

  useEffect(() => {
    gettopic()
  },[])
  
  console.log(topics);

  return (
    <header>
        <div className="container">
            <div className="leftBlock">
              <Link to='/'>
                <SiteLogo/>
              </Link>
            </div>
            <div className="rightBlock">
              {
                topics.map((topic,index)=>{
                   return <Link key={index} to={`/photos/${topic.title}`}>{topic.title}</Link>
                })
              }
            </div>
        </div>
    </header>
  )
}

export default Header