import React from 'react';
import '../index.css';
import actions from '../actions/action';
import House from './House';
import Character from './Character';
import Book from './Book';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            allHouses: [],
            filteredHouses: [],
            allCharacters: [],
            filteredCharacters: [],
            allBooks: [],
            filteredBooks: [],
            currentInfo: [],
            searchText: '',
            type: ''
        }
    }

    componentDidMount() {
        actions.getAllHouses(this.setAllHouses);
        actions.getAllCharacters(this.setAllCharacters);
        actions.getAllBooks(this.setAllBooks);
    }

    setAllHouses = (data) => {
        this.setState({
            allHouses: data,
            filteredHouses: data
        });
    }

    setAllCharacters = (data) => {
        this.setState({
            allCharacters: data,
            filteredCharacters: data
        });
    }

    setAllBooks = (data) => {
        this.setState({
            allBooks: data,
            filteredBooks: data
        });
    }

    handleSearchTextChange = (event) => {
        let tempHousesArr = [];
        let tempCharactersArr = [];
        let tempBooksArr = [];
        let searchText = event.target.value;

        this.state.allHouses.map((data) => {
            if(data.name.toLowerCase().includes(searchText.toLowerCase()))
                tempHousesArr = tempHousesArr.concat(data);
        });

        this.state.allCharacters.map((data) => {
            if(data.name.toLowerCase().includes(searchText.toLowerCase()) || data.aliases[0].toLowerCase().includes(searchText.toLowerCase()))
                tempCharactersArr = tempCharactersArr.concat(data);
        });

        this.state.allBooks.map((data) => {
            if(data.name.toLowerCase().includes(searchText.toLowerCase()))
                tempBooksArr = tempBooksArr.concat(data);
        });

        this.setState({
            filteredHouses: tempHousesArr,
            filteredCharacters: tempCharactersArr,
            filteredBooks: tempBooksArr,
            searchText: searchText
        });
    }

    handleBtnClick = (e) => {
        //e.preventDefault();
        let infoType = e.target.name;
        console.log(infoType);
        fetch(e.target.value)
            .then(res => res.json())
            .then(data => this.setState({currentInfo: data, type: infoType}));
    }

    render() {
        const { searchText, currentInfo, filteredBooks, filteredCharacters, filteredHouses, type } = this.state;
        console.log(type);
        return (
            <div>
                <div className='search-bar'>
                    <input
                        type='text'
                        value={searchText}
                        name='searchText'
                        placeholder='Filter House/Character/Book name'
                        onChange={this.handleSearchTextChange}
                    />
                </div>
                <div id='cols'>
                    <div id='grid'>
                        <div className='grid-col'>
                            <fieldset>
                                <legend><h3>Houses</h3></legend>
                                <div className='scroll'>
                                    <ul>
                                        {filteredHouses.map((house) => (
                                            <li key={house.name}><button name='house' value={house.url} onClick={this.handleBtnClick}>{house.name}</button></li>
                                        ))}
                                    </ul>
                                </div>
                            </fieldset>
                        </div>
                        <div className='grid-col'>
                            <fieldset>
                                <legend><h3>Characters</h3></legend>
                                <div className='scroll'>
                                    <ul>
                                        {filteredCharacters.map((character) => (
                                            <li key={character.url}>
                                                <button name='character' value={character.url} onClick={this.handleBtnClick}>
                                                    {character.name ? character.name : character.aliases[0]}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </fieldset>
                        </div>
                        <div className='grid-col'>
                            <fieldset>
                                <legend><h3>Books</h3></legend>
                                <div className='scroll'>
                                    <ul>
                                        {filteredBooks.map((book) => (
                                            <li key={book.name}>
                                                <button name='book' value={book.url} onClick={this.handleBtnClick}>
                                                    {book.name}
                                                </button>        
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    {type ? 
                        (<div id='info'>
                            {currentInfo && type === 'house' ?
                                <House data = {currentInfo} type = {type} />
                                : ''
                            }
                            {currentInfo && type === 'character' ?
                                <Character data = {currentInfo} type = {type} />
                                : ''
                            }
                            {currentInfo && type === 'book' ?
                                <Book data = {currentInfo} type = {type} />
                                : ''
                            }
                        </div>) 
                        : <h2> Select a House/Character/Book</h2>
                    }
                </div>
            </div>
        );
    }
}

export default Main;