// src/components/AcercaDe.js
import React from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios'

function AcercaDe() {

    const { isLoggedIn } = useAuth();

    async function sendMail() {
        try {
            const response = await axios.get("http://gregserver/apisP/sendmail.php")
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    // async function sendMail2() {
    //     try {
    //         const response = await axios.get("http://localhost/proy/sendmail2.php")
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (

        <div>
            <h2>Acerca de</h2>

            {isLoggedIn ? (
                <div>
                    {/* <button onClick={logout}>Cerrar sesión</button> */}
                    <p>Esta es la página "Acerca de" de nuestra aplicación.</p>
                </div>

            ) : (
                <div>
                    <p>Debes iniciar sesión</p>    

                    <button id='but' onClick={() => sendMail()}>Enviar</button>
                    {/* <button id='but' onClick={() => sendMail2()}>Enviar Mail()</button> */}
                </div>
            )}

        </div>

    );
}

export default AcercaDe;

// // src/components/AcercaDe.js
// import React from 'react';
// import { useAuth } from './AuthContext';

// function AcercaDe() {

//     const { isLoggedIn } = useAuth();

//     return (

//         <div>
//             <h2>Acerca de</h2>

//             {isLoggedIn ? (
//                 <div>
//                     {/* <button onClick={logout}>Cerrar sesión</button> */}
//                     <p>Esta es la página "Acerca de" de nuestra aplicación.</p>
//                 </div>

//             ) : (
//                 <p>Debes iniciar sesión</p>                
//             )}

//         </div>

//     );
// }

// export default AcercaDe;

