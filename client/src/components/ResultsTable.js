import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import FaTrash from 'react-icons/lib/fa/trash';

export default class ResultsTable extends Component {
  constructor(props) {
    super(props);

    const propTypes = {
      omm: PropTypes.object.isRequired,
      search: PropTypes.object.isRequired,
      ommActions: PropTypes.object.isRequired,
    };

    this.isCheckedControl = this.isCheckedControl.bind(this);
    this.joinPlayers = this.joinPlayers.bind(this);
  }

  isCheckedControl(bib, markId) {
    if (!this.props.search.bibCodesMap.has(bib)) return false;
    return this.props.search.bibCodesMap.get(bib).indexOf(Number(markId)) > -1;
  }

  joinPlayers(players) {
    return players.map(player => `${player.last_name} ${player.first_name}`)
      .join(' / ');
  }

  render() {
    return (
      <Table bordered striped condensed hover responsive
        className="result-table">
        <thead>
          <tr>
            <th className="delete" />
            <th className="bib">bib</th>
            <th className="rank">rank</th>
            <th className="score">score</th>
            <th className="players">players</th>
            <th className="routes">route</th>
          </tr>
        </thead>
        <tbody>
          {this.props.search.compareResults.map(result => (
            <tr key={result.id}>
              <td key={result.id} >
                <a href="#" onClick={() => this.props.searchActions.deleteCompareResult(result.bib)}><FaTrash /></a>
              </td>
              <td>
                <div className="text-right">{result.bib}</div>
              </td>
              <td>
                <div className="text-right">{result.rank}</div>
              </td>
              <td>
                <div className="text-right">{result.score}</div>
              </td>
              <td>
                <div className="text-left">
                  {this.joinPlayers(result.players)}
                </div>
              </td>
              <td>
                <div className="text-left">
                  {result.controls.map(control =>
                     control.code.toString(),
                   ).join('-')}
                  {result.score > 0 ? '-F' : ''}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}