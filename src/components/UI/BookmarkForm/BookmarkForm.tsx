
import React, { useEffect, useRef, useState } from "react";
import BookmarkDto from "../../../domain/dto/BookmarkDto";
import cl from './BookmarkForm.module.css'
import TagsEditor from "../TagsEditor/TagsEditor";
import TagDto from "../../../domain/dto/TagDto";
import BookmarkUtils from "../../../utils/BookmarkUtils";

interface Props {
    create?: (bookmark: BookmarkDto) => void;
    visibility: boolean;
    validation?: (bookmark: BookmarkDto) => boolean;
}

const BookmarkForm: React.FC<Props> = (props: Props) => {

    const EmptyBookmark = { summary: "", contents: "" };

    const [bookmark, setBookmark] = React.useState(EmptyBookmark);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tags, setTags] = useState<TagDto[]>([])
    
    const [valid, setValid] = React.useState(false);
    
    useEffect(() => {
        if (props.visibility) {
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }
        }
        setBookmark(EmptyBookmark);
        setTags([]);
    }, [props.visibility])

    const updateBookmark = (bookmark: BookmarkDto) => {
        setBookmark(bookmark);
        setValid(props.validation!(bookmark));
    }

    const doAddBookmark = () => {
        const newBookmark: BookmarkDto = BookmarkUtils.createBookmark(bookmark.summary, bookmark.contents, tags);
        if (!valid) {
            return;
        }
        props.create!(newBookmark);
        setBookmark(EmptyBookmark);
        setValid(false);
    }

    const addBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        doAddBookmark();
    }

    const form_classes = [cl.bookmark_form];
    form_classes.push(valid ? cl.form_valid : cl.form_invalid);

    return (
        <form className={form_classes.join(" ")}>
            <input
                    placeholder="Summary" 
                    value={bookmark.summary} 
                    onChange={(e) => updateBookmark({...bookmark, summary: e.target.value} as BookmarkDto)} 
                    className={cl.input}
                    ref={inputRef}
                    />
            <div className={cl.textarea_wrapper}>
                <textarea rows={3}
                            placeholder="Contents" 
                            value={bookmark.contents} 
                            onChange={(e) => updateBookmark({...bookmark, contents: e.target.value} as BookmarkDto)} 
                            className={cl.textarea}
                            onKeyDown={(e) => {
                                if (e.ctrlKey && e.key === "Enter") {
                                   doAddBookmark();
                                   e.stopPropagation();
                                }
                            }}
                            />
            </div>
            <TagsEditor 
                    containerClass={cl.tags_container}
                    tags={tags} 
                    onTagAdded={(tag: TagDto) => {
                        setTags([...tags, tag]);
                    }} 
                    onDelete={(index: number) => {
                        const new_tags = tags.filter((v, i) => i !== index);
                        setTags(new_tags)
                    }} />
            <button onClick={addBookmark} className={cl.button}>✔️Add</button>
        </form>
    )
}

export default BookmarkForm;