const {Connect} = require('../index');

const MONGOURI=''

describe('MONGOURI validation', () => {
    test('should throw an error if MONGOURI is not valid', () => {
        expect(() => {Connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true }).toThrow()});
    });
})


