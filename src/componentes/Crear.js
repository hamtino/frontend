import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";
class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        nombre:"",
        correo:""
    };
  }
  enviarDatos = (e) => {
      e.preventDefault();
      const {nombre, correo} = this.state;
      
      
      var datosEnviar = {nombre: nombre, correo: correo};
      fetch(Api + "?insertar=1",{
          method: "POST",
          body: JSON.stringify(datosEnviar)
      })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.table(datosRespuesta);
        this.props.history.push("/");
      })
      .catch(console.log);
  }
  
  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name]=e.target.value;
    this.setState({state});
  }
  render() {
    const {nombre, correo} = this.state;
    return (
      <div className="card">
        <div className="card-header">Header</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="">Nombre</label>
              <input
                onChange={this.cambioValor}
                value={nombre}
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
                value={correo}
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
                <button type="submit" className="btn btn-success">Crear Usuario</button>
                <Link type="button" className="btn btn-warning" to={"/"}>Cancelar</Link>
            </div>
          </form>
        </div>
        <div className="card-footer text-muted">Footer</div>
      </div>
    );
  }
}

export default Crear;
