import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiLogoutBoxRLine } from "react-icons/ri";

const SideMenu = ({ nameHrefTupleList }) => {

    // const linkDefault = {   
    //     padding: "8px 8px 8px 32px",
    //     textDecoration: "none",
    //     fontSize: "25px",
    //     color: "#000000",
    //     display: "block",
    //     transition: "0.3s",
    // };

    // const linkClicked = {   
    //     padding: "8px 8px 8px 32px",
    //     textDecoration: "none",
    //     fontSize: "25px",
    //     color: "#000000",
    //     display: "block",
    //     transition: "0.3s",
    //     backgroundColor: "white",
    // };
    const location = useLocation()
    return (
        <div id="mySidenav" className="topnav">
            <div className='topnav-left'>
                <ul>
                    {nameHrefTupleList.map((item, id)=>(
                        <li key={id}>
                            <Link to={item[1]} className={location.pathname.startsWith(item[1])?'current':''} >{item[0]}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='topnav-right'>
                <div className='link-wrap'>
                    <a href={'/login/'}><RiLogoutBoxRLine color={'white'} size={'20px'} /> Logout</a>
                </div>
            </div>
        </div>
    )
}

export default SideMenu