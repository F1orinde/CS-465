const express=require('express');
const router=express.Router();
const ctrl=require('../controllers/trips');

router.get('/trips',ctrl.tripsList);
router.post('/trips',ctrl.tripsAdd);
router.put('/trips/:tripId',ctrl.tripsUpdate);
router.delete('/trips/:tripId',ctrl.tripsDelete);

module.exports=router;
