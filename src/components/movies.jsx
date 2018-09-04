import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'; 
import Like from './common/like'

class Movies extends Component{
    state = {
        movies: getMovies()
    }

    handleDeleteMovie = (movieToDel) => {
        console.log("movieToDel._id == " + movieToDel._id)
        console.log(this.state.movies)
        const moviesAfterDeletion = this.state.movies.filter ( movie => movieToDel._id !== movie._id);
        console.log(moviesAfterDeletion)
        this.setState({movies: moviesAfterDeletion})
    }

    handleLike = (movie) => {
        console.log('inside handleLike');
        const moviesAfterLike = [...this.state.movies];
        const index = moviesAfterLike.indexOf(movie);
        moviesAfterLike[index].liked = !moviesAfterLike[index].liked
        this.setState( {movies: moviesAfterLike} )
    }

    handleLikeNoArg = () => {
        console.log('inside handleLike');
    }

    render(){
        const {length: count} = this.state.movies;

        if(count === 0)
            return <p>There are no movies in the database!</p>

        return(
        <React.Fragment>
            <p>There are {count} movies in the database!</p>
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Stock</th>
                    <th>Rate</th>
                    <th>Like</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {this.state.movies.map(movie => 
                (<tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                        <Like liked={movie.liked} onClickLikeButton = { () => this.handleLike(movie)}/>
                        {/* <Like liked={movie.liked} onClickLikeButton = {this.handleLikeNoArg}/> */}
                    </td>
                    <td><button onClick = { () => this.handleDeleteMovie(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                </tr>
                ))
                }
                </tbody>
        </table>     
            </React.Fragment>)    
    }
}

export default Movies