import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default class DreamListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selected: nextProps.selected
        });
    }

    handleSelectItem() {
        const { dream, unselectDream, selectDream } = this.props;
        if (this.state.selected) {
            unselectDream(dream.id);
        } else {
            selectDream(dream.id);
        }
    }

    render() {
        const { dream, apiGetDream, apiDeleteDream } = this.props;

        return (
            <tr>
                <td>
                    <input type="checkbox" checked={this.state.selected} onChange={this.handleSelectItem.bind(this)} />
                </td>
                <td> {dream.title} </td>
                <td>
                    <Button bsStyle="link" bsSize="xsmall" title="Редактировать" onClick={() => apiGetAgent(dream.id)}>
                        <Glyphicon glyph="pencil" />
                    </Button>
                    <Button bsStyle="link" bsSize="xsmall" title="Удалить" onClick={() => apiDeleteAgent(dream.id)}>
                        <Glyphicon glyph="trash" />
                    </Button>
                </td>
            </tr>
        );
    }
}

DreamListItem.defaultProps = {
    selected: false
};