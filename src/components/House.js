import React from 'react';

class House extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: props.data,
            currentLord: '',
            heir: '',
            overlord: '',
            founder: '',
            cadetBranches: [],
            swornMembers: []
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
        const { info } = this.state;

        if(info.currentLord !== '') {
            fetch(info.currentLord)
                .then(res => res.json())
                .then(data => this.setState({ currentLord: data.name }));
        }

        if(info.heir !== '') {
            fetch(info.heir)
                .then(res => res.json())
                .then(data => this.setState({ heir: data.name }));
        }

        if(info.overlord !== '') {
            fetch(info.overlord)
                .then(res => res.json())
                .then(data => this.setState({ overlord: data.name }));
        }

        if(info.founder !== '') {
            fetch(info.founder)
                .then(res => res.json())
                .then(data => this.setState({ founder: data.name }));
        }

        if(info.cadetBranches.length > 0) {
            let cadetBranches = [];
            
            for(let i = 0; i < info.cadetBranches.length; i++) {
                fetch(info.cadetBranches[i])
                    .then(res => res.json())
                    .then(data => cadetBranches.push(data.name));
            }
            this.setState({ cadetBranches: cadetBranches });
        }

        if(info.swornMembers.length > 0) {
            let swornMembers = [];
            
            for(let i = 0; i < info.swornMembers.length; i++) {
                fetch(info.swornMembers[i])
                    .then(res => res.json())
                    .then(data => swornMembers.push(data.name));
            }
            this.setState({ swornMembers: swornMembers });
        }
    }

    render() {
        const { info, currentLord, heir, overlord, founder, cadetBranches, swornMembers } = this.state;

        return (
            <div>
                <div>
                    <b>Name:</b>{info.name}
                </div>
                {info.region ? 
                    (<div>
                        <b>Region:</b>{info.region}
                    </div>) 
                : ''}
                {info.coatOfArms ? 
                    (<div>
                        <b>Coat of Arms:</b>{info.coatOfArms}
                    </div>) 
                : ''}
                {info.words ? 
                    (<div>
                        <b>Words:</b>{info.words}
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
                {info.seats[0] !== '' ? 
                    (<div>
                        <b>Seats:</b>
                        {info.seats.map((seat) => (
                            <span>{seat}, </span>
                        ))}
                    </div>) 
                : ''}
                {currentLord ? 
                    (<div>
                        <b>Current Lord:</b>{currentLord}
                    </div>) 
                : ''}
                {heir ? 
                    (<div>
                        <b>Heir:</b>{heir}
                    </div>) 
                : ''}
                {overlord ? 
                    (<div>
                        <b>Overlord:</b>{overlord}
                    </div>) 
                : ''}
                {info.founded ? 
                    (<div>
                        <b>Founded:</b>{info.founded}
                    </div>) 
                : ''}
                {founder ? 
                    (<div>
                        <b>Founder:</b>{founder}
                    </div>) 
                : ''}
                {info.diedOut ? 
                    (<div>
                        <b>Died out:</b>{info.diedOut}
                    </div>) 
                : ''}
                {info.ancestralWeapons[0] !== '' ? 
                    (<div>
                        <b>Ancestral Weapons:</b>
                        {info.ancestralWeapons.map((weapon) => (
                            <span>{weapon}, </span>
                        ))}
                    </div>) 
                : ''}
                {cadetBranches.length > 0 ? 
                    (<div>
                        <b>Cadet Branches:</b>
                        {cadetBranches.map((branch) => (
                            <span>{branch}, </span>
                        ))}
                    </div>) 
                : ''}
                {swornMembers.length > 0 ? 
                    (<div>
                        <b>Sworn Members:</b>
                        {swornMembers.map((member) => (
                            <span>{member}, </span>
                        ))}
                    </div>) 
                : ''}
            </div>
        )
    }
}

export default House;