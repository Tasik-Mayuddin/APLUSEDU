import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../../functions';


const SidePanel = ({ chats, role, switchChat, currentChatId }) => {



    return (
        <div id="sidepanel">
        <div id="profile">
            <div className="wrap">
                <p>Logged in as Mike Ross</p>
                <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                <div id="status-options">
                    <ul>
                    <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                    <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                    <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                    <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="contacts">
            <ul>
            {chats.length&&chats.map((item, id)=>(
                <li className={`contact${item.id===currentChatId?' active':''}`} key={id} onClick={()=>switchChat(item.id)}>
                    <div className="wrap">
                    {/* <span className="contact-status busy"></span> */}
                    {/* <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" /> */}
                    {role==='Parent'?
                        <div className="meta">
                            <p className="name">{item.tutor.username}</p>
                            {/* <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and htmlForty six other things.</p> */}
                        </div>:

                        <div className="meta">
                            <p className="name">{item.parent.username}</p>
                            {/* <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and htmlForty six other things.</p> */}
                        </div>
                    }
                    </div>
                </li>
            ))}
            </ul>
        </div>

        </div>

        // <div className='chat-sidepanel'>
        //     <div className='chat-profile'>
        //         <p>logged in as FYE</p>
        //     </div>
        //     <ul>
        //         {chats.length&&chats.map((item, id)=>(
        //             <li className="contact active" key={id} onClick={()=>switchChat(item.id)}>
        //                 <div className="wrap">
        //                     {role==='Parent'?
        //                         <div className="meta">
        //                             <p className="name">{item.tutor.username}</p>
        //                             <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and htmlForty six other things.</p>
        //                         </div>:

        //                         <div className="meta">
        //                             <p className="name">{item.parent.username}</p>
        //                             <p className="preview">Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and htmlForty six other things.</p>
        //                         </div>
        //                     }
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};


export default SidePanel;