
import React, { useEffect } from "react";
import TagDto from "../../../domain/dto/TagDto";
import BookmarkUtils from "../../../utils/BookmarkUtils";
import {Tag} from '@shopify/polaris';
import cl from './TagsEditor.module.css'

interface Props {
    tags: TagDto[];
    onTagAdded?: (tag: TagDto) => void;
    onDelete?: (index: number) => void;
    containerClass?: string;
}

const TagsEditor: React.FC<Props> = (props: Props) => {

    const [currentTag, setCurrentTag] = React.useState(BookmarkUtils.createNewTag());
    const inputRef = React.useRef<null | HTMLInputElement>(null);

    useEffect(() => {
        setCurrentTag(BookmarkUtils.createNewTag());
    }, [])

    const onTagAdded = () => {
        const value = currentTag.name.trim()
        if (value.length > 0) {
            if (props.tags.find(t => t.name === value) === undefined) {
                props.onTagAdded?.({...currentTag, name: value});                
            }
            setCurrentTag(BookmarkUtils.createNewTag());
        }
    }

    const onCurrentTagChange = (v: string) => {
        const p = v.indexOf(" ")
        if (p !== -1) {
            const value = v.substring(0, p).trim();
            if (value.length > 0) {
                props.onTagAdded?.({...currentTag, name: value});
            }
            setCurrentTag({ ...BookmarkUtils.createNewTag(), name: v.substring(p+1) })
        } else {
            setCurrentTag({ ...currentTag, name: v })
        }
    }

    const containerClasses = [cl.container];
    if (props.containerClass) {
        containerClasses.push(props.containerClass);
    }

    return (
        <div className={containerClasses.join(" ")} onClick={(_e) => {
            inputRef.current?.focus();
        }}>
            {
                props.tags.map((tag, i) => 
                    <Tag key={tag.id} 
                        onRemove={() => props.onDelete?.(i)}>
                        {tag.name}
                    </Tag>
                )
            }
            <span className={cl.sp}>
                <input ref={inputRef}
                        value={currentTag.name} 
                        onChange={(e) => onCurrentTagChange(e.target.value)} 
                        className={cl.input} 
                        placeholder="Tags"
                        onKeyDown={(e) => {
                            if (e.key === "Space" || e.key === "Tab" || e.key === "Enter") {
                                if (currentTag.name.trim().length > 0) {
                                    onTagAdded();
                                    e.stopPropagation();
                                }
                            }
                            if (e.key === "Backspace") {
                                if (currentTag.name.trim().length === 0) {
                                    props.onDelete?.(props.tags.length - 1);
                                    e.stopPropagation();
                                }
                            }
                        }} 
                        onBlur={(_e) => {
                            if (currentTag.name.trim().length > 0) {
                                onTagAdded();
                            }
                        }}
                    />
            </span>
        </div>
    )
}

export default TagsEditor;