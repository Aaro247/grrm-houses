import React from 'react';
import Character from './Character';

let allCharacters = [];
let allPovCharacters = [];

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.data,
            characters: [],
            povCharacters: [],
            type: 'book'
        }
    }

    componentDidMount() {
        this.updateComponent();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.setState({ info: this.props.data });
            this.updateComponent();
        }
    }

    updateComponent = () => {
        const info = this.props.data;
        console.log(info);

        if(info.characters.length > 0) {
            allCharacters = [];
            for(let i = 0; i < info.characters.length; i++) {
                fetch(info.characters[i])
                    .then(res => res.json())
                    .then(data => this.setCharacterData(data));
            }
        }

        if(info.povCharacters.length > 0) {
            for(let i = 0; i < info.povCharacters.length; i++) {
                fetch(info.povCharacters[i])
                    .then(res => res.json())
                    .then(data => this.setPovCharacterData(data.name));
            }
        }
    }

    setCharacterData = (data) => {
        let allCharsData = {};
        allCharsData.name = data.name;
        allCharsData.url = data.url;
        allCharacters.push(allCharsData);
        this.setState({ characters: allCharacters });
    }

    setPovCharacterData = (data) => {
        let allPovCharsData = {};
        allPovCharsData.name = data.name;
        allPovCharsData.url = data.url;
        allPovCharacters.push(allPovCharsData);
        this.setState({ characters: allPovCharacters });
    }

    handleBtnClick = (e) => {
        let type = e.target.name;
        fetch(e.target.value)
            .then(res => res.json())
            .then(data => this.setState({info: data, type: type}));
    }

    render() {
        const { info, characters, povCharacters, type } = this.state;
        return (
            <div>
                {type === 'book' ?
                    (<div>
                        <div>
                            <b>Name:</b>{info.name}
                        </div>
                        {info.isbn ? 
                            (<div>
                                <b>Isbn:</b>{info.isbn}
                            </div>) 
                        : ''}
                        {info.authors[0] !== '' ? 
                            (<div>
                                <b>Authors:</b>
                                {info.authors.map((author) => (
                                    <span>{author}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {info.numberOfPages ? 
                            (<div>
                                <b>Number of Pages:</b>{info.numberOfPages}
                            </div>) 
                        : ''}
                        {info.publisher ? 
                            (<div>
                                <b>Publisher:</b>{info.publisher}
                            </div>) 
                        : ''}
                        {info.country ? 
                            (<div>
                                <b>Country:</b>{info.country}
                            </div>) 
                        : ''}
                        {info.mediaType ? 
                            (<div>
                                <b>Media Type:</b>{info.mediaType}
                            </div>) 
                        : ''}
                        {info.released ? 
                            (<div>
                                <b>Release:</b>{info.released}
                            </div>) 
                        : ''}
                        {characters.length > 0 ? 
                            (<div>
                                <b>Characters:</b>
                                {characters.map((char) => (
                                    <button name='character' value={char.url} onClick={this.handleBtnClick}>
                                        {char.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {povCharacters.length > 0 ? 
                            (<div>
                                <b>Pov Characters:</b>
                                {povCharacters.map((povChar) => (
                                    <button name='character' value={povChar.url} onClick={this.handleBtnClick}>
                                        {povChar.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                    </div>) 
                : ''}
                {type === 'character' ?
                    <Character data = {info} />
                : ''}
            </div>
        )
    }
}

export default Book;