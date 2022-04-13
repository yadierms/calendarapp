const { Router } = require("express");

const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

// todas  tienen que pasar por la validaicon del JWT

router.use(validarJWT);

//  obtener eventos

router.get("/", getEvento);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", " el titulo es obligatorio").not().isEmpty(),
    check("start", "la fecha es obligatoria").custom(isDate),
    check("end", "la fecha es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// actualizar eventos
router.put(
  "/:id",
  [
    check("title", " el titulo es obligatorio").not().isEmpty(),
    check("start", "la fecha es obligatoria").custom(isDate),
    check("end", "la fecha es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//  borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
