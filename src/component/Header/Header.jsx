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
  },[topics])
  
  console.log(topics);

  return (
    <header>
        <div className="container">
            <div className="leftBlock">
              <Link to='/'>
                <h1>Logo</h1>
              </Link>
            </div>
            <div className="rightBlock">
              {
                topics.map((topic)=>{
                   return <Link to={`/photos/${topic.title}`}>{topic.title}</Link>
                })
              }
            </div>
        </div>
    </header>
  )
}

export default Header