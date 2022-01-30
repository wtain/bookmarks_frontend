
import React from "react";
import ContentEditable from "react-contenteditable";
import ReactTooltip from "react-tooltip";
import BookmarkDto from "../../../../domain/dto/BookmarkDto";
import cl from '../Bookmark.module.css'

interface Props {
    bookmark: BookmarkDto;
    doRemove: (bm: BookmarkDto) => void;
    onCancelEdit: () => void;
    onAcceptEdit: (new_summary: string) => void;
}

interface State {
    new_summary: string;
    changed: boolean;
}

class BookmarkHeader extends React.Component<Props, State> {

    state: State = {
        new_summary: this.props.bookmark.summary,
        changed: false
    }

    setNewSummary(new_summary: string) {
        this.setState({new_summary})
    }

    setChanged(changed: boolean) {
        this.setState({changed});
    }

    onAccept() {
        this.props.onAcceptEdit(this.state.new_summary)
        this.setChanged(false);
    }

    onCancel() {
        this.setNewSummary(this.props.bookmark.summary)
        this.props.onCancelEdit()
        this.setChanged(false);
    }

    render () {
        return (
            <>
                <div data-tip data-for="registerTip">
                    <span>
                        <button className={cl.btn_remove} 
                                onClick={() => this.props.doRemove(this.props.bookmark)}>
                                    x
                        </button>
                    </span>
                    <ContentEditable onChange={(e) => {
                                this.setNewSummary(e.target.value)
                                this.setChanged(true);
                            }} 
                            onBlur={(e) => {
                                this.props.onAcceptEdit(this.state.new_summary);
                                this.setChanged(false);
                            }}
                            disabled={false}
                            html={this.state.new_summary} 
                            className={cl.summary} 
                            onKeyDown={(e) => {
                                if (e.code === "Enter" && e.ctrlKey) {
                                    this.onAccept();
                                } 
                                if (e.code === "Escape") {
                                    this.onCancel();
                                }
                            }}/>
                </div>

                <ReactTooltip className={cl.id} id="registerTip" place="left" effect="float">
                    {this.props.bookmark.id}
                </ReactTooltip>
            </>
        )
    }
}

export default BookmarkHeader;