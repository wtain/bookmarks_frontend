
import React, { useState } from "react";
import TagDto from "../../../domain/dto/TagDto";
import cl from './TagsEditor.module.css'

interface Props {
    tag: TagDto;
    onDelete?: () => void;
}

const Tag: React.FC<Props> = (props: Props) => {

    const [showClose, setShowClose] = useState(false)

    return (
        <span className={cl.tag} 
            onMouseEnter={() => setShowClose(true)}
            onMouseLeave={() => setShowClose(false)}>
            {props.tag.name}
            {
                (showClose && props.onDelete) ? 
                    <div className={cl.close_button_wrapper}>
                        <button className={cl.close_button} onClick={() => {
                                if (props.onDelete !== null && props.onDelete !== undefined)
                                    props.onDelete!()
                            }}>
                            x
                        </button> 
                    </div>
                    : <></>
            }
        </span>
    )
}

export default Tag;