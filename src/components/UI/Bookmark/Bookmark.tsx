
import React, { useEffect, useMemo, useState } from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import cl from './Bookmark.module.css'
import Collapsible from 'react-collapsible';
import ReactHelpers from "../../../utils/ReactHelpers";
import BookmarkEdit from "./detail/BookmarkEdit";
import BookmarkHeader from "./detail/BookmarkHeader";
import TagsEditor from "../TagsEditor/TagsEditor";
import TagDto from "../../../domain/dto/TagDto";
// todo: remove TimeAgo dependency
// import TimeAgo from 'javascript-time-ago'

// import en from 'javascript-time-ago/locale/en.json'
// import moment from "moment";
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

    // const rtf = new Intl.RelativeTimeFormat('en', { style:'narrow'});
    // const elapsed = Date.now() - Date.parse(props.bookmark.created);
    // rtf.format(elapsed, "")

    
    const createdAgo = parseDateTimeFromMongo(props.bookmark.created);
    const updatedAgo = parseDateTimeFromMongo(props.bookmark.updated);

    // hack
    // const localFormat = "DD.MM.YYYY, HH:mm:ss";

    // let createdAgo: any;
    // try {
    //     createdAgo = timeAgo.format(moment(props.bookmark.created, localFormat).toDate());
    // } catch (e: any) {
    //     const fallbackFormat = "MM/DD/YYYY, h:mm:ss A";
    //     createdAgo = timeAgo.format(moment(props.bookmark.created, fallbackFormat).toDate());
    // }
    // // const createdAgo = props.bookmark.created;

    // let updatedAgo = undefined;
    // if (props.bookmark.updated !== undefined) {
    //     try {
    //         updatedAgo = timeAgo.format(moment(props.bookmark.updated, localFormat).toDate());;
    //     } catch (e: any) {
    //     }
    // }

    // useEffect(() => TimeAgo.addDefaultLocale(en));

    useEffect(() => {
        if (props.highlightJustAdded) {
            ReactHelpers.scrollToRef(divRef)
        }
    }, [props.highlightJustAdded])

    const showExpanded = props.highlightJustAdded! || props.showExpanded!;

    // const [showSummaryPreview, setShowSummaryPreview] = useState(!showExpanded);

    // const showSummaryPreview = !showExpanded;

    // todo: Read the state of Collapsible to pass it to the BookmarkHeader

    // todo: Make it possible to set it as non-collapsible (See BookmarkPage)

    const bookmarkHeader = useMemo(() => {
        return () => (
            <BookmarkHeader bookmark={props.bookmark}
            showSummaryPreview={props.showPreview}
            doRemove={props.doRemove!}
            onIsDoneChanged={(new_value: boolean) => {
                if (props.doChangeIsDone) {
                    props.doChangeIsDone(new_value);
                }
            }}
            onAcceptEdit={(new_summary: string) => {
                if (props.doChangeSummary) {
                    props.doChangeSummary(new_summary);
                }
            }} />
        )
    }, []);

    const bookmarkIntrinsics = useMemo(() => {
        return () => (
            <>
                <div className={cl.created}>Created: {createdAgo}</div>
                {
                    (props.bookmark.updated !== undefined) ? 
                    <div className={cl.created}>Updated: {updatedAgo}</div> : <></>
                }

                <BookmarkEdit initialContents={props.bookmark.contents} 
                    onAcceptEdit={(new_contents: string) => {
                                if (props.doChangeContents) {
                                    props.doChangeContents(new_contents);
                                }
                            }} />
                <br />
                <TagsEditor 
                    containerClass={cl.tags_container}
                    tags={props.bookmark.tags} 
                    onTagAdded={(tag: TagDto) => {
                        if (props.doAddTag) {
                            props.doAddTag(tag);
                        }
                    }} 
                    onDelete={(index: number) => {
                        if (props.doRemoveTag) {
                            props.doRemoveTag(index);
                        }
                    }} />
            </>
        );
    }, []);

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