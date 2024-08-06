const { Router } = require('express');
const ProductionController = require('./app/controllers/ProductionsController');

const router = Router();

router.get('/productions', ProductionController.index);
router.get('/productions/:id', ProductionController.show);
router.post('/productions', ProductionController.store);
router.put('/productions/:id', ProductionController.update);
router.delete('/productions/:id', ProductionController.delete);

module.exports = router;
