module.exports = {
    getAllHouses: function(callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/houses`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getSelectedHouse: function(houseId, callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/houses/${houseId}`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getAllCharacters: function(callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/characters`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getSelectedCharacter: function(characterId, callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/characters/${characterId}`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getAllBooks: function(callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/books`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },

    getSelectedBooks: function(bookId, callBackFunc) {
        fetch(`https://www.anapioficeandfire.com/api/books/${bookId}`)
            .then(res => res.json())
            .then(data => callBackFunc(data))
    },
}