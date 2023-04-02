import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiLogoutBoxRLine } from "react-icons/ri";
import HamburgerMenu from './HamburgerMenu';

const SideMenu = ({ nameHrefTupleList }) => {

    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1030);
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const location = useLocation()

    const menuItems = () => {
        return(
            <ul>
                {nameHrefTupleList.map((item, id)=>(
                    <li key={id}>
                            <Link to={item[1]} className={location.pathname.startsWith(item[1])?'current':''} >{item[0]}</Link>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <>
            <div className="topnav">
                <div className='topnav-left'>
                    {isMobile ? <HamburgerMenu toggleMenu={()=>setIsOpen(true)} /> : menuItems()}
                </div>
                <div className='topnav-right'>
                    <div className='link-wrap'>
                        <a href={'/login/'}><RiLogoutBoxRLine color={'white'} size={'20px'} /> Logout</a>
                    </div>
                </div>
            </div>


            {isMobile&&<div className='sidenav' style={isOpen?{width: '360px'}:{width: '0px'}}>
                {nameHrefTupleList.map((item, id)=>(
                    <Link key={id} to={item[1]} className={location.pathname.startsWith(item[1])?'current':''} onClick={()=>setIsOpen(false)} >{item[0]}</Link>
                ))}
            </div>}

            {isOpen&&<div className='overlay' onClick={()=>setIsOpen(false)}></div>}
            
        </>
    )
}

export default SideMenu