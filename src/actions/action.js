module.exports = {
    getAllHouses: function(callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/houses`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getAllCharacters: function(callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/characters`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getAllBooks: function(callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/books`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getSelectedValue: function(url, callBackFunc) {
        fetch(url)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },
}