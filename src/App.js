import Facturas from "./componentes/Facturas";
import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link active" to={"/"}>
            Facturas
          </Link>
          <Link className="nav-item nav-link" to={"/crear"}>
            Crear Factura
          </Link>
          <Link className="nav-item nav-link" to={"/editar"}>
            Editar Factura
          </Link>
        </div>
      </nav>
      <br></br>
      <div className="container">
        <Route exact path="/" component={Facturas}></Route>
        <Route path="/crear" component={Crear}></Route>
        <Route path="/editar" component={Editar}></Route>
      </div>
    </Router>
  );
}

export default App;
