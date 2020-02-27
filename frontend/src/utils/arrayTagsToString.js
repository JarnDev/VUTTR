export const arrayTagsToString = function(array){
    return array.map(item => (
        "#" + item
    )).join(' ')
}