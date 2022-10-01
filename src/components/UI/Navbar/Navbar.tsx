
import React from "react"
import { NavLink } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";
import cl from './Navbar.module.css'

const Navbar: React.FC = () => {
    return (
        <div className={cl.navbar}>
            <div className={cl.navBar__links}>
                <NavLink to="/bookmarks" className={cl.link}>Bookmarks</NavLink>
                <NavLink to="/tags" className={cl.link}>Tags</NavLink>
                <NavLink to="/calendar" className={cl.link}>Calendar</NavLink>

                <SearchBox />
            </div>
        </div>
    )
}

export default Navbar;