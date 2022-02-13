
import React, { useEffect, useState } from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import cl from './Bookmark.module.css'
import Collapsible from 'react-collapsible';
import ReactHelpers from "../../../utils/ReactHelpers";
import BookmarkEdit from "./detail/BookmarkEdit";
import BookmarkHeader from "./detail/BookmarkHeader";
import TagsEditor from "../TagsEditor/TagsEditor";
import TagDto from "../../../domain/dto/TagDto";

interface Props {
    bookmark: BookmarkDto
    doRemove: (bm: BookmarkDto) => void;
    doChangeContents: (new_contents: string) => void;
    doChangeSummary: (new_summary: string) => void;
    doAddTag: (tag: TagDto) => void;
    doRemoveTag: (index: number) => void;
    doChangeIsDone: (new_value: boolean) => void;
    highlightJustAdded?: boolean;
}

const Bookmark = (props: Props) => {

    const divRef = React.useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (props.highlightJustAdded) {
            ReactHelpers.scrollToRef(divRef)
        }
    }, [props.highlightJustAdded])

    
    return (
        <div className={cl.bookmark} ref={divRef}>
            <Collapsible open={props.highlightJustAdded!} 
                         trigger={<BookmarkHeader bookmark={props.bookmark} 
                         doRemove={props.doRemove}
                         onIsDoneChanged={(new_value: boolean) => {
                             props.doChangeIsDone(new_value);
                         }}
                         onAcceptEdit={(new_summary: string) => {
                           props.doChangeSummary(new_summary);
                       }} />}>
                
                <div className={cl.created}>Created: {props.bookmark.created}</div>
                {
                    (props.bookmark.updated !== undefined) ? 
                    <div className={cl.created}>Updated: {props.bookmark.updated}</div> : <></>
                }

                <BookmarkEdit initialContents={props.bookmark.contents} 
                            onAcceptEdit={(new_contents: string) => {
                                props.doChangeContents(new_contents);
                            }} />
                <br />
                <TagsEditor 
                    containerClass={cl.tags_container}
                    tags={props.bookmark.tags} 
                    onTagAdded={(tag: TagDto) => {
                        props.doAddTag(tag);
                    }} 
                    onDelete={(index: number) => {
                        props.doRemoveTag(index);
                    }} />
            </Collapsible>
        </div>
    )
}

export default Bookmark;