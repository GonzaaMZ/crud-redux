import { useDispatch, useSelector } from "react-redux";
import { crearProductoAction } from "../actions/productoActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const NuevoProducto = ({history}) => {
    
    let navigate =  useNavigate();

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    const cargando = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)

    const dispatch = useDispatch();

    const agregarProducto = (producto) => dispatch(crearProductoAction(producto));

    // cuando el usurio haga submit
    const submitNuevoProducto = (e) => {
        e.preventDefault();

        // Validar Form
        if(nombre.trim() === '' || precio <= 0){
            return;
        }

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

       navigate("/")
        
    } 


    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        <form
                        onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="nombre"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input 
                                type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="precio"
                                value={precio}
                                onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        { cargando ? <p>Cargando...</p> : null}

                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;