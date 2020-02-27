export const stringTagsToArray = function (string) {
    const re = /,| /;
    return string.split(re).filter(tag => (tag !== ''))
}