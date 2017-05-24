import React, { Component } from 'react';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
    }

    handlePageClick(e) {
        e.preventDefault();
        const { apiGetItems } = this.props;
        apiGetItems(e.target.text);
    }

    handlePrevClick(e) {
        e.preventDefault();
        const { pageIndex, apiGetItems } = this.props;
        apiGetItems(pageIndex-1);
    }

    handleNextClick(e) {
        e.preventDefault();
        const { pageIndex, apiGetItems } = this.props;
        apiGetItems(pageIndex+1);
    }

    renderFirstButton() {
        const { pageIndex, apiGetItems } = this.props;

        return pageIndex === 1
            ? <li className="disabled"><span style={{pointerEvents: 'none'}}>«</span></li>
            : <li><a href="#" onClick={() => apiGetItems(1)}>«</a></li>;
    }

    renderPreviousButton() {
        const { pageIndex } = this.props;

        return pageIndex === 1
            ? <li className="disabled"><span style={{pointerEvents: 'none'}}>‹</span></li>
            : <li><a href="#" onClick={this.handlePrevClick.bind(this)}>‹</a></li>;
    }

    renderPageButtons() {
        const { pageIndex, pageCount } = this.props;
        var buttons = [];

        if (pageCount > 5) {
            if (pageIndex <= 3) {
                for (var i=1; i<=5; i++) {
                    buttons.push(
                        i === pageIndex
                            ? <li key={i} className="active"><span>{i}</span></li>
                            : <li key={i}><a href="#" onClick={this.handlePageClick.bind(this)}>{i}</a></li>
                    );
                }
                buttons.push(<li key={6} className="disabled"><span style={{pointerEvents: 'none'}}>…</span></li>);
            } else if ((pageCount - pageIndex) < 3) {
                buttons.push(<li key={pageCount-5} className="disabled"><span style={{pointerEvents: 'none'}}>…</span></li>);
                for (var i=pageCount-4; i<=pageCount; i++) {
                    buttons.push(
                        i === pageIndex
                            ? <li key={i} className="active"><span>{i}</span></li>
                            : <li key={i}><a href="#" onClick={this.handlePageClick.bind(this)}>{i}</a></li>
                    );
                }
            } else {
                buttons.push(<li key={pageIndex-3} className="disabled"><span style={{pointerEvents: 'none'}}>…</span></li>);
                for (var i=pageIndex-2; i<=pageIndex+2; i++) {
                    buttons.push(
                        i === pageIndex
                            ? <li key={i} className="active"><span>{i}</span></li>
                            : <li key={i}><a href="#" onClick={this.handlePageClick.bind(this)}>{i}</a></li>
                    );
                }
                buttons.push(<li key={pageIndex+3} className="disabled"><span style={{pointerEvents: 'none'}}>…</span></li>);
            }
        } else {
            for (var i=1; i<=pageCount; i++) {
                buttons.push(
                    i === pageIndex
                        ? <li key={i} className="active"><span>{i}</span></li>
                        : <li key={i}><a href="#" onClick={this.handlePageClick.bind(this)}>{i}</a></li>
                );
            }
        }

        return buttons;
    }

    renderNextButton() {
        const { pageIndex, pageCount } = this.props;

        return pageIndex === pageCount
            ? <li className="disabled"><span style={{pointerEvents: 'none'}}>›</span></li>
            : <li><a href="#" onClick={this.handleNextClick.bind(this)}>›</a></li>;
    }

    renderLastButton() {
        const { pageIndex, pageCount, apiGetItems } = this.props;

        return pageIndex === pageCount
            ? <li className="disabled"><span style={{pointerEvents: 'none'}}>»</span></li>
            : <li><a href="#" onClick={() => apiGetItems(pageCount)}>»</a></li>;
    }

    render() {
        return (
            <ul className="pagination"  style={{margin: 0}}>
                {this.renderFirstButton()}
                {this.renderPreviousButton()}
                {this.renderPageButtons()}
                {this.renderNextButton()}
                {this.renderLastButton()}
            </ul>
        );
    }
}