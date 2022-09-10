
import React from "react";
import cl from './Modal.module.css'

interface Props {
    children: any;
    visible: boolean;
    setVisible: (v: boolean) => void;
}

const Modal: React.FC<Props> = (props: Props) => {
    const rootClasses = [cl.Modal];

    if (props.visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(" ")} onClick={() => props.setVisible(false)}>
            <div className={cl.ModalContent} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;