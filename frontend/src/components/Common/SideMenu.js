import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
        <div id="mySidenav" className="sidenav">
            
            {nameHrefTupleList.map((item, id)=>(

                <Link key={id} to={item[1]} className={location.pathname.startsWith(item[1])?'current':''} >{item[0]}</Link>

            ))}
        </div>
    )
}

export default SideMenu