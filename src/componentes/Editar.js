import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";
class Editar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datosCargados: true, empleado: [] };
  }
  cambioValor = (e) => {
    const state = this.state.empleado;
    state[e.target.name] = e.target.value;
    this.setState({ empleado: state });
  };
  enviarDatos = (e) => {
    e.preventDefault();
    const { nombre, correo, id } = this.state.empleado;
    var datosEnviar = {id: id, nombre: nombre, correo: correo};
    fetch(Api + "?actualizar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.table(datosRespuesta);
        this.props.history.push("/");
      })
      .catch(console.log);

  };
  componentDidMount() {
    console.log(this.props.match.params.id);
    fetch(
      "http://localhost:84/empleados/?consultar=" + this.props.match.params.id
    )
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, empleado: datosRespuesta[0] });
      })
      .catch(console.log);
  }
  render() {
    const { datosCargados, empleado } = this.state;
    if (!datosCargados) {
      return <p>Cargando...</p>;
    } else {
      return (
        <div className="card">
          <div className="card-header">Editar</div>
          <div className="card-body">
            <form onSubmit={this.enviarDatos}>
              <div className="form-group">
                <label htmlFor="">ID</label>
                <input
                  onChange={this.cambioValor}
                  value={empleado.id}
                  type="text"
                  name="id"
                  id="id"
                  readOnly
                  className="form-control"
                  placeholder="1"
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el Nombre
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="">Nombre</label>
                <input
                  onChange={this.cambioValor}
                  value={empleado.nombre}
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="form-control"
                  placeholder="Pepito Perez"
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el Nombre
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="">Correo</label>
                <input
                  onChange={this.cambioValor}
                  value={empleado.correo}
                  type="text"
                  name="correo"
                  id="correo"
                  className="form-control"
                  placeholder="pepito@perez.com"
                  aria-describedby="helpId"
                />
                <small id="helpId" className="text-muted">
                  Escribe el Correo
                </small>
              </div>
              <br />
              <div className="btn-group" role="group" aria-label="">
                <button type="submit" className="btn btn-success">
                  Actualizar Usuario
                </button>
                <Link type="button" className="btn btn-warning" to={"/"}>
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
          <div className="card-footer text-muted">Footer</div>
        </div>
      );
    }
  }
}

export default Editar;
