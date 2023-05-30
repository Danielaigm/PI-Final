import { useState, useEffect } from 'react';
import digitalBooking from "../api/digitalBooking";
import "./Styles/List.css"
import ButtonBack from '../Components/ButtonBack'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {IoIosAddCircle, IoIosRemoveCircle } from 'react-icons/io'
import CreateCategory from '../Components/CreateCategory';


function ProductList({ categoriaId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    async function fetchData() {
      cargarProductos();
      cargarCategorias();
    }
    fetchData();
  }, [categoriaId]);

  useEffect(() => {
    async function fetchData() {
      cargarProductos();
      cargarCategorias();
    }
    fetchData();
  }, [page, pageSize]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    cargarProductos();
    cargarCategorias();
    setModalOpen(false);
  };

  const cargarProductos = async () => {
    try {
      const data = await digitalBooking.get(
        `/product/getAll?pageSize=${pageSize}&sortField=idProduct&sortOrder=asc&pageNumber=${page}`
      );
      setProductos(data.data.content);
      setTotalPages(data.data.totalPages);
      setTotalElements(data.data.totalElements);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const cargarCategorias = async () => {
    const data = await digitalBooking.get("/category/getAll");
    setCategories(data.data);
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

  const deleteProduct = async (tourId) => {
    try {
      digitalBooking.delete(`/product/delete/${tourId}`);
      cargarProductos();
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  const handleCategoryChange = async (productId, selectedCategory) => {
    try {
      const updateData = {
        category: { idCategory: selectedCategory},
      };
  
      await digitalBooking.put(`product/update/${productId}`, updateData);
      cargarProductos();
      alert('La categoría del producto se ha actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar la categoría del producto:', error);
      alert('Se produjo un error al actualizar la categoría del producto. Por favor, intenta nuevamente.');
    }
  };


  return (
    <div className='list'>
      <ButtonBack/>
      <h2 className='page-name'>Lista de Tours</h2>
      <div className='contenedor-btn-createCategory'>
        <button onClick={handleOpenModal} className='btn-createCategory'>Crear Categoría</button>
      </div>
      <CreateCategory isOpen={modalOpen} onClose={handleCloseModal} />
      <div className='table-container'>
      <table className='table-responsive'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Guía turístico</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((tour) => (
            <tr key={tour.idProduct}>
              <td>#{tour.idProduct}</td>
              <td>{tour.nameProduct}</td>
              <td>{tour.descriptionProduct}</td>
              <td>{tour.price}</td>
              <td>{tour.turistGuide}</td>
              <td>
                <select
                value={selectedCategory.idCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}>
                {categories.map((category) => (
                  <option key={category.idCategory} value={category.idCategory} selected={category.nameCategory === tour.category.nameCategory}>
                    {category.nameCategory}
                  </option>
                ))}
              </select>
              </td>
              <td className='action-column'>
                <button className="btn-delete" onClick={() => deleteProduct(tour.idProduct)}>
                  Eliminar
                </button>
              <button
                className='btn-category-change'
                onClick={() =>
                  handleCategoryChange(tour.idProduct, selectedCategory)
                }
              >
                Actualizar
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='flex justify-between w-1/4< p-5'>
            <div>
              <button onClick={handlePageSizeDecrement} disabled={pageSize === 1} className="mt-2">
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
            <div>
              <button onClick={handlePreviousPage} disabled={page === 0} className='align-middle'>
                <BsFillArrowLeftCircleFill className="mr-5 text-base" />
              </button>
              <span className="mx-5 text-base">Página {page + 1}</span>
              <button onClick={handleNextPage} disabled={page === totalPages - 1} className='align-middle'>
                <BsFillArrowRightCircleFill className="ml-5 text-base" />
              </button>
            </div>
        
          </div>
    </div>
  );
}

export default ProductList;