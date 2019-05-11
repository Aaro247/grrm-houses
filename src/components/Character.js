import React from 'react';
import Book from './Book';

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
            this.setState({ info: this.props.data});
            this.updateComponent();
        }
    } 

    updateComponent = () => {
        const info = this.props.data;

        if(this.state.type === 'character') {
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
                let allegiances = [];

                for(let i = 0; i < info.allegiances.length; i++) {
                    fetch(info.allegiances[i])
                        .then(res => res.json())
                        .then(data => allegiances.push(data.name));
                }
                
                this.setState({ allegiances: allegiances });
            }

            if(info.books.length > 0) {
                let books = [];

                for(let i = 0; i < info.books.length; i++) {
                    fetch(info.books[i])
                        .then(res => res.json())
                        .then(data => books.push(data.name));
                }
                
                this.setState({ books: books });
            }

            if(info.povBooks.length > 0) {
                let povBooks = [];

                for(let i = 0; i < info.povBooks.length; i++) {
                    fetch(info.povBooks[i])
                        .then(res => res.json())
                        .then(data => povBooks.push(data.name));
                }
                
                this.setState({ povBooks: povBooks });
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

    handleBtnClick = (e) => {
        let type = e.target.name;
        fetch(e.target.value)
            .then(res => res.json())
            .then(data => this.setState({info: data, type: type}));
    }

    render() {
        const { info, father, mother, spouse, allegiances, books, povBooks, type } = this.state;
        return (
            <div>
                {type === 'character' ?
                    (<div>
                        <div>
                            <b>Name:</b>{info.name ? info.name : info.aliases[0]}
                        </div>
                        {info.gender ? 
                            (<div>
                                <b>Gender:</b>{info.gender}
                            </div>) 
                        : ''}
                        {info.culture ? 
                            (<div>
                                <b>Culture:</b>{info.culture}
                            </div>) 
                        : ''}
                        {info.born ? 
                            (<div>
                                <b>Born:</b>{info.born}
                            </div>) 
                        : ''}
                        {info.died ? 
                            (<div>
                                <b>Died:</b>{info.died}
                            </div>) 
                        : ''}
                        {info.titles[0] !== '' ? 
                            (<div>
                                <b>Titles:</b>
                                {info.titles.map((title) => (
                                    <span>{title}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {info.aliases[0] !== '' ? 
                            (<div>
                                <b>Aliases:</b>
                                {info.aliases.map((alias) => (
                                    <span>{alias}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {father.length > 0 ? 
                            (<div>
                                <b>Father:</b>
                                {father.map((f) => (
                                    <button name='character' value={f.url} onClick={this.handleBtnClick}>
                                        {f.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                        {mother.length > 0 ? 
                            (<div>
                                <b>Mother:</b>
                                {mother.map((m) => (
                                    <button name='character' value={m.url} onClick={this.handleBtnClick}>
                                        {m.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                        {spouse.length > 0 ? 
                            (<div>
                                <b>Spouse:</b>
                                {spouse.map((s) => (
                                    <button name='character' value={s.url} onClick={this.handleBtnClick}>
                                        {s.name}
                                    </button>
                                ))}
                            </div>)
                        : ''}
                        {allegiances.length > 0 ? 
                            (<div>
                                <b>Allegiances:</b>
                                {allegiances.map((allegiance) => (
                                    <span>{allegiance}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {books.length > 0 ? 
                            (<div>
                                <b>Books:</b>
                                {books.map((book) => (
                                    <span>{book}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {povBooks.length > 0 ? 
                            (<div>
                                <b>Pov Books:</b>
                                {povBooks.map((povBook) => (
                                    <span>{povBook}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {info.tvSeries[0] !== '' ? 
                            (<div>
                                <b>TV Series:</b>
                                {info.tvSeries.map((tv) => (
                                    <span>{tv}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {info.playedBy[0] !== '' ? 
                            (<div>
                                <b>Played By:</b>
                                {info.playedBy.map((actor) => (
                                    <span>{actor}, </span>
                                ))}
                            </div>) 
                        : ''}
                    </div>)
                : ''}
                {type === 'book' ?
                    <Book data = {info} />
                : ''}
            </div>
        )
    }
}

export default Character;