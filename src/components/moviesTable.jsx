import React, {Component} from 'react';
import Like from './common/like'

class MoviesTable extends Component {
    raiseSort = path => {
        console.log('inside raiseSort : ' + path)
        const sortColumn = {...this.props.sortColumn}

        if(path === sortColumn.path)
        {
            console.log('came inside if')
            sortColumn.order = (this.props.sortColumn.order === 'asc')? 'desc' : 'asc'
        }
        else
        {
            console.log('came inside else')
            sortColumn.path = path;
            sortColumn.order = 'asc'
        }

        this.props.onSortEvent(sortColumn);
    }
    
    render() { 
        const {movies, onDeleteEvent, onLikeEvent, filteredMoviesPaginated, onSortEvent} = this.props;

        return ( 
            <table className="table">
                    <thead>
                        <tr>
                            <th onClick = { () => this.raiseSort('title')}>Title</th>
                            <th onClick = { () => this.raiseSort('genre.name')}>Genre</th>
                            <th onClick = { () => this.raiseSort('numberInStock')}>Stock</th>
                            <th onClick = { () => this.raiseSort('dailyRentalRate')}>Rate</th>
                            <th>Like</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredMoviesPaginated.map(movie => 
                        (<tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onClickLikeButton = { () => onLikeEvent(movie)}/>
                            </td>
                            <td><button onClick = { () => onDeleteEvent(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                        </tr>
                        ))
                        }
                        </tbody>
                </table>
        );
    }
}
 
export default MoviesTable;

// const MoviesTable = (props) => {
//     const {movies, onDeleteEvent, onLikeEvent, filteredMoviesPaginated, onSortEvent} = props;

//     return ( 
//         <table className="table">
//                 <thead>
//                     <tr>
//                         <th onClick = { () => onSortEvent('title')}>Title</th>
//                         <th onClick = { () => onSortEvent('genre.name')}>Genre</th>
//                         <th onClick = { () => onSortEvent('numberInStock')}>Stock</th>
//                         <th onClick = { () => onSortEvent('dailyRentalRate')}>Rate</th>
//                         <th>Like</th>
//                         <th></th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {filteredMoviesPaginated.map(movie => 
//                     (<tr key={movie._id}>
//                         <td>{movie.title}</td>
//                         <td>{movie.genre.name}</td>
//                         <td>{movie.numberInStock}</td>
//                         <td>{movie.dailyRentalRate}</td>
//                         <td>
//                             <Like liked={movie.liked} onClickLikeButton = { () => onLikeEvent(movie)}/>
//                         </td>
//                         <td><button onClick = { () => onDeleteEvent(movie)} className="btn btn-danger btn-sm">Delete</button></td>
//                     </tr>
//                     ))
//                     }
//                     </tbody>
//             </table>
//      );
// }
 
// export default MoviesTable;