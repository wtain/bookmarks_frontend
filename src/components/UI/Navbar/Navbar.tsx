
import React from "react"
import {Link} from "react-router-dom";
import cl from './Navbar.module.css'

const Navbar: React.FC = () => {
    return (
        <div className={cl.navbar}>
            <div className={cl.navBar__links}>
                <Link to="/bookmarks" className={cl.link}>Bookmarks</Link>
                <Link to="/tags" className={cl.link}>Tags</Link>
                <Link to="/calendar" className={cl.link}>Calendar</Link>
            </div>
        </div>
    )
}

export default Navbar;