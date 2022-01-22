
import React, { useEffect, useRef } from "react";
import TagDto from "../../../domain/dto/TagDto";
import Tag from "./Tag";
import cl from './TagsEditor.module.css'

interface Props {
    tags: TagDto[];
    onTagAdded: () => void;
    currentTag: TagDto;
    onCurrentTagChange: (tagName: string) => void;
    onDelete: (index: number) => void;
}

const TagsEditor: React.FC<Props> = (props: Props) => {

    // useEffect(() => {
    //     // if (inputRef.current !== null) {
    //     //     inputRef.current.focus();
    //     // }
    // })

    // const inputRef = useRef<HTMLInputElement | null>(null);
    // ref={inputRef} 

    return (
        <div className={cl.container}>
            {
                props.tags.map((tag, i) => <Tag key={tag.id} tag={tag} onDelete={() => props.onDelete(i)} />)
            }
            <span className={cl.sp}>
                <input 
                        value={props.currentTag.name} 
                        onChange={(e) => props.onCurrentTagChange(e.target.value)} 
                        className={cl.input} 
                        placeholder="Tags"
                        onKeyDown={(e) => {
                            if (e.code === "Space" || e.code === "Tab") {
                                if (props.currentTag.name.trim().length > 0) {
                                    props.onTagAdded();
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