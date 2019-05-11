import React from 'react';

class Character extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.data);
        return (
            <div></div>
        )
    }
}

export default Character;