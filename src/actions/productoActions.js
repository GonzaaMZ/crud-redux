import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO
} from "../types"

import clienteAxios from '../config/axios';
import Swal from "sweetalert2";

export function crearProductoAction(producto){
    return async (dispatch) => {
        dispatch(agregarProducto()) 
        
        try {
            await clienteAxios.post('/d', producto); 
            dispatch(agregarProductoExito(producto))
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Intenta nuevamente'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})