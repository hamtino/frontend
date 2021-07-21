import React from "react";
import { Link } from "react-router-dom";
class Facturas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datosCargados: false, empleados: [] };
  }
  cargarDatos() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        this.setState({ datosCargados: true, empleados: datosRespuesta });
        console.table(datosRespuesta);
      })
      .catch(console.log);
  }
  componentDidMount() {
    this.cargarDatos();
  }
  render() {
    const { datosCargados, empleados } = this.state;
    if (!datosCargados) {
      return <p>Cargando...</p>;
    } else {
      return (
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
                <td>{empleado.name}</td>
                <td>{empleado.email}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="">
                    <Link
                      type="button"
                      className="btn btn-primary"
                      to={"/Editar"}
                    >
                      Editar
                    </Link>
                    <button type="button" className="btn btn-warning">
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default Facturas;
