
import React from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import Bookmark from "../Bookmark/Bookmark";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import cl from './BookmarkList.module.css'
import { Flex } from "reflexy";
import TagDto from "../../../domain/dto/TagDto";

interface Props {
    bookmarks: BookmarkDto[];
    onRemoveBookmark?: (bm: BookmarkDto) => void;
    onBookmarkContentsChanged?: (bm: BookmarkDto, new_contents: string) => void;
    onBookmarkSummaryChanged?: (bm: BookmarkDto, new_summary: string) => void;
    onBookmarkTagAdded?: (bm: BookmarkDto, new_tag: TagDto) => void;
    onBookmarkTagRemoved?: (bm: BookmarkDto, index: number) => void;
    onBookmarkIsDoneChanged?: (bm: BookmarkDto, new_value: boolean) => void;
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
                                <Bookmark key={bm.id}
                                        highlightJustAdded={props.newBookmarkId! === bm.id}
                                        bookmark={bm} 
                                        doRemove={props.onRemoveBookmark}
                                        doChangeContents={(new_contents: string) => {
                                            props.onBookmarkContentsChanged!(bm, new_contents)
                                        }}
                                        doChangeSummary={(new_summary: string) => {
                                            props.onBookmarkSummaryChanged!(bm, new_summary)
                                        }}
                                        doAddTag={(tag: TagDto) => {
                                            props.onBookmarkTagAdded!(bm, tag);
                                        }}
                                        doRemoveTag={(index: number) => {
                                            props.onBookmarkTagRemoved!(bm, index);
                                        }}
                                        doChangeIsDone={(new_value: boolean) => {
                                            props.onBookmarkIsDoneChanged!(bm, new_value);
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