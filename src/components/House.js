import React from 'react';
import Character from './Character';

let currentLord = [];
let heir = [];
let overlord = [];
let founder = [];
let allCadetBranches = [];
let allSwornMembers = [];

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
            swornMembers: [],
            type: 'house'
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
        currentLord = [];
        heir = [];
        overlord = [];
        founder = [];
        allCadetBranches = [];
        allSwornMembers = [];

        if(type === 'house') {
            if(info.currentLord !== '') {
                fetch(info.currentLord)
                    .then(res => res.json())
                    .then(data => this.setCurrentLordData(data));
            }
            else {
                this.setState({currentLord: ''});
            }

            if(info.heir !== '') {
                fetch(info.heir)
                    .then(res => res.json())
                    .then(data => this.setHeirData(data));
            }
            else {
                this.setState({heir: ''});
            }

            if(info.overlord !== '') {
                fetch(info.overlord)
                    .then(res => res.json())
                    .then(data => this.setOverlordData(data));
            }
            else {
                this.setState({overlord: ''});
            }

            if(info.founder !== '') {
                fetch(info.founder)
                    .then(res => res.json())
                    .then(data => this.setFounderData(data));
            }
            else {
                this.setState({founder: ''});
            }

            if(info.cadetBranches.length > 0) {
                for(let i = 0; i < info.cadetBranches.length; i++) {
                    fetch(info.cadetBranches[i])
                        .then(res => res.json())
                        .then(data => this.setCadetBranchData(data));
                }
            }
            else {
                this.setState({cadetBranches: []});
            }

            if(info.swornMembers.length > 0) {
                for(let i = 0; i < info.swornMembers.length; i++) {
                    fetch(info.swornMembers[i])
                        .then(res => res.json())
                        .then(data => this.setSwornMemberData(data));
                }
            }
            else {
                this.setState({swornMembers: []});
            }
        }
    }

    setCurrentLordData = (data) => {
        let currentLordObj = {};
        currentLordObj.name = data.name;
        currentLordObj.url = data.url;
        currentLord.push(currentLordObj);
        this.setState({ currentLord: currentLord });
    }

    setHeirData = (data) => {
        let heirObj = {};
        heirObj.name = data.name;
        heirObj.url = data.url;
        heir.push(heirObj);
        this.setState({ heir: heir });
    }

    setOverlordData = (data) => {
        let overlordObj = {};
        overlordObj.name = data.name;
        overlordObj.url = data.url;
        overlord.push(overlordObj);
        this.setState({ overlord: overlord });
    }

    setFounderData = (data) => {
        let founderObj = {};
        founderObj.name = data.name;
        founderObj.url = data.url;
        founder.push(founderObj);
        this.setState({ founder: founder });
    }

    setCadetBranchData = (data) => {
        let cadetBranchObj = {};
        cadetBranchObj.name = data.name;
        cadetBranchObj.url = data.url;
        allCadetBranches.push(cadetBranchObj);
        this.setState({ cadetBranches: allCadetBranches });
    }

    setSwornMemberData = (data) => {
        let swornMemberObj = {};
        swornMemberObj.name = data.name;
        swornMemberObj.url = data.url;
        allSwornMembers.push(swornMemberObj);
        this.setState({ swornMembers: allSwornMembers });
    }

    handleBtnClick = (e) => {
        let type = e.target.name;
        fetch(e.target.value)
            .then(res => res.json())
            .then(data => {
                if(type === 'house') {
                    this.setState({info: data, type: type});
                    this.updateComponent(data);
                }
                else
                    this.setState({info: data, type: type});
            });
    }

    render() {
        const { info, currentLord, heir, overlord, founder, cadetBranches, swornMembers, type } = this.state;

        return (
            <div>
                {type === 'house' ? 
                    (<div>
                        <div className='info-row'>
                            ><b>Name: </b><span>{info.name}</span>
                        </div>
                        {info.region ? 
                            (<div className='info-row'>
                                ><b>Region: </b><span>{info.region}</span>
                            </div>) 
                        : ''}
                        {info.coatOfArms ? 
                            (<div className='info-row'>
                                ><b>Coat of Arms: </b><span>{info.coatOfArms}</span>
                            </div>) 
                        : ''}
                        {info.words ? 
                            (<div className='info-row'>
                                ><b>Words: </b><span>{info.words}</span>
                            </div>) 
                        : ''}
                        {info.titles[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Titles: </b>
                                {info.titles.map((title) => (
                                    <span>{title}</span>
                                ))}
                            </div>) 
                        : ''}
                        {info.seats[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Seats: </b>
                                {info.seats.map((seat) => (
                                    <span>{seat}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {currentLord ? 
                            (<div className='info-row'>
                                ><b>Current Lord: </b>
                                {currentLord.map((c) => (
                                    <button name='character' value={c.url} onClick={this.handleBtnClick}>
                                        {c.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {heir ? 
                            (<div className='info-row'>
                                ><b>Heir: </b>
                                {heir.map((h) => (
                                    <button name='character' value={h.url} onClick={this.handleBtnClick}>
                                        {h.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {overlord ? 
                            (<div className='info-row'>
                                ><b>Overlord: </b>
                                {overlord.map((o) => (
                                    <button name='house' value={o.url} onClick={this.handleBtnClick}>
                                        {o.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {info.founded ? 
                            (<div className='info-row'>
                                ><b>Founded: </b><span>{info.founded}</span>
                            </div>) 
                        : ''}
                        {founder ? 
                            (<div className='info-row'>
                                ><b>Founder: </b>
                                {founder.map((f) => (
                                    <button name='character' value={f.url} onClick={this.handleBtnClick}>
                                        {f.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {info.diedOut ? 
                            (<div className='info-row'>
                                ><b>Died out: </b><span>{info.diedOut}</span>
                            </div>) 
                        : ''}
                        {info.ancestralWeapons[0] !== '' ? 
                            (<div className='info-row'>
                                ><b>Ancestral Weapons: </b>
                                {info.ancestralWeapons.map((weapon) => (
                                    <span>{weapon}, </span>
                                ))}
                            </div>) 
                        : ''}
                        {cadetBranches.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Cadet Branches: </b>
                                {cadetBranches.map((cadetBranch) => (
                                    <button name='house' value={cadetBranch.url} onClick={this.handleBtnClick}>
                                        {cadetBranch.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                        {swornMembers.length > 0 ? 
                            (<div className='info-row'>
                                ><b>Sworn Members:</b>
                                {swornMembers.map((swornMember) => (
                                    <button name='character' value={swornMember.url} onClick={this.handleBtnClick}>
                                        {swornMember.name}
                                    </button>
                                ))}
                            </div>) 
                        : ''}
                    </div>) : ''}
                {type === 'character' ?
                    <Character data = {info} type = {type} />
                : ''}
            </div>
        )
    }
}

export default House;