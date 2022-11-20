
import React, { useEffect, useMemo } from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import cl from './Bookmark.module.css'
import Collapsible from 'react-collapsible';
import ReactHelpers from "../../../utils/ReactHelpers";
import BookmarkEdit from "./detail/BookmarkEdit";
import BookmarkHeader from "./detail/BookmarkHeader";
import TagsEditor from "../TagsEditor/TagsEditor";
import TagDto from "../../../domain/dto/TagDto";
// todo: remove TimeAgo dependency
import { parseDateTimeFromMongo } from "../../../utils/DateTimeUtils";


interface Props {
    bookmark: BookmarkDto
    doRemove?: (bm: BookmarkDto) => void;
    doChangeContents?: (new_contents: string) => void;
    doChangeSummary?: (new_summary: string) => void;
    doAddTag?: (tag: TagDto) => void;
    doRemoveTag?: (index: number) => void;
    doChangeIsDone?: (new_value: boolean) => void;
    highlightJustAdded?: boolean;
    showExpanded?: boolean;
    showPreview?: boolean;
    collapsible?: boolean;
}

const Bookmark = (props: Props) => {

    const divRef = React.useRef<null | HTMLDivElement>(null);

    const createdAgo = parseDateTimeFromMongo(props.bookmark.created);
    const updatedAgo = parseDateTimeFromMongo(props.bookmark.updated);

    useEffect(() => {
        if (props.highlightJustAdded) {
            ReactHelpers.scrollToRef(divRef)
        }
    }, [props.highlightJustAdded])

    const showExpanded = props.highlightJustAdded! || props.showExpanded!;

    // todo: Read the state of Collapsible to pass it to the BookmarkHeader

    const bookmarkHeader = useMemo(() => {
        return () => (
            <BookmarkHeader bookmark={props.bookmark}
                            showSummaryPreview={props.showPreview}
                            doRemove={props.doRemove!}
                            onIsDoneChanged={(new_value: boolean) => {
                                props.doChangeIsDone!(new_value);
                            }}
                            onAcceptEdit={(new_summary: string) => {
                                props.doChangeSummary!(new_summary);
                            }} />
        )
    }, [props.bookmark, props.showPreview]);

    const bookmarkIntrinsics = useMemo(() => {
        return () => (
            <>
                <div className={cl.created}>Created: {createdAgo} ({props.bookmark.created.toString()})</div>
                {
                    (props.bookmark.updated !== undefined) ? 
                    <div className={cl.created}>Updated: {updatedAgo} ({props.bookmark.updated.toString()})</div> : <></>
                }

                <BookmarkEdit initialContents={props.bookmark.contents} 
                    onAcceptEdit={(new_contents: string) => {
                        props.doChangeContents!(new_contents);
                    }} />
                <br />
                <TagsEditor 
                    containerClass={cl.tags_container}
                    tags={props.bookmark.tags} 
                    onTagAdded={(tag: TagDto) => {
                        props.doAddTag!(tag);
                    }} 
                    onDelete={(index: number) => {
                        props.doRemoveTag!(index);
                    }} />
            </>
        );
    }, [props.bookmark, createdAgo, updatedAgo]);

    if (props.collapsible) {
        return (
            <div className={cl.bookmark} ref={divRef}>
                <Collapsible open={showExpanded} 
                    trigger={bookmarkHeader()}>
                    
                    { bookmarkIntrinsics() }
                </Collapsible>
            </div>
        )
    }
    else {
        return (
            <div className={cl.bookmark} ref={divRef}>
                { bookmarkHeader() }
                { bookmarkIntrinsics() }
            </div>
        )
    }
}

export default Bookmark;