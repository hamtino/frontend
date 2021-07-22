import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";
class Facturas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datosCargados: false, empleados: [] };
  }
  cargarDatos() {
    console.log('Api: ', Api);
    fetch(Api)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, empleados: datosRespuesta });
      })
      .catch(console.log);
  }
  eliminarRegistro = (id) => {
    fetch(Api + "?borrar=" + id)
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.cargarDatos();
        console.table(datosRespuesta);
      })
      .catch(console.log);
  };
  componentDidMount() {
    this.cargarDatos();
  }
  render() {
    const { datosCargados, empleados } = this.state;
    if (!datosCargados) {
      return <p>Cargando...</p>;
    } else {
      return (
        <div className="card">
          <div className="card-header">Informacion General</div>
          <div className="card-body">
            <Link type="button" className="btn btn-success" to={"/crear"}>
              Agregar
            </Link>
            <table className="table table-striped table-inverse table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.id}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.correo}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link
                          type="button"
                          className="btn btn-primary"
                          to={"/Editar/" + empleado.id}
                        >
                          Editar
                        </Link>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => this.eliminarRegistro(empleado.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
export default Facturas;
