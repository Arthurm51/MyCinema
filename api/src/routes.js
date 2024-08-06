const { Router } = require('express');
const ProductionsController = require('./app/controllers/ProductionsController');
const GendersController = require('./app/controllers/GendersController');

const router = Router();

router.get('/productions', ProductionsController.index);
router.get('/productions/:id', ProductionsController.show);
router.post('/productions', ProductionsController.store);
router.put('/productions/:id', ProductionsController.update);
router.delete('/productions/:id', ProductionsController.delete);

router.get('/genders', GendersController.index);
router.get('/genders/:id', GendersController.show);
router.post('/genders', GendersController.store);
router.put('/genders/:id', GendersController.update);
router.delete('/genders/:id', GendersController.delete);

module.exports = router;
