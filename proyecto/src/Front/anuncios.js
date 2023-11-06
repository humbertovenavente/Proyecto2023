import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

var r_anuncios = [];
var response;

const Anuncios = () => {

    const [datos, setDatos] = useState([]);
    const [oper, setOper] = useState(0);

    useEffect(() => {
        setOper(1);
        leerAnuncios()
    }, [])

    async function leerAnuncios() {
        try {
            response = await axios.get("http://localhost/proy/leeranuncios.php")
        } catch (error) {
            setOper(3);
        } finally {
            r_anuncios = response.data
            if (r_anuncios.length >= 1) {
                setDatos(r_anuncios);
                setOper(0);
            } else {
                setOper(3);
            }
        }

    }

    return (

        <div className='border'>

            <h4>Anuncios</h4>

            {oper === 0 ? (

                <div style={{ display: 'block', width: 700, padding: 30, margin: '0 auto' }}>
                    <Carousel>
                        {datos.map((dato, index) => (
                            <Carousel.Item interval={1500} style={{ height: 350, backgroundColor: 'gray' }} key={index}>
                                <a href={dato.url_anuncio} target="_blank">
                                    <img style={{ height: 200 }}
                                        src={dato.url_imagen}
                                        alt="Image One"
                                    />
                                    <Carousel.Caption>
                                        <h3>{dato.titulo_anuncio}</h3>
                                        <p>{dato.detalle_anuncio}</p>
                                    </Carousel.Caption>
                                </a>
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
