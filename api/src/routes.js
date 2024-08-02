const { Router } = require('express');
const ProductionController = require('./app/controllers/ProductionsController');

const router = Router();

router.get('/productions', ProductionController.index);
router.get('/productions/:id', ProductionController.show);
router.post('/productions', ProductionController.store);

module.exports = router;
