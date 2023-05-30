import { useState } from "react";
import Categorias from "./Categorias";
import Recomendaciones from "./Recomendaciones";

const Body = () => {
  const [categoriaId, setCategoriaId] = useState("");

  return (
    <div className="body-total grid">
      <div className="movil-buscador flex-column body-buscador">
        <div className="container-text-buscador">
          <p className="text-buscador mb-1 text-2xl text-white py-5 font-bold">
            Busca ofertas en recorridos, aventuras y mucho más
          </p>
        </div>
        <div className="movil-buscador-inputs flex pb-5">
          <input
            className="input-buscador mb-3 border border-3 rounded-md h-12 px-5"
            type="text"
            placeholder="¿A dónde vamos?"
          />
          <input
            className="input-buscador mb-3 border border-3 rounded-md h-12 px-5"
            type="text"
            placeholder="¿Qué tipo de experiencia?"
          />
          <input
            className="input-buscador mb-3 border border-3 rounded-md h-12 px-5"
            type="date"
          />
          <button className="input-buscador mb-3 button-buscador border border-3 rounded-sm h-12 px-5">
            Buscar
          </button>
        </div>
      </div>
      <div className="body-categorias p-3 color-title-body font-bold text-2xl relative">
        <p className="p-categorias mb-3">Buscar por tipo de experiencias</p>
        <Categorias setCategoriaId={setCategoriaId} />
      </div>
      <div className="body-recomendaciones p-3 color-title-body font-bold text-2xl">
      <p className="p-recomendaciones mb-3">Recomendaciones</p>
        <Recomendaciones categoriaId={categoriaId} />
      </div>
    </div>
  );
};

export default Body;
