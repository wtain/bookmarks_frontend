
import React, { useEffect } from "react";
import TagDto from "../../../domain/dto/TagDto";
import BookmarkUtils from "../../../utils/BookmarkUtils";
import Tag from "./Tag";
import cl from './TagsEditor.module.css'

interface Props {
    tags: TagDto[];
    onTagAdded: (tag: TagDto) => void;
    onDelete: (index: number) => void;
}

const TagsEditor: React.FC<Props> = (props: Props) => {

    const [currentTag, setCurrentTag] = React.useState(BookmarkUtils.createNewTag());

    useEffect(() => {
        setCurrentTag(BookmarkUtils.createNewTag());
    }, [])

    const onTagAdded = () => {
        let value = currentTag.name.trim()
        if (value.length > 0) {
            if (props.tags.find(t => t.name === value) === undefined) {
                props.onTagAdded({...currentTag, name: value});                
            }
            setCurrentTag(BookmarkUtils.createNewTag());
        }
    }

    const onCurrentTagChange = (v: string) => {
        let p = v.indexOf(" ")
        if (p != -1) {
            let value = v.substring(0, p).trim();
            if (value.length > 0) {
                props.onTagAdded({...currentTag, name: value});
            }
            setCurrentTag({ ...BookmarkUtils.createNewTag(), name: v.substring(p+1) })
        } else {
            setCurrentTag({ ...currentTag, name: v })
        }
    }

    return (
        <div className={cl.container}>
            {
                props.tags.map((tag, i) => <Tag key={tag.id} tag={tag} onDelete={() => props.onDelete(i)} />)
            }
            <span className={cl.sp}>
                <input 
                        value={currentTag.name} 
                        onChange={(e) => onCurrentTagChange(e.target.value)} 
                        className={cl.input} 
                        placeholder="Tags"
                        onKeyDown={(e) => {
                            if (e.code === "Space" || e.code === "Tab") {
                                if (currentTag.name.trim().length > 0) {
                                    onTagAdded();
                                    e.stopPropagation();
                                }
                            }
                        }
                } />
            </span>
        </div>
    )
}

export default TagsEditor;