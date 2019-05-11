import React from 'react';

class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.data,
            father: '',
            mother: '',
            spouse: '',
            allegiances: [],
            books: [],
            povBooks: []
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

        if(info.father !== '') {
            fetch(info.father)
                .then(res => res.json())
                .then(data => this.setState({ father: data.name }));
        }

        if(info.mother !== '') {
            fetch(info.mother)
                .then(res => res.json())
                .then(data => this.setState({ mother: data.name }));
        }

        if(info.spouse !== '') {
            fetch(info.spouse)
                .then(res => res.json())
                .then(data => this.setState({ spouse: data.name }));
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

    render() {
        const { info, father, mother, spouse, allegiances, books, povBooks } = this.state;

        return (
            <div>
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
                {father ? 
                    (<div>
                        <b>Father:</b>{father}
                    </div>) 
                : ''}
                {mother ? 
                    (<div>
                        <b>Mother:</b>{mother}
                    </div>) 
                : ''}
                {spouse ? 
                    (<div>
                        <b>Spouse:</b>{spouse}
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
            </div>
        )
    }
}

export default Character;