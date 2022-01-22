
import React from "react";
import cl from './Loading.module.css'

const Loading: React.FC = () => {
    return (
        <div className={cl.wrapper}>
            <img className={cl.image} src="https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" />
        </div>
    )
}

export default Loading;