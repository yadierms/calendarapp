const { response } = require("express");

const Evento = require("../models/Evento");

const getEvento = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    msg: eventos,
  });
};

const crearEvento = async (req, res = response) => {
  // verfificar que tiene el evento

  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);

    const { uid } = req;

    if (!evento) {
      res.status(404).json({
        ok: false,
        msg: " Evento no existe por ese ID ",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para  eliminar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);

    const { uid } = req;

    if (!evento) {
      res.status(404).json({
        ok: false,
        msg: " Evento no existe por ese ID ",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para  eliminar este evento",
      });
    }
    await Evento.findByIdAndDelete(eventoId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
