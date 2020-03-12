describe('arrayTagsToString.js', () => {
    const { arrayTagsToString } = require('../../utils/arrayTagsToString')

    it('Should receive an array and return a formated string', () => {

        const tags = ['tag1', 'tag2', 'tag3']

        const string = arrayTagsToString(tags)

        expect(typeof string).toBe('string')
        expect(string).toBe('#tag1 #tag2 #tag3')

    })
})

describe('stringTagsToArray.js', () => {

    const { stringTagsToArray } = require('../../utils/stringTagsToArray')

    it('Should receive a string and return an array', () => {
        const separado_por_virgula = "tag1,tag2,tag3"
        const separado_por_espaço = "tag1 tag2 tag3"
        const separado_por_virgula_espaço = "tag1, tag2, tag3"

        const teste1 = stringTagsToArray(separado_por_virgula)
        const teste2 = stringTagsToArray(separado_por_espaço)
        const teste3 = stringTagsToArray(separado_por_virgula_espaço)

        expect(typeof teste1).toBe('object')
        expect(teste1).toStrictEqual(['tag1', 'tag2', 'tag3'])
        expect(typeof teste2).toBe('object')
        expect(teste2).toStrictEqual(['tag1', 'tag2', 'tag3'])
        expect(typeof teste3).toBe('object')
        expect(teste3).toStrictEqual(['tag1', 'tag2', 'tag3'])

    })

})