//defines the keyword test from built-in test library node:test and the library assert,
// which is used by the tests to check the results of the functions under test.
const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

//individual test cases are defined wih the test function. test(descriptionString, function defines the functionality for test case)
test('reverse of a', () => {
    const result = reverse('a')
    // assert.strictEqual(actual, expected[,message]),test strict equality betwn the actual and expeted params as determined by Object.is()
    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')

    assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')

    assert.strictEqual(result, 'saippuakauppias')
})