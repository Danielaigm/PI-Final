import { useEffect, useState } from "react";
import digitalBooking from "../api/digitalBooking";
import { FaMapMarkerAlt, FaRegHeart, FaRegStar } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/Gi";
import "./Styles/Recomendaciones.css";
import { Link } from "react-router-dom";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io'

const Recomendaciones = ({ categoriaId }) => {
  const [productos, setProductos] = useState([]);
  console.log(productos);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(10);

  useEffect(() => {
    async function fetchData() {
      cargarProductos();
    }
    fetchData();
  }, [categoriaId]);

  useEffect(() => {
    async function fetchData() {
      cargarProductos();
    }
    fetchData();
  }, [page, pageSize]);

  const cargarProductos = async () => {
    try {
      const data = await digitalBooking.get(
        `/product/getAll?pageSize=${pageSize}&sortField=idProduct&sortOrder=asc&pageNumber=${page}&categoryId=${categoriaId}`
      );
      setProductos(data.data.content);
      setTotalPages(data.data.totalPages);
      setTotalElements(data.data.totalElements);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handlePageSizeIncrement = () => {
    if (pageSize < totalElements) {
      setPageSize(pageSize + 1);
      setPage(0);
    }
  };

  const handlePageSizeDecrement = () => {
    if (pageSize > 1) {
      setPageSize(pageSize - 1);
      setPage(0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="contenedor-cards-productos">
      {productos.map(
        ({ nameProduct, descriptionProduct, images, idProduct, duration }) => (
          <div key={idProduct} className="contenedor-productos">
            <div className="contenedor-imagen">
              <img src={images[0].urlImage} alt="image" />
              <div className="contenedor-icono-corazon">
                <FaRegHeart className="corazon" />
              </div>
            </div>
            <div className="card-contenedor">
              <div style={{display: "flex", flexDirection: "column", justifyContent:"space-between"}}>
                <div style={{ display: "flex" }}>
                  <FaMapMarkerAlt />
                  <h1 className="card-nombre">{nameProduct}</h1>
                </div>
                <div className="texto-duracion">
                  <GiSandsOfTime />
                  <p>Duración: {duration} días</p>
                </div>
                <div className="valoracion">
                  <p> Valoración </p>
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                  <FaRegStar />
                </div>
              </div>
              <div className="contenedor-descripcion-boton">
                <h1>Descripcion</h1>
                <p className="texto-producto">
                  {descriptionProduct.length > 20
                    ? descriptionProduct.substring(0, 120) + "..."
                    : descriptionProduct}
                </p>
                <Link to={`/${idProduct}`}>Ver más</Link>
                <button className="btn-reserva">
                  {" "}
                  <Link to={`/${idProduct}`}>Reservas</Link>
                </button>
              </div>
            </div>
          </div>
        )
      )}
      <div className='flex justify-between w-1/4<'>
      <div  className='align-middle'>
          {/* <span className="text-xl mt-5 mx-5">Items por página</span> */}
          <button onClick={handlePageSizeDecrement} disabled={pageSize === 1}>
            <IoIosRemoveCircle className="text-base" />
          </button>
          <span className="mx-5 text-base">Items {pageSize}</span>
          <button
            onClick={handlePageSizeIncrement}
            disabled={pageSize === totalElements}
            className="mt-2"
          >
            <IoIosAddCircle className="text-base" />
          </button>
        </div>
        <div  className='align-middle'>
          <button onClick={handlePreviousPage} disabled={page === 0}>
            <BsFillArrowLeftCircleFill className="mr-5 text-base" />
          </button>
          <span className="text-base">Página {page + 1}</span>
          <button onClick={handleNextPage} disabled={page === totalPages - 1}>
            <BsFillArrowRightCircleFill className="ml-5 text-base" />
          </button>
        </div>
        
      </div>
    </div>
    
  );
};

export default Recomendaciones;
