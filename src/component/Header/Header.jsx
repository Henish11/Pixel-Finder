import React from 'react'
import {ReactComponent as SiteLogo} from '../../assets/site-logo.svg'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <div className="container">
            <div className="leftBlock">
              <Link to='/'>
                <h1>Logo</h1>
              </Link>
            </div>
            <div className="rightBlock">
              <Link to='/'>Home</Link>
            </div>
        </div>
    </header>
  )
}

export default Header