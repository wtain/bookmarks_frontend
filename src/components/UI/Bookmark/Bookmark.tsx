
import React, { useEffect, useState } from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import cl from './Bookmark.module.css'
import Collapsible from 'react-collapsible';
import ReactHelpers from "../../../utils/ReactHelpers";
import BookmarkEdit from "./detail/BookmarkEdit";
import BookmarkHeader from "./detail/BookmarkHeader";
import Tag from "../TagsEditor/Tag";

interface Props {
    bookmark: BookmarkDto
    doRemove: (bm: BookmarkDto) => void;
    doChangeContents: (new_contents: string) => void;
    doChangeSummary: (new_summary: string) => void;
    highlightJustAdded?: boolean;
}

const Bookmark = (props: Props) => {

    const divRef = React.useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (props.highlightJustAdded) {
            ReactHelpers.scrollToRef(divRef)
        }
    }, [props.highlightJustAdded])

    const [isedit, setIsEdit] = useState(false)
    
    return (
        <div className={cl.bookmark} ref={divRef}>
            <Collapsible open={props.highlightJustAdded!} 
                         trigger={<BookmarkHeader bookmark={props.bookmark} 
                         doRemove={props.doRemove} onCancelEdit={() => setIsEdit(false)} 
                         onAcceptEdit={(new_summary: string) => {
                           setIsEdit(false);
                           props.doChangeSummary(new_summary);
                       }} />}>
                
                <div className={cl.created}>Created: {props.bookmark.created}</div>

                {
                    <BookmarkEdit initialContents={props.bookmark.contents} 
                                      onCancelEdit={() => setIsEdit(false)} 
                                      onAcceptEdit={(new_contents: string) => {
                                        setIsEdit(false);
                                        props.doChangeContents(new_contents);
                                    }} />
                }
                <br />
                {props.bookmark.tags.map((t, i) => <Tag key={t.id} tag={t} />)}
            </Collapsible>
        </div>
    )
}

export default Bookmark;