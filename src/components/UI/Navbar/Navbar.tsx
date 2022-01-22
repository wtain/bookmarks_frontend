
import React from "react"
import {Link} from "react-router-dom";
import cl from './Navbar.module.css'

const Navbar: React.FC = () => {
    return (
        <div className={cl.navbar}>
            <div className={cl.navBar__links}>
                <Link to="/bookmarks" className={cl.link}>Bookmarks</Link>
            </div>
        </div>
    )
}

export default Navbar;