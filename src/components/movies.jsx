import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'; 
import Like from './common/like'
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate'
import ListGroup from './common/listGroup';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component{
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
        genres: getGenres(),
        currentGenre : null
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

    handlePageChange = (page) => {
        this.setState( {currentPage:page})
        console.log('clicked handlePageChange ' + page);
        console.log('currentPage ==' + this.state.currentPage)
    }

    handleLikeNoArg = () => {
        console.log('inside handleLike');
    }

    handleFilterClick = (genre) => {
        console.log('clicked genre : ' + genre.name)
    }

    render(){
        const {length: count} = this.state.movies;
        // console.log(this.state.genres);

        if(count === 0)
            return <p>There are no movies in the database!</p>

        const paginatedMovies = paginate(this.state.movies, this.state.currentPage, this.state.pageSize);

        return(
        <React.Fragment>
            <div>
                <ListGroup onClicking={this.handleFilterClick} genres={this.state.genres} currentGenre = {this.state.currentGenre}/>
            </div>
            <div>
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
                {paginatedMovies.map(movie => 
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
        <Pagination currentPage = {this.state.currentPage} pageSize={this.state.pageSize} itemsCount={this.state.movies.length} onPageChange={this.handlePageChange}/>
            </div>
        </React.Fragment>)    
    }
}

export default Movies