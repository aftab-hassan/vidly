import React, { Component } from 'react';

class ListGroup extends Component {
    state = {  }
    
    render() { 
        const genres = this.props.genres;
        //console.log(genres);
        return ( 
            <ul className="list-group">
            {
                genres.map( (item) => (
                    <li onClick = {() => (
                        this.props.onClicking(item)
                    )} key={item._id} className= {this.props.currentGenre===item ? "list-group-item active" : "list-group-item"}>{item.name}</li>
                ))
            }
            </ul>
         );
    }
}
 
export default ListGroup;