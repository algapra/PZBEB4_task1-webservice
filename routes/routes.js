const express = require('express')
const router = express.Router()

const atkKantorCtrl = require('../controller/atkKantor');

router.post('/atkKantor', atkKantorCtrl.create);
router.get('/atkKantor', atkKantorCtrl.fetch);
router.get('/atkKantor/:id', atkKantorCtrl.get);
router.put('/atkKantor/:id', atkKantorCtrl.update);
router.delete('/atkKantor/:id', atkKantorCtrl.destroy);

module.exports = router
