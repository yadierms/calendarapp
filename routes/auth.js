// rutas de usuarios  /Auth
// host + /api/auth

const { Router } = require("express");

const { check } = require("express-validator");
const router = Router();

const {
  crearUsario,
  logingUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser mayor a 6").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsario
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser mayor a 6").isLength({
      min: 6,
    }),
    validarCampos,
  ],

  logingUsuario
);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
