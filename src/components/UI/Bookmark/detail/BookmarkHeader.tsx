
import React from "react";
import ContentEditable from "react-contenteditable";
import ReactTooltip from "react-tooltip";
import BookmarkDto from "../../../../domain/dto/BookmarkDto";
import cl from '../Bookmark.module.css'

interface Props {
    bookmark: BookmarkDto;
    doRemove: (bm: BookmarkDto) => void;
    onAcceptEdit: (new_summary: string) => void;
    onIsDoneChanged: (new_value: boolean) => void;
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
        if (this.state.new_summary !== this.props.bookmark.summary) {
            this.props.onAcceptEdit(this.state.new_summary);
        }
        this.setChanged(false);
    }

    onCancel() {
        this.setNewSummary(this.props.bookmark.summary)
        this.setChanged(false);
    }

    render () {
        const classes = [cl.summary];
        if (this.props.bookmark.isDone) {
            classes.push(cl.done);
        }

        return (
            <>
                <input type="checkbox" checked={this.props.bookmark.isDone} style={{display: "flow", float: "left"}} 
                    onClick={(e) => {
                        e.stopPropagation();
                    }} onChange={(e) => {
                        this.props.onIsDoneChanged(e.target.checked);
                    }} />
                <div data-tip data-for={"registerTip" + this.props.bookmark.id} style={{display: "flow"}}>
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
                                this.onAccept();
                            }}
                            disabled={false}
                            html={this.state.new_summary} 
                            className={classes.join(" ")} 
                            onKeyDown={(e) => {
                                if (e.code === "Enter" && e.ctrlKey) {
                                    this.onAccept();
                                } 
                                if (e.code === "Escape") {
                                    this.onCancel();
                                }
                            }}/>
                </div>

                <ReactTooltip className={cl.id} id={"registerTip" + this.props.bookmark.id} place="left" effect="float">
                    {this.props.bookmark.contents}
                </ReactTooltip>
            </>
        )
    }
}

export default BookmarkHeader;