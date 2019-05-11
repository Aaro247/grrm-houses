import React from 'react';

class Book extends React.Component {
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

export default Book;