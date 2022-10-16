const router = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { checkAddMovie, checkId } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', checkAddMovie, addMovie);
router.delete('/:id', checkId, deleteMovie);

module.exports = router;
