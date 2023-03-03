const express = require('express')
const router = express.Router()

const atkKantorCtrl = require('../controller/atkKantor');
const jadwalPiketCtrl = require('../controller/jadwalPiket');

// router untuk Alat Tulis Kantor
router.post('/atkKantor', atkKantorCtrl.create);
router.get('/atkKantor', atkKantorCtrl.fetch);
router.get('/atkKantor/:id', atkKantorCtrl.get);
router.put('/atkKantor/:id', atkKantorCtrl.update);
router.delete('/atkKantor/:id', atkKantorCtrl.destroy);

// router untuk Jadwal Piket
router.post('/jadwalPiket', jadwalPiketCtrl.create);
router.get('/jadwalPiket', jadwalPiketCtrl.fetch);
router.get('/jadwalPiket/:id', jadwalPiketCtrl.get);
router.put('/jadwalPiket/:id/:hari', jadwalPiketCtrl.update);
router.delete('/jadwalPiket/:id/:hari', jadwalPiketCtrl.destroy);

module.exports = router
