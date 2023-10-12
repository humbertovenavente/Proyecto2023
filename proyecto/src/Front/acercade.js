// src/components/AcercaDe.js
import React from 'react';
import { useAuth } from './AuthContext';

function AcercaDe() {

    const { isLoggedIn } = useAuth();

    return (

        <div>
            <h2>Acerca de</h2>

            {isLoggedIn ? (
                <div>
                    {/* <button onClick={logout}>Cerrar sesión</button> */}
                    <p>Esta es la página "Acerca de" de nuestra aplicación.</p>
                </div>

            ) : (
                <p>Debes iniciar sesión</p>                
            )}

        </div>

    );
}

export default AcercaDe;