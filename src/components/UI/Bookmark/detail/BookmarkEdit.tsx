
import React from "react";
import ContentEditable from "react-contenteditable";
import { sanitizeText } from "../../../../utils/HtmlHelpers";
import { processTextAndEnableLinks } from "../../../../utils/UrlHelpers";
import cl from '../Bookmark.module.css'

interface Props {
    initialContents: string;
    onAcceptEdit: (new_contents: string) => void;
}

interface State {
    newContents: string;
    changed: boolean;
    isEditing: boolean;
}

class BookmarkEdit extends React.Component<Props, State> {

    // useState doesn't work with this component
    // See: https://github.com/lovasoa/react-contenteditable/issues/161
    // const [newContents, setNewContents] = useState(props.initialContents)

    // todo: wrap with a functional component so that hooks are allowed

    state: State = {
        newContents: this.props.initialContents,
        changed: false,
        isEditing: false
    }

    setNewContents(newContents: string) {
        this.setState({newContents})
    }

    setChanged(changed: boolean) {
        this.setState({changed});
    }

    setIsEditing(isEditing: boolean) {
        this.setState({isEditing});
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

    render() {
        
        if (!this.state.isEditing) {
            // todo: put into effect
            const content_processed = processTextAndEnableLinks(sanitizeText(this.state.newContents));
            return (
                <div onDoubleClick={() => {
                    this.setIsEditing(true);
                }} dangerouslySetInnerHTML={{__html: content_processed}} />
            );
        }

        return (
            <ContentEditable onChange={(e) => {
                                this.setNewContents(e.target.value)
                                this.setChanged(true);
                            }} 
                            onBlur={(e) => {
                                this.onAccept();
                                this.setIsEditing(false);
                            }}
                            disabled={false}
                            html={this.state.newContents} 
                            className={cl.contents} 
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.ctrlKey) {
                                    this.onAccept();
                                    this.setIsEditing(false);
                                } 
                                if (e.key === "Escape") {
                                    this.onCancel();
                                    this.setIsEditing(false);
                                }
                            }}/>
        )
    }
}

export default BookmarkEdit;