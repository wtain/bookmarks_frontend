import styled from 'styled-components'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as FaIcons from 'react-icons/fa' 

import { SidebarData } from './SidebarData'
import SearchBox from '../SearchBox/SearchBox'
import AuthService from '../../../services/AuthService'

const NavbarContainer = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    height: 3.5rem;
    background-color: darkgray;
    position: sticky;
    left: 0px;
    top: 0px;
    border-bottom: 2px solid black;
`

const MenuIconOpen = styled(Link)`
    display: flex;
    justify-content: start;
    font-size: 1.5rem;
    margin-left: 2rem;
    margin-right: 1rem;
    color: black;
`

const MenuIconClose = styled(Link)`
    display: flex;
    justify-content: end;
    font-size: 1.5rem;
    margin-top: 0.75rem;
    margin-right: 1rem;
    color: black;
`

const SidebarMenu = styled.div<{close: boolean}>`
    width: 250px;
    height: 100vh;
    background-color: darkgray;
    position: fixed;
    top: 0;
    left: ${({ close}) => close ? '0' : '-100%'};
    transition: .6s;
    border-right: 2px solid black;
`

const MenuItems = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 35px;
    padding: 0rem 0 0rem;
`

const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-size: 20px;
    text-decoration: none;
    color: black;

    &:hover {
        background-color: lightgray;
        color: black;
        width: 100%;
        height: 45px;
        text-align: center;
        border-radius: 5px;
        margin: 0 2rem;
    }
`

// https://annysah.hashnode.dev/build-a-sidebar-menu-with-react-typescript-and-styled-components-ckwkykpm80hs7gns112nycvvy

const Sidebar: React.FunctionComponent = () => {

    const navigate = useNavigate();

    const [close, setClose] = useState(false)
    const showSidebar = () => setClose(!close)

    return (
        <>
            <NavbarContainer>
              <MenuIconOpen to="#" onClick={showSidebar}>
                <FaIcons.FaBars />
              </MenuIconOpen>
          
              <SearchBox />

              {AuthService.isLoggedIn() ? (
                <div>
                    <a href='#' onClick={async () => {
                        await AuthService.logout()
                            .then(() => {
                                navigate("/");
                            })
                    }}>
                        Logout
                    </a>
                </div>
              ) : ""}
            </NavbarContainer>

            <SidebarMenu close={close}>
                <MenuIconClose to="#" onClick={showSidebar}>
                    <FaIcons.FaTimes />
                </MenuIconClose>

                {SidebarData.map((item, index) => {
                    return (
                        <MenuItems key={index}>
                            <MenuItemLinks to={item.path}>
                                {item.icon}
                                <span style={{marginLeft: '16px'}}>{item.title}</span>
                            </MenuItemLinks>
                        </MenuItems>
                    )
                })}
            </SidebarMenu>
        </>
    )
}

export default Sidebar
