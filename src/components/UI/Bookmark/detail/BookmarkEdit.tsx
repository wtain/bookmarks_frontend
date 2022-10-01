
import React from "react";
import ContentEditable from "react-contenteditable";
import cl from '../Bookmark.module.css'

interface Props {
    initialContents: string;
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
        if (this.props.initialContents !== this.state.newContents) {
            this.props.onAcceptEdit(this.state.newContents);
        }
        this.setChanged(false);
    }

    onCancel() {
        this.setNewContents(this.props.initialContents)
        this.setChanged(false);
    }

    render () {
        return (
            <ContentEditable onChange={(e) => {
                                this.setNewContents(e.target.value)
                                this.setChanged(true);
                            }} 
                            onBlur={(e) => {
                                this.onAccept();
                            }}
                            disabled={false}
                            html={this.state.newContents} 
                            className={cl.contents} 
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.ctrlKey) {
                                    this.onAccept();
                                } 
                                if (e.key === "Escape") {
                                    this.onCancel();
                                }
                            }}/>
        )
    }
}

export default BookmarkEdit;