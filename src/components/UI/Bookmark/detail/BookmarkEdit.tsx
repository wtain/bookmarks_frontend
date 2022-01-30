
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
    changed: boolean;
}

class BookmarkEdit extends React.Component<Props, State> {

    // useState doesn't work with this component
    // See: https://github.com/lovasoa/react-contenteditable/issues/161
    // const [newContents, setNewContents] = useState(props.initialContents)

    state: State = {
        newContents: this.props.initialContents,
        changed: false
    }

    setNewContents(newContents: string) {
        this.setState({newContents})
    }

    setChanged(changed: boolean) {
        this.setState({changed});
    }

    onAccept() {
        this.props.onAcceptEdit(this.state.newContents)
        this.setChanged(false);
    }

    onCancel() {
        this.setNewContents(this.props.initialContents)
        this.props.onCancelEdit()
        this.setChanged(false);
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
                                    this.setChanged(true);
                                }} 
                                onBlur={(e) => {
                                    // console.log("Saving: " + this.state.newContents);
                                    this.props.onAcceptEdit(this.state.newContents);
                                    this.setChanged(false);
                                }}
                                disabled={false}
                                html={this.state.newContents} 
                                className={cl.contents} 
                                onKeyDown={(e) => {
                                    // console.log(e);
                                    if (e.code === "Enter" && e.ctrlKey) {
                                        // console.log("Accept: " + this.state.newContents)
                                        this.onAccept();
                                    } 
                                    if (e.code === "Escape") {
                                        // console.log("Cancel")
                                        this.onCancel();
                                    }
                                }}/>
                <button className={cl.btn_cancel} 
                        onClick={this.onCancel}>
                    Cancel
                </button>
                <button className={cl.btn_ok} 
                        onClick={this.onAccept}>
                    Ok
                    {this.state.changed ? "*" : ""}
                </button>
            </div>
        )
    }
}

export default BookmarkEdit;