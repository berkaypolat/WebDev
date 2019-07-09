console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('public/main.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const getSuggestions = () => {
    		const endpoint = `${url}${queryParams}${$wordQuery}${additionalParams}${topicQuery}`
      }
    };

    let structureTwo = function() {
      const getSuggestions = () => {
        const endpoint = url + queryParams + wordQuery + additionalParams + topicQuery
      }
    };

    let isMatchOne = Structured.match(code, structureOne);
    let isMatchTwo = Structured.match(code, structureTwo);

    assert.isOk(isMatchOne || isMatchTwo, 'Did you set `const endpoint` equal to a concatenated string of `url`, `queryParams`, `wordQuery`, `additionalParams`, and `topicQuery` respectively?');
  });
});
