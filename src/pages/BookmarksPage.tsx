
import useEventListener from "@use-it/event-listener";
import React, { useEffect, useState } from "react";
import BookmarkForm from "../components/UI/BookmarkForm/BookmarkForm";
import BookmarkList from "../components/UI/BookmarkList/BookmarkList";
import Loading from "../components/UI/Loading/Loading";
import Modal from "../components/UI/Modal/Modal";
import BookmarkDto from "../domain/dto/BookmarkDto";
import IBookmarksRepository from "../domain/repository/IBookmarksRepository";
import cl from './BookmarksPage.module.css'

interface Props {
    bookmarksRepository: IBookmarksRepository;
}

const BookmarksPage = (props: Props) => {

    const [modal, setModal] = useState(false);

    let [newBookmarkId, setNewBookmarkId] = useState("");

    let [bookmarks, setBookmarks] = useState(
        [] as BookmarkDto[]
    )

    let [loading, setLoading] = useState(false);

    const loadBookmarks = async(success: (bookmarks: BookmarkDto[]) => void, error: (e: any) => void) => {
        try {
            const bookmarks = await props.bookmarksRepository.getBookmarks();
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
    }, [])

    const doUpdatePoll = async () => {
        console.log("Updating...");
        setBookmarks(await props.bookmarksRepository.getBookmarks());
    }

    const scheduleUpdatePoll = async () => {
        setTimeout(() => {
            doUpdatePoll();
        }, 2000)
    }

    const addBookmark = async (newBookmark: BookmarkDto) => {
        setModal(false);
        setNewBookmarkId(newBookmark.id);
        // setBookmarks([...bookmarks, newBookmark]);
        await props.bookmarksRepository.addBookmark(newBookmark);
        doUpdatePoll();
    }

    const removeBookmark = async (bm: BookmarkDto) => {
        setNewBookmarkId("");
        await props.bookmarksRepository.removeBookmark(bm);
        // setBookmarks(await props.bookmarksRepository.getBookmarks());
        doUpdatePoll();
    }

    // const updatePollCallbask = useCallback(() => doUpdatePoll(), []); // doUpdatePoll

    // useCallback for doUpdatePoll

    useEffect(() => {
        const interval = setInterval(() => doUpdatePoll(), 20 * 1000);
        return () => clearInterval(interval);
    }, []);

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

            {
                loading ? 
                <Loading /> 
                : 
                <BookmarkList bookmarks={bookmarks} 
                        newBookmarkId={newBookmarkId}
                        onRemoveBookmark={(bm: BookmarkDto) => removeBookmark(bm)} 
                        onBookmarkContentsChanged={async (bm: BookmarkDto, new_contents: string) => {
                            // setBookmarks(bookmarks.map(b => b.id === bm.id ? {...bm, contents: new_contents} : b));
                            await props.bookmarksRepository.editBookmark({...bm, contents: new_contents});
                            doUpdatePoll();
                        }}
                        />
            }
            
        </div>
    )
}

export default BookmarksPage;