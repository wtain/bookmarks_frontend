
import React from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import Bookmark from "../Bookmark/Bookmark";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import cl from './BookmarkList.module.css'
import { Flex } from "reflexy";

interface Props {
    bookmarks: BookmarkDto[];
    onRemoveBookmark: (bm: BookmarkDto) => void;
    onBookmarkContentsChanged: (bm: BookmarkDto, new_contents: string) => void;
    newBookmarkId? :string;
}

const BookmarkList: React.FC<Props> = (props: Props) => {
    if (props.bookmarks.length === 0) {
        return (<div>(No bookmarks)</div>)
    }
    return (
        <div>
            <Flex>
                <TransitionGroup>
                {
                    props.bookmarks.map(bm => 
                            <CSSTransition 
                                key={bm.id} 
                                timeout={500} 
                                classNames={{
                                    enterActive: cl.bookmarkEnterActive,
                                    enter: cl.bookmarkEnter,
                                    exit: cl.bookmarkExit,
                                    exitActive: cl.bookmarkExitActive
                                }}>
                                <Bookmark
                                        highlightJustAdded={props.newBookmarkId! === bm.id}
                                        bookmark={bm} 
                                        doRemove={props.onRemoveBookmark}
                                        doChangeContents={(new_contents: string) => {
                                            props.onBookmarkContentsChanged(bm, new_contents)
                                        }}
                                />
                            </CSSTransition>
                            )
                }
                </TransitionGroup>
            </Flex>
        </div>
    )
}

export default BookmarkList;