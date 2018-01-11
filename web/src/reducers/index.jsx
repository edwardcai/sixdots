const initialState = {
  sentences: [],
  sentenceInFocusIndex: null,
  chunkInFocus: null,
  isLoading: false
};

function parseSentence (sentence) {
  sentence = sentence['tokens'].map((word, index) => {
    var arcs = word.arcs ? word.arcs : [];
    return {
      text: word.text,
      index: index,
      pos: word.pos,
      wordType: arcs.length > 0 ? 'MAIN' : null,
      edges: arcs}
  });
  return {
    tokens: sentence,
    chunks: [[]]
  };
  return sentence
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "POST_TEXT":
      return {
        sentences: state.sentences,
        sentenceInFocusIndex: state.sentenceInFocusIndex,
        chunkInFocus: state.chunkInFocus,
        isLoading: true
      }
    case "LOAD_PAGE":
      if (action.wordJson) {
        var sentences = [];
        action.wordJson['results'].forEach(sentence => {
          sentences.push(parseSentence(sentence))
        });
        return {
          sentences: sentences,
          isLoading: false
        }
      }
      else {
          return initialState
      }
      break;
    case "CLICK_WORD":
      var sentences = state.sentences;
      sentences.forEach(sentence => {
        sentence.tokens.forEach(word => {
          if (word['wordType'] != 'MAIN') {
            word['wordType'] = null;
          }
        })
      });
      var sentence = sentences[action.sentenceIndex];
      sentence.tokens[action.wordIndex].edges.forEach(edge => {
        for (let i = edge['span'][0]; i < edge['span'][1]; i++) {
          sentence.tokens[i]['wordType'] = edge['type']
        }
      });
      return {
        sentences: sentences,
        sentenceInFocusIndex: action.sentenceIndex,
        chunkInFocus: state.chunkInFocus,
        isLoading: state.isLoading
      };
    case "FOCUS_SENTENCE":
      return {
        sentences: state.sentences,
        sentenceInFocusIndex: action.sentenceIndex,
        chunkInFocus: state.chunkInFocus,
        isLoading: state.isLoading
      };
    case "FOCUS_CHUNK":
      return {
        sentences: state.sentences,
        sentenceInFocusIndex: state.sentenceInFocusIndex,
        chunkInFocus: {
          chunk: action.chunk,
          sentenceIndex: action.sentenceIndex
        },
        isLoading: state.isLoading
      };
    default: return initialState;
  }
}
