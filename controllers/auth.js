const { response } = require("express");

const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo ",
      });
    }

    usuario = new Usuario(req.body);

    // encrytar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // generar gwt

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "por favor hable con el administrador",
    });
  }
};

const logingUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email ",
      });
    }
    //  confirmar las contraseñas
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Passsword incorrecto",
      });
    }

    // generar JWT

    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.uid;

  const name = req.name;

  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  crearUsario,
  logingUsuario,
  revalidarToken,
};
