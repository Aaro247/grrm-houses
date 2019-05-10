import React from 'react';
import '../index.css';
import actions from '../actions/action';
import { Dropdown } from 'react-bootstrap';

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
            searchText: ''
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

    render() {
        const { searchText } = this.state;

        return (
            <div>
                <div className='search-bar'>
                    <input
                        type='text'
                        value={searchText}
                        name='searchText'
                        placeholder='Search by House/Character/Book name'
                        onChange={this.handleSearchTextChange}
                    />
                </div>
                <div id='grid'>
                    <div className='grid-col'>
                        <h3>Houses</h3>
                        <ul className='scroll'>
                            {this.state.filteredHouses.map((house) => (
                                <li key={house.name}>{house.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='grid-col'>
                        <h3>Characters</h3>
                        <ul className='scroll'>
                            {this.state.filteredCharacters.map((character) => (
                                <li key={character.name}>{character.name ? character.name : character.aliases[0]}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='grid-col'>
                        <h3>Books</h3>
                        <ul className='scroll'>
                            {this.state.filteredBooks.map((book) => (
                                <li key={book.name}>{book.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;