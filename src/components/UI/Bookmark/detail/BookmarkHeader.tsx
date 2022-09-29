
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
    showSummaryPreview?: boolean;
}

// todo: Make it functional

interface State {
    new_summary: string;
    changed: boolean;
    show_tooltip: boolean;
}

class BookmarkHeader extends React.Component<Props, State> {

    private briefSummary: string;

    constructor(props: Props) {
        super(props);
        this.briefSummary = "";
        if (this.props.showSummaryPreview) {
            this.briefSummary = this.truncateContents();
        }
    }

    truncateContents(): string {
        return this.props.bookmark.contents
            .replaceAll('\n', '')
            .replaceAll('\r', '')
            .substring(0, 60) + "...";
    }

    state: State = {
        new_summary: this.props.bookmark.summary,
        changed: false,
        show_tooltip: false
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
                <input type="checkbox"
                    checked={this.props.bookmark.isDone}
                    className={cl.done_checkbox} 
                    onClick={
                        (e) => {
                            e.stopPropagation();
                        }}
                    onChange={
                        (e) => {
                            this.props.onIsDoneChanged(e.target.checked);
                        }} />
                {/* hack: https://stackoverflow.com/questions/71935664/reacttooltip-hide-doesnt-hide-tooltip-instantly */}
                <div data-tip data-for={"registerTip" + this.props.bookmark.id}
                    className={cl.header_div} 
                    onMouseEnter={() => this.setState({ show_tooltip: true })}
                    onMouseLeave={() => {
                        this.setState({ show_tooltip: false })
                        setTimeout(() => this.setState({ show_tooltip: true }), 50)
                    }}>
                    <span>
                        <button className={cl.btn_remove} 
                                onClick={() => this.props.doRemove(this.props.bookmark)}>
                                    x
                        </button>
                    </span>
                    <div 
                        className={cl.summary_preview}
                    >
                        <span
                            className={cl.summary_preview_text}
                        >
                        {
                            this.props.showSummaryPreview ? this.briefSummary : ""
                        }
                        </span>
                        (
                        <a href={"bookmark/" + this.props.bookmark.id} onClick={(e) => {
                            e.stopPropagation();
                        }}>Link</a>
                        )
                    </div>
                    
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
                        }} />
                </div>

                {this.state.show_tooltip &&
                    <ReactTooltip className={cl.id}
                        id={"registerTip" + this.props.bookmark.id}
                        place="left"
                        effect="float">
                        {this.props.bookmark.contents}
                    </ReactTooltip>
                }
            </>
        )
    }
}

export default BookmarkHeader;