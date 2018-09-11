import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Table from './common/table'
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like", content:movie => <Like liked={movie.liked} onClickLikeButton={() => this.props.onLikeEvent(movie)} />},
    { key: "delete", content:movie=><button onClick = { () => this.props.onDeleteEvent(movie)} className="btn btn-danger btn-sm">Delete</button>}
  ];

  render() {
    const {
      movies,
      onDeleteEvent,
      onLikeEvent,
      filteredMoviesPaginated,
      onSortEvent,
      sortColumn
    } = this.props;

    return (
      <Table columns={this.columns} data={filteredMoviesPaginated} sortColumn={sortColumn} onSortEvent={onSortEvent}/>
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
