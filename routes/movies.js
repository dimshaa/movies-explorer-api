const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', addMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
