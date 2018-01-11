import * as api from 'api';

export function loadPage() {
  return function (dispatch) {
    api
      .loadText()
      .then(response => {
        dispatch(
          {
            type: "LOAD_PAGE",
            wordJson: response.data
          }
        )
      })
  }
}

export function postText(text, language) {
  return function (dispatch) {
    dispatch({
      type: "POST_TEXT"
    })
    api
      .postText(text, language)
      .then(response => {
        dispatch(
          {
            type: "LOAD_PAGE",
            wordJson: response.data
          }
        )
      })
  }
}

export function clickWord(wordIndex, sentenceIndex) {
  return {
    type: "CLICK_WORD",
    wordIndex: wordIndex,
    sentenceIndex: sentenceIndex
  }
}

export function focusSentence(sentenceIndex) {
  return {
    type: "FOCUS_SENTENCE",
    sentenceIndex: sentenceIndex
  }
}

export function focusChunk(chunk, sentenceIndex) {
  return {
    type: "FOCUS_CHUNK",
    chunk: chunk,
    sentenceIndex: sentenceIndex
  }
}
