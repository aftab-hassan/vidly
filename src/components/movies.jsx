import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: null,
    sortColumn : {path : 'title', order : 'asc'}
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "random" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDeleteMovie = movieToDel => {
    //console.log("movieToDel._id == " + movieToDel._id)
    //console.log(this.state.movies)
    const moviesAfterDeletion = this.state.movies.filter(
      movie => movieToDel._id !== movie._id
    );
    //console.log(moviesAfterDeletion)
    this.setState({ movies: moviesAfterDeletion });
  };

  handleLike = movie => {
    //console.log('inside handleLike');
    const moviesAfterLike = [...this.state.movies];
    const index = moviesAfterLike.indexOf(movie);
    moviesAfterLike[index].liked = !moviesAfterLike[index].liked;
    this.setState({ movies: moviesAfterLike });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
    //console.log('clicked handlePageChange ' + page);
    //console.log('currentPage ==' + this.state.currentPage)
  };

  handleLikeNoArg = () => {
    //console.log('inside handleLike');
  };

  handleFilterClick = genre => {
    //console.log('clicked genre : ' + genre.name)
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    //   console.log('inside handleSort : ' + path)

    //   if(path === this.state.sortColumn.path)
    //   {
    //     this.state.sortColumn.order = (this.state.sortColumn.order === 'asc')? 'desc' : 'asc'
    //   }
    //   else
    //   {
    //     this.state.sortColumn.path = path;
    //     this.state.sortColumn.order = 'asc'
    //   }
        console.log('printing sortColumn')
        console.log(sortColumn)
      this.setState({sortColumn : sortColumn})
  }

  render() {
    const paginatedMovies = paginate(
      this.state.movies,
      this.state.currentPage,
      this.state.pageSize
    );

    const filteredMovies =
      this.state.currentGenre && this.state.currentGenre.name != "All Genres"
        ? this.state.movies.filter(
            movie => this.state.currentGenre.name === movie.genre.name
          )
        : this.state.movies;
    console.log(filteredMovies);

    const sortedFilteredMovies = _.orderBy(filteredMovies, this.state.sortColumn.path, this.state.sortColumn.order)

    const filteredMoviesPaginated = paginate(
        sortedFilteredMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    console.log(filteredMoviesPaginated);

    const { length: count } = filteredMovies;
    // console.log(this.state.genres);

    if (count === 0) return <p>There are no movies in the database!</p>;

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            onClicking={this.handleFilterClick}
            genres={this.state.genres}
            currentGenre={this.state.currentGenre}
          />
        </div>
        <div className="col">
          <p>There are {count} movies in the database!</p>
          <MoviesTable
            filteredMoviesPaginated={filteredMoviesPaginated}
            movies={this.state.movies}
            onDeleteEvent={this.handleDeleteMovie}
            onLikEvent={this.handleLike}
            onSortEvent={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            currentPage={this.state.currentPage}
            pageSize={this.state.pageSize}
            itemsCount={filteredMovies.length}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
