import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Styles/Detail.css'
import iconPlace from '../assets/iconPlace.svg'
import iconClock from '../assets/iconClock.svg'
import iconCategory from '../assets/iconCategory.svg'
import iconFav from '../assets/iconFav.svg'
import iconShare from '../assets/iconShare.svg'
import iconPrice from '../assets/iconPrice.svg'
import iconGuide from '../assets/iconGuide.svg'
import ButtonBack from '../Components/ButtonBack'
import digitalBooking from "../api/digitalBooking";
import Gallery from '../Components/Gallery'


const Detail = () => {
  const params = useParams()
  const [tour, setTour] = useState();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      cargarTour(params.id);
    }
    fetchData();
  }, [params.id]);

  const cargarTour = async (params) => {
    const data = await digitalBooking.get(`/product/${params}`);
    setTour(data.data);
  };

  if (!tour) {
    return <div>Cargando tour...</div>;
  }

  const handleVerMasClick = (productoId) => {
    setSelectedProductId(productoId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='detail'>
        <ButtonBack/>
        <div className='place'>
          <img src={iconPlace} alt="" />
          {tour?.nameProduct}
        </div>
        <div className='share-like'><img src={iconShare} alt="" /><img src={iconFav} alt="" /></div>
        <div className='tour-images'>
          <img className= "main-photo" src={tour?.images[0].urlImage} alt="" />
          <div className='sub-photos'>
            {tour?.images.slice(1,5).map((img) => (
            <img key={img.id} src={img.urlImage} alt="" />
            ))}
            {tour?.images.length > 5 && (
              <button
                className="ver-mas-btn"
                onClick={() => handleVerMasClick(tour.idProducto)}
              >
                Ver más
              </button>
            )}
            </div>
            {modalVisible && (
            <Gallery tour={tour} onClose={handleCloseModal}/>
            )}
        </div>
        <div className='description'>
          <h1 className='title'>Descripcion</h1>
          <p className='description-text'>{tour?.descriptionProduct}</p>
        </div>
        <div className='atributes-conteiner'>
          <h1 className='title'>Atributos</h1>
          <div className='atributes'>
          <div className='atribute'>
            <img src={iconClock} alt="" /> <span> Duración del tour:</span> {tour?.duration} día(s)
          </div>
          <div className='atribute'>
            <img src={iconCategory} alt="" /> <span> Categoría:</span> {tour?.category.nameCategory}
          </div>
          <div className='atribute'>
            <img src={iconPrice} alt="" /> <span> Precio:</span>{tour?.price} USD 
          </div>
          <div className='atribute'>
            <img src={iconGuide} alt="" /> <span> Guía turístico:</span> {tour?.turistGuide}
          </div>
          </div>
        </div>
        <div className='reservations'> Sección de Reservas</div>
    </div>
  )
}

export default Detail