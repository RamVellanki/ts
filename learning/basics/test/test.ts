/// <reference path="../typings/requirejs/require.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

var expect = require('chai').expect;
describe('my app test', ()=>{
   it('should work', ()=>{
       var i = 0;
       expect(i).to.equal(0);
   }) 
});