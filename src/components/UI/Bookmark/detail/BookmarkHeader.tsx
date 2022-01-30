
import React from "react";
import ReactTooltip from "react-tooltip";
import BookmarkDto from "../../../../domain/dto/BookmarkDto";
import cl from '../Bookmark.module.css'

interface Props {
    bookmark: BookmarkDto;
    doRemove: (bm: BookmarkDto) => void;
}

const BookmarkHeader = (props: Props) => {
    return (
        <>
            <div className={cl.summary} data-tip data-for="registerTip">
                {props.bookmark.summary}

                <button className={cl.btn_remove} 
                        onClick={() => props.doRemove(props.bookmark)}>
                            x
                </button>
            </div>

            <ReactTooltip className={cl.id} id="registerTip" place="left" effect="float">
                {props.bookmark.id}
            </ReactTooltip>
        </>
    )
}

export default BookmarkHeader;