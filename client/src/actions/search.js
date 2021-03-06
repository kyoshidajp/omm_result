import Axios from 'axios';

import * as OMM_CONST from '../constants/OMM';
import * as API_PATH from '../constants/API_PATH';

export const ON_CHANGE_SEARCH_TARGET = 'ON_CHANGE_SEARCH_TARGET';
export const SUGGEST_ON_CHANGE = 'SUGGEST_ON_CHANGE';
export const SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED';
export const SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED = 'SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED';
export const SUGGEST_ON_SUGGESTION_SELECTED = 'SUGGEST_ON_SUGGESTION_SELECTED';
export const SUGGEST_ON_KEY_PRESS = 'SUGGEST_ON_KEY_PRESS';
export const LOAD_BIBS_REQUEST = 'LOAD_BIBS_REQUEST';
export const LOAD_BIBS_RESULT = 'LOAD_BIBS_RESULT';
export const DELETE_COMPARE_RESULT = 'DELETE_COMPARE_RESULT';
export const CHANGE_DAY = 'CHANGE_DAY';
export const LOAD_CONTROLS_REQUEST = 'LOAD_CONTROLS_REQUEST';
export const LOAD_CONTROLS_RESULT = 'LOAD_CONTROLS_RESULT';
export const HOVER_RESULT_TABLE_ROW = 'HOVER_RESULT_TABLE_ROW';
export const OUT_RESULT_TABLE_ROW = 'OUT_RESULT_TABLE_ROW';
export const CHANGE_DISPLAY_ROUTE = 'CHANGE_DISPLAY_ROUTE';
export const SORT_RESULT_TABLE = 'SORT_RESULT_TABLE';
export const ON_PAGE_CHANGE = 'ON_PAGE_CHANGE';

function callOnPageChange(value, offset) {
  return {
    type: ON_PAGE_CHANGE,
    value,
    offset,
  };
}

export function sortResultTable(sortBy, sortOrder) {
  return {
    type: SORT_RESULT_TABLE,
    sortBy,
    sortOrder,
  };
}

export function changeDisplayRoute(bib) {
  return {
    type: CHANGE_DISPLAY_ROUTE,
    bib,
  };
}

export function hoverResultTableRow(bib) {
  return {
    type: HOVER_RESULT_TABLE_ROW,
    value: bib,
  };
}

export function outResultTableRow() {
  return {
    type: OUT_RESULT_TABLE_ROW,
  };
}

function loadControlsRequest() {
  return {
    type: LOAD_CONTROLS_REQUEST,
  };
}

function loadControlsResult(result) {
  return {
    type: LOAD_CONTROLS_RESULT,
    result,
  };
}

export function loadControls(value) {
  return (dispatch) => {
    dispatch(loadControlsRequest());

    Axios.get(`${API_PATH.CONTROLS}?day=${value}`).then(
      response => dispatch(loadControlsResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}

function changeDayDisplay(value) {
  return {
    type: CHANGE_DAY,
    value,
  };
}

export function changeDay(event) {
  const value = Number(event.target.value);
  return (dispatch) => {
    dispatch(loadControls(value));
    dispatch(changeDayDisplay(value));
  };
}

function getResultAPIPath(value, searchTarget, day) {
  let cond = null;
  switch (searchTarget) {
    case OMM_CONST.SEARCH_TARGETS.BIB:
      cond = 'bib';
      break;
    case OMM_CONST.SEARCH_TARGETS.PLAYER:
      cond = 'player';
      break;
    default:
      cond = 'bib';
      break;
  }

  return `${API_PATH.RESULTS}?${cond}=${value}&day=${day}`;
}

function loadResultResult(value) {
  return {
    type: SUGGEST_ON_SUGGESTION_SELECTED,
    value,
  };
}

export function onSuggestionSelected(value, searchTarget, day) {
  const apiPath = getResultAPIPath(value, searchTarget, day);
  return (dispatch) => {
    Axios.get(apiPath).then(
      response => dispatch(loadResultResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}

function loadBibsRequest() {
  return {
    type: LOAD_BIBS_REQUEST,
  };
}

function loadBibsResult(value) {
  return {
    type: LOAD_BIBS_RESULT,
    value,
  };
}

export function loadBibs(day) {
  return (dispatch) => {
    dispatch(loadBibsRequest());

    Axios.get(`${API_PATH.BIBS}?day=${day}`).then(
      response => dispatch(loadBibsResult(response.data)),
    ).catch(
      response => console.log(response),
    );
  };
}

function searchPlayers(result, offset) {
  return {
    type: SUGGEST_ON_KEY_PRESS,
    value: result,
    offset,
  };
}

function callSearchPlayersAPI(value, limit, offset) {
  if (value === '') return { type: null };

  return (dispatch) => {
    Axios.get(`${API_PATH.PLAYERS}?name=${value}&page=${offset}&per=${limit}`).then(
      response => dispatch(searchPlayers(response.data, offset)),
    ).catch(
      response => console.log(response),
    );
  };
}

export function onClickSearchButton(query, limit, offset) {
  return callSearchPlayersAPI(query, OMM_CONST.SEARCH_LIMIT_PER_PAGE, 1);
}

export function onPageChange(query, limit, selected) {
  return callSearchPlayersAPI(query, limit, selected + 1);
}

export function suggestOnKeyPress(event, value, limit, offset) {
  const ENTER_KEY = 13;
  if (event.which === ENTER_KEY) {
    return callSearchPlayersAPI(value, OMM_CONST.SEARCH_LIMIT_PER_PAGE, 1);
  }
  return { type: null };
}

export function onChangeSearchTarget(value) {
  return {
    type: ON_CHANGE_SEARCH_TARGET,
    value,
  };
}

export function onChange(value) {
  return {
    type: SUGGEST_ON_CHANGE,
    value,
  };
}

export function onSuggestionsFetchRequested(value, results) {
  return {
    type: SUGGEST_ON_SUGGESTIONS_FETCH_REQUESTED,
    value: value.value,
    results,
  };
}

export function onSuggestionsClearRequested() {
  return {
    type: SUGGEST_ON_SUGGESTIONS_CLEAR_REQUESTED,
  };
}

export function deleteCompareResult(bib) {
  return {
    type: DELETE_COMPARE_RESULT,
    bib,
  };
}

export function addCompareResult(value, day) {
  return onSuggestionSelected(value, OMM_CONST.SEARCH_TARGETS.BIB, day);
}
