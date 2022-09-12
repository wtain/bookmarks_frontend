
import useEventListener from "@use-it/event-listener";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookmarkForm from "../components/UI/BookmarkForm/BookmarkForm";
import BookmarkList from "../components/UI/BookmarkList/BookmarkList";
import Filter from "../components/UI/Filter/Filter";
import Loading from "../components/UI/Loading/Loading";
import Modal from "../components/UI/Modal/Modal";
import TagCloud from "../components/UI/TagCloud/TagCloud";
import BookmarkDto from "../domain/dto/BookmarkDto";
import TagDto from "../domain/dto/TagDto";
import IBookmarksRepository from "../domain/repository/bookmarks/IBookmarksRepository";
import ITagsRepository from "../domain/repository/tags/ITagsRepository";
import cl from './BookmarksPage.module.css'

interface Props {
    bookmarksRepository: IBookmarksRepository;
    tagsRepository: ITagsRepository;
}

const BookmarksPage = (props: Props) => {

    const [modal, setModal] = useState(false);

    const { tag, id } = useParams();

    let [newBookmarkId, setNewBookmarkId] = useState("");

    let [bookmarks, setBookmarks] = useState(
        [] as BookmarkDto[]
    )

    let [loading, setLoading] = useState(false);

    const getData = async (): Promise<BookmarkDto[]> => {
        if (id) {
            return [await props.bookmarksRepository.getBookmark(id)];
        }
        return await (tag ? 
                props.bookmarksRepository.getBookmarksByTag(tag) : 
                props.bookmarksRepository.getBookmarks());
    }

    const loadBookmarks = async (success: (bookmarks: BookmarkDto[]) => void, error: (e: any) => void) => {
        try {
            const bookmarks = await getData();
            success(bookmarks)
        } catch (e) {
            error(e)
        }
    }

    useEffect(() => {
        setLoading(true);
        loadBookmarks((bookmarks: BookmarkDto[]) => {
            setBookmarks(bookmarks)
            setLoading(false);
        }, 
            (e) => {
                setLoading(false);
            })
    }, [tag, id])

    const doUpdatePoll = async () => {
        setBookmarks(
            await getData()
            );
    }

    const addBookmark = async (newBookmark: BookmarkDto) => {
        setModal(false);
        setNewBookmarkId(newBookmark.id);
        await props.bookmarksRepository.addBookmark(newBookmark);
        doUpdatePoll();
    }

    const removeBookmark = async (bm: BookmarkDto) => {
        setNewBookmarkId("");
        await props.bookmarksRepository.removeBookmark(bm);
        doUpdatePoll();
    }

    useEffect(() => {
        const interval = setInterval(() => doUpdatePoll(), 20 * 1000);
        return () => clearInterval(interval);
    }, [tag, id]);

    useEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === "a" && e.ctrlKey) {
            setModal(true);
            e.stopPropagation();
        } else if (e.key === "Escape" && modal) {
            setModal(false);
        }
    })

    return (
        <div>
            <Modal visible={modal} setVisible={setModal}>
                <BookmarkForm 
                        create={addBookmark} 
                        visibility={modal}
                        validation={(bookmark: BookmarkDto) => bookmark.contents.trim().length > 0 && bookmark.summary.trim().length > 0} />
            </Modal>
            <button onClick={() => setModal(true)} className={cl.btn_add}>
                Add...
            </button>

            <Filter tagsRepository={props.tagsRepository} />

            {
                loading ? 
                <Loading /> 
                : 
                <BookmarkList bookmarks={bookmarks} 
                        newBookmarkId={newBookmarkId}
                        onRemoveBookmark={(bm: BookmarkDto) => removeBookmark(bm)} 
                        onBookmarkContentsChanged={async (bm: BookmarkDto, new_contents: string) => {
                            await props.bookmarksRepository.editBookmark({...bm, contents: new_contents, updated: new Date().toLocaleString()});
                            doUpdatePoll();
                        }}
                        onBookmarkSummaryChanged={async (bm: BookmarkDto, new_summary: string) => {
                            await props.bookmarksRepository.editBookmark({...bm, summary: new_summary, updated: new Date().toLocaleString()});
                            doUpdatePoll();
                        }}
                        onBookmarkTagAdded={async (bm: BookmarkDto, new_tag: TagDto) => {
                            await props.bookmarksRepository.editBookmark({...bm, tags: [...bm.tags, new_tag], updated: new Date().toLocaleString()});
                            doUpdatePoll();
                        }}
                        onBookmarkTagRemoved={async (bm: BookmarkDto, index: number) => {
                            await props.bookmarksRepository.editBookmark({...bm, tags: bm.tags.filter((v, i) => i !== index), updated: new Date().toLocaleString()});
                            doUpdatePoll();
                        }}
                        onBookmarkIsDoneChanged={async (bm: BookmarkDto, new_value: boolean) => {
                            await props.bookmarksRepository.editBookmark({...bm, isDone: new_value, updated: new Date().toLocaleString()});
                            doUpdatePoll();
                        }}
                        />
            }
            
        </div>
    )
}

export default BookmarksPage;