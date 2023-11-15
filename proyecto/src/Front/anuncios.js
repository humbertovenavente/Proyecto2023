import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
// import { WindowSharp } from '@mui/icons-material';
import { useAuth } from './AuthContext';

var r_anuncios = [];
var response;

const Anuncios = () => {

    const { p_anuncios } = useAuth();

    const [datos, setDatos] = useState([]);
    const [oper, setOper] = useState(0);

    useEffect(() => {
        // setOper(1);
        // leerAnuncios()
    }, [])

    // async function leerAnuncios() {
    //     try {
    //         response = await axios.get("http://localhost/proy/leeranuncios.php")
    //     } catch (error) {
    //         setOper(3);
    //     } finally {
    //         r_anuncios = response.data
    //         if (r_anuncios.length >= 1) {
    //             setDatos(r_anuncios);
    //             setOper(0);
    //         } else {
    //             setOper(3);
    //         }
    //     }

    // }

    function click_anuncio(e) {
        // console.log(datos[e])
        const url = datos[e].url_anuncio
        contar_click(datos[e].id_anuncio)
        window.open(url, '_blank')
    }

    const contar_click = async (id) => {
        // e.preventDefault();
        try {
            response = await axios.post("http://localhost/proy/cuentaclickanuncio.php", {
                id: id
            });
        } catch (error) {
            console.log(error)
        } finally {

        }
    };

    return (

        <div className='border'>

            <h4>Anuncios</h4>

            {oper === 0 ? (

                <div style={{ display: 'block', width: 700, padding: 30, margin: '0 auto' }}>
                    <Carousel>
                        {p_anuncios.map((dato, index) => (
                            <Carousel.Item interval={1500} style={{ height: 350, backgroundColor: 'gray' }} key={index}>
                                <div onClick={(e) => click_anuncio(index)} style={{ cursor: "pointer" }}>
                                    <img style={{ height: 200 }} src={dato.url_imagen} alt="Image One" />
                                    <Carousel.Caption>
                                        <h3>{dato.titulo_anuncio}</h3>
                                        <p>{dato.detalle_anuncio}</p>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

            ) : oper === 1 ? (
                <div>
                    <span>Leyendo Anuncios, espere..</span>
                    <div className="spinner-border" role="status" />
                </div>
            ) : (
                <p>Sin anuncios para mostrar...</p>
            )}

        </div>

    )
}

export default Anuncios
