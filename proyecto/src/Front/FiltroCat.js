import React from "react";

const FiltroCat = () => {
  return (
    <div>
      <h3>
        Bienvenidos al Comida, en esta parte se mostrarán los artículos que
        hayan sido publicados recientemente
      </h3>

      {/* <select
        id="categoria"
        name="categoria"
        value={categoriaAct}
        onChange={(cat) => setCategoriaAct(cat.target.value)}
        required
      >
        <option value="" key={""}>
          Seleccione una categoria
        </option>
        {datos2.map((dato2) => (
          <option value={dato2.nombre_categoria} key={dato2.id_categoria}>
            {dato2.nombre_categoria}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default FiltroCat;
