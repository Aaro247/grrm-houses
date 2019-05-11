import React from 'react';
import Book from './Book';
import House from './House';

let allAllegiances = [];
let allBooks = [];
let allPovBooks = [];

class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.data,
            father: [],
            mother: [],
            spouse: [],
            allegiances: [],
            books: [],
            povBooks: [],
            type: 'character'
        }
    }

    componentDidMount() {
        this.updateComponent();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data) {
            this.setState({ info: this.props.data, type: this.props.type});
            this.updateComponent();
        }
    } 

    updateComponent = () => {
        const info = this.props.data;
        const type = this.props.type;

        if(type === 'character') {
            if(info.father !== '') {
                fetch(info.father)
                    .then(res => res.json())
                    .then(data => this.setFatherData(data));
            }

            if(info.mother !== '') {
                fetch(info.mother)
                    .then(res => res.json())
                    .then(data => this.setMotherData(data));
            }

            if(info.spouse !== '') {
                fetch(info.spouse)
                    .then(res => res.json())
                    .then(data => this.setSpouseData(data));
            }

            if(info.allegiances.length > 0) {
                for(let i = 0; i < info.allegiances.length; i++) {
                    fetch(info.allegiances[i])
                        .then(res => res.json())
                        .then(data => this.setAllegiancesData(data));
                }
            }

            if(info.books.length > 0) {
                for(let i = 0; i < info.books.length; i++) {
                    fetch(info.books[i])
                        .then(res => res.json())
                        .then(data => this.setBooksData(data));
                }
            }

            if(info.povBooks.length > 0) {
                for(let i = 0; i < info.povBooks.length; i++) {
                    fetch(info.povBooks[i])
                        .then(res => res.json())
                        .then(data => this.setPovBooksData(data));
                }
            }
        }
    }

    setFatherData = (data) => {
        let fatherObj = {};
        let father = [];
        fatherObj.name = data.name;
        fatherObj.url = data.url;
        father.push(fatherObj);
        this.setState({ father: father });
    }

    setMotherData = (data) => {
        let motherObj = {};
        let mother = [];
        motherObj.name = data.name;
        motherObj.url = data.url;
        mother.push(motherObj);
        this.setState({ mother: mother });
    }

    setSpouseData = (data) => {
        let spouseObj = {};
        let spouse = [];
        spouseObj.name = data.name;
        spouseObj.url = data.url;
        spouse.push(spouseObj);
        this.setState({ spouse: spouse });
    }

    setAllegiancesData = (data) => {
        let allegianceObj = {};
        allegianceObj.name = data.name;
        allegianceObj.url = data.url;
        allAllegiances.push(allegianceObj);
        this.setState({ allegiances: allAllegiances });
    }

    setBooksData = (data) => {
        let bookObj = {};
        bookObj.name = data.name;
        bookObj.url = data.url;
        allBooks.push(bookObj);
        this.setState({ books: allBooks });
    }

    setPovBooksData = (data) => {
        let povBookObj = {};
        povBookObj.name = data.name;
        povBookObj.url = data.url;
        allPovBooks.push(povBookObj);
        this.setState({ povBooks: allPovBooks });
    }

    handleBtnClick = (e) => {
        let type = e.target.name;
        fetch(e.target.value)
            .then(res => res.json())
            .then(data => this.setState({info: data, type: type}));
    }

    render() {
        const { info, father, mother, spouse, allegiances, books, povBooks, type } = this.state;
        console.log(allegiances);
        return (
            <div>
                {type === 'character' ?
                    (<div>
                        <div className='info-row'>
                            ><b>Name: </b>{info.name ? info.name : info.aliases[0]}
                        </div>
                        {info.gender ? 
                            (<div className='info-row'>
                                ><b>Gender: </b>{info.gender}
                            </div>) 
                        : ''}
                        {info.culture ? 
                            (<div className='info-row'>
                                ><b>Culture: </b>{info.culture}
                            </div>) 
                        : ''}
                        {info.born ? 
                            (<div className='info-row'>
                                ><b>Born: </b>{info.born}
                            </div>) 
                        : ''}
                        {info.died ? 
                            (<div className='info-row'>
                                ><b>Died: </b>{info.died}
                            </div>) 
                        : ''}
                        {info.titles[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Titles: </b>
                                {info.titles.map((title) => (
                                    <span>{title}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {info.aliases[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Aliases: </b>
                                {info.aliases.map((alias) => (
                                    <span>{alias}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {father.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Father: </b>
                                {father.map((f) => (
                                    <button name='character' value={f.url} onClick={this.handleBtnClick}>
                                        {f.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                        {mother.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Mother: </b>
                                {mother.map((m) => (
                                    <button name='character' value={m.url} onClick={this.handleBtnClick}>
                                        {m.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                        {spouse.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Spouse: </b>
                                {spouse.map((s) => (
                                    <button name='character' value={s.url} onClick={this.handleBtnClick}>
                                        {s.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                        {allegiances.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Allegiances: </b>
                                {allegiances.map((allegiance) => (
                                    <button name='house' value={allegiance.url} onClick={this.handleBtnClick}>
                                        {allegiance.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {books.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Books: </b>
                                {books.map((book) => (
                                    <button name='book' value={book.url} onClick={this.handleBtnClick}>
                                        {book.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {povBooks.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Pov Books: </b>
                                {povBooks.map((povBook) => (
                                    <button name='book' value={povBook.url} onClick={this.handleBtnClick}>
                                        {povBook.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {info.tvSeries[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>TV Series: </b>
                                {info.tvSeries.map((tv) => (
                                    <span>{tv}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {info.playedBy[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Played By: </b>
                                {info.playedBy.map((actor) => (
                                    <span>{actor}, </span>
                                ))}
                            </div>) 
                        : ''}
                    </div>)
                : ''}
                {type === 'book' ?
                    <Book data = {info} type={type} />
                : ''}
                {type === 'house' ?
                    <House data = {info} type={type} />
                : ''}
            </div>
        )
    }
}

export default Character;