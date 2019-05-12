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
            this.setState({ info: this.props.data, type: this.props.type });
            this.updateComponent();
        }
    }

    updateComponent = () => {
        const info = this.props.data;
        const type = this.props.type;
        allCharacters = [];
        allPovCharacters = [];

        if(type === 'book') {
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
            .then(data => {
                if(type === 'book') {
                    this.setState({info: data, type: type});
                    this.updateComponent(data);
                }
                else
                    this.setState({info: data, type: type});
            });
    }

    render() {
        const { info, characters, povCharacters, type } = this.state;
        return (
            <div>
                {type === 'book' ?
                    (<div>
                        <div className='info-row'>
                            ><b>Name: </b>{info.name}
                        </div>
                        {info.isbn ? 
                            (<div className='info-row'>
                                ><b>ISBN: </b>{info.isbn}
                            </div>) 
                        : ''}
                        {info.authors[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Authors: </b>
                                {info.authors.map((author) => (
                                    <span>{author}</span>
                                ))}
                            </div>) 
                        : ''}
                        {info.numberOfPages ? 
                            (<div className='info-row'>
                                ><b>Number of Pages: </b>{info.numberOfPages}
                            </div>) 
                        : ''}
                        {info.publisher ? 
                            (<div className='info-row'>
                                ><b>Publisher: </b>{info.publisher}
                            </div>) 
                        : ''}
                        {info.country ? 
                            (<div className='info-row'>
                                ><b>Country: </b>{info.country}
                            </div>) 
                        : ''}
                        {info.mediaType ? 
                            (<div className='info-row'>
                                ><b>Media Type: </b>{info.mediaType}
                            </div>) 
                        : ''}
                        {info.released ? 
                            (<div className='info-row'>
                                ><b>Release: </b>{info.released}
                            </div>) 
                        : ''}
                        {characters.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Characters: </b>
                                {characters.map((char) => (
                                    <button name='character' value={char.url} onClick={this.handleBtnClick}>
                                        {char.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {povCharacters.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Pov Characters: </b>
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
                    <Character data = {info} type = {type} />
                : ''}
            </div>
        )
    }
}

export default Book;