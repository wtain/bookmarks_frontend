
import React, { useState } from "react";
import TagDto from "../../../domain/dto/TagDto";
import cl from './TagsEditor.module.css'

interface Props {
    tag: TagDto;
    onDelete?: () => void;
    onClick?: () => void;
    isSelected?: boolean;
}

const Tag: React.FC<Props> = (props: Props) => {

    const [showClose, setShowClose] = useState(false)
    const [clickablePointer, setClickablePointer] = useState(false);

    const clickable = cl.clickable;

    const styles = [cl.tag];

    if (clickablePointer) {
        styles.push(clickable);
    }

    if (props.isSelected!) {
        styles.push(cl.tag_selected);
    }

    return (
        <span className={styles.join(" ")} 
            onClick={() => {
                if (props.onClick) {
                    props.onClick()
                }
            }}
            onMouseEnter={() => {
                setShowClose(true);
                if (props.onClick) {
                    setClickablePointer(true);
                }
            }}
            onMouseLeave={() => {
                setShowClose(false);
                setClickablePointer(false);
            }}>
            {props.tag.name}
            {
                (showClose && props.onDelete) ? 
                    <div className={cl.close_button_wrapper}>
                        <button className={cl.close_button} onClick={() => {
                                if (props.onDelete !== null && props.onDelete !== undefined)
                                    props.onDelete!()
                        }}>
                            ❌
                        </button> 
                    </div>
                    : <></>
            }
        </span>
    )
}

export default Tag;