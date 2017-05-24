import React, { Component } from 'react';
import { Panel, Table, ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import Pagination from './Pagination';
import DreamListItem from './DreamListItem';

export default class DreamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            dreams: this.props.dreams || {}
        };
    }

    componentDidMount() {
        const { actions } = this.props;
        actions.resetSelectedDreams();
    }

    componentWillReceiveProps(nextProps) {
        const { dreams, selected_dreams} = nextProps;
        let selected = true;
        dreams.map(dream => {
            if (selected_dreams.indexOf(dream.id) == -1) {
                selected = false;
            }
        });
        this.setState({
            selected: selected
        });
    }

    handleSelectItems() {
        const { dreams, actions } = this.props;
        let page_items = [];
        dreams.map(dream => {
            page_items.push(dream.id);
        });
        if (this.state.selected) {
            actions.unselectDreams(page_items);
        } else {
            actions.selectDreams(page_items);
        }
        this.setState({
            selected: !this.state.selected
        });
    }

    handleRefresh() {
        const { actions } = this.props;
        actions.resetSelectedDreams();
        actions.apiGetDreams();
    }

    handleDelete() {
        const { selected_dreams, actions } = this.props;
        actions.apiDeleteAgents(selected_dreams);
        actions.resetSelectedDreams();
    }

    render() {
        const { dreams, selected_dreams, total_pages, total_items, current_page, actions } = this.props;

        return (
            <Panel header="Сны">
                <Table striped fill>
                    <thead>
                    <tr>
                        <th colSpan="3">
                            <div className="row">
                                <div className="col-sm-12 m-t-xs m-b-xs">
                                    <ButtonToolbar>
                                        <ButtonGroup>
                                            <Button bsSize="small" onClick={() => actions.addDreamPrepare()}>
                                                <Glyphicon glyph="plus" /> Создать
                                            </Button>
                                            <Button bsSize="small" onClick={this.handleRefresh.bind(this)}>
                                                <Glyphicon glyph="refresh" /> Обновить
                                            </Button>
                                            {
                                                selected_dreams.length > 0
                                                    ?
                                                    <Button bsSize="small" onClick={this.handleDelete.bind(this)}>
                                                        <Glyphicon glyph="trash" /> Удалить
                                                    </Button>
                                                    :
                                                    <Button bsSize="small" disabled style={{pointerEvents: 'none'}}>
                                                        <Glyphicon glyph="trash" /> Удалить
                                                    </Button>
                                            }
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </div>
                            </div>
                        </th>
                    </tr>
                    {
                        dreams.length > 0
                            ?
                            <tr>
                                <th width="20">
                                    <input type="checkbox" checked={this.state.selected} onChange={this.handleSelectItems.bind(this)} />
                                </th>
                                <th>Заголовок</th>
                                <th>Редактирование</th>
                            </tr>
                            : false
                    }
                    </thead>

                    <tbody>
                    {
                        dreams.map(dream => {
                            let selected = selected_dreams.indexOf(dream.id) >= 0 ? true : false;
                            return <DreamListItem key={dream.id} dream={dream} selected={selected} {...actions} />;
                        })
                    }
                    </tbody>

                    <tfoot>
                    {
                        dreams.length > 0
                            ?
                            <tr>
                                <th colSpan="3">
                                    <div className="row">
                                        <div className="col-sm-6 m-t-xs m-b-xs">
                                            {
                                                total_pages > 1
                                                    ? <Pagination pageCount={total_pages} pageIndex={current_page}
                                                                  apiGetItems={actions.apiGetDreams}/>
                                                    : false
                                            }
                                        </div>
                                        <div className="col-sm-6 m-t-xs m-b-xs text-right">
                                            <span>Всего: {total_items}   </span><span>Выбрано: {selected_dreams.length}   </span>
                                            {
                                                selected_dreams.length > 0
                                                    ? <Button bsSize="small" onClick={() => actions.resetSelectedDreams()}>Отменить выбор</Button>
                                                    : <Button bsSize="small" disabled style={{pointerEvents: 'none'}}>Отменить выбор</Button>
                                            }
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            : false
                    }
                    </tfoot>
                </Table>
            </Panel>
        );
    }
}

DreamList.defaultProps = {
    dreams: [],
    loading: false
};