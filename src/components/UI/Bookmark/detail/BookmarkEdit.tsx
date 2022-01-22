
import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import cl from '../Bookmark.module.css'

interface Props {
    initialContents: string;
    onCancelEdit: () => void;
    onAcceptEdit: (new_contents: string) => void;
}

interface State {
    newContents: string;
}

class BookmarkEdit extends React.Component<Props, State> {

    // useState doesn't work with this component
    // See: https://github.com/lovasoa/react-contenteditable/issues/161
    // const [newContents, setNewContents] = useState(props.initialContents)

    state: State = {
        newContents: this.props.initialContents 
    }

    setNewContents(newContents: string) {
        this.setState({newContents})
    }

    render () {
        return (
            <div>
                {/* <textarea className={cl.contents} 
                        onChange={(e) => setNewContents(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.code === "Enter" && e.ctrlKey) {
                                props.onAcceptEdit(newContents)
                            } 
                            if (e.code === "Escape") {
                                props.onCancelEdit()
                            }
                        }}
                        defaultValue={newContents} /><br /> */}
                <ContentEditable onChange={(e) => {
                                    // console.log("Change: " + e.target.value)
                                    this.setNewContents(e.target.value)
                                }} 
                                onBlur={(e) => {
                                    // console.log("Saving: " + this.state.newContents);
                                    this.props.onAcceptEdit(this.state.newContents);
                                }}
                                disabled={false}
                                html={this.state.newContents} className={cl.contents} 
                                onKeyDown={(e) => {
                                    console.log(e);
                                    if (e.code === "Enter" && e.ctrlKey) {
                                        console.log("Accept: " + this.state.newContents)
                                        this.props.onAcceptEdit(this.state.newContents)
                                    } 
                                    if (e.code === "Escape") {
                                        console.log("Cancel")
                                        this.setNewContents(this.props.initialContents)
                                        this.props.onCancelEdit()
                                    }
                                }}/>
                <button className={cl.btn_cancel} 
                        onClick={this.props.onCancelEdit}>
                    Cancel
                </button>
                <button className={cl.btn_ok} 
                        onClick={() => this.props.onAcceptEdit(this.state.newContents)}>
                    Ok
                </button>
            </div>
        )
    }
}

export default BookmarkEdit;