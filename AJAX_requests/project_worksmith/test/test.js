console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('public/main.js', 'utf8');

describe('', function () {
  it('', function() {
    let structureOne = function() {
      const queryParams = $queryParams;
    };

    const varCallbacks = [
    	function($queryParams) {
        if($queryParams.value !== 'rel_rhy='){
          return { failure: 'Did you assign `const queryParams` to \'rel_rhy=\' ?' }
        }
        return true
      }
    ]

    let isMatchOne = Structured.match(code, structureOne, { varCallbacks });
    assert.isOk(isMatchOne, 'Did you create `const queryParams` to store `\'rel_rhy=\'` ?');
  });
});
