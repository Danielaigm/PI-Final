import React, {useState } from 'react';
import digitalBooking from "../api/digitalBooking";
import "./Styles/CreateCategory.css"

const CreateCategory = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleReset = () => {
    setCategory({
        name: '',
        description: '',
        imageUrl: '',
    });
    setErrors({
        name: '',
        description: '',
        imageUrl: '',
    });
    setShowSuccessMessage(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = {
        nameCategory: category.name,
        descriptionCategory: category.description,
        image: category.imageUrl
    };

    let formIsValid = true;
    const newErrors = {
      name: '',
      description: '',
      imageUrl: '',
    };

    if (!category.name) {
      formIsValid = false;
      newErrors.name = 'Por favor, ingresa el nombre de la categoría.';
    }

    if (!category.description) {
      formIsValid = false;
      newErrors.description = 'Por favor, ingresa la descripción de la categoría.';
    }

    if (!category.imageUrl) {
      formIsValid = false;
      newErrors.imageUrl = 'Por favor, ingresa la URL de la imagen de la categoría.';
    }

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    try {

    const existingCategories = await digitalBooking.get('/category/getAll');
    const categoryExists = existingCategories.data.some((c) => c.nameCategory === category.name);

    if (categoryExists) {
        setErrors((prevErrors) => ({...prevErrors,name: 'El nombre de la categoría ya existe. Por favor, elija otro nombre.',}));
        return;
    }

    await digitalBooking.post("/category/create", formData);
    setShowSuccessMessage(true);
    setTimeout(() => {
        onClose();
        setCategory({
            name: '',
            description: '',
            imageUrl: '',
        });
        setErrors({
            name: '',
            description: '',
            imageUrl: '',
        });
        setShowSuccessMessage(false);
    }, 3000);
    
    } catch (error) {
      console.error('Error al crear la categoría:', error);
      setErrors((prevErrors) => ({...prevErrors,name: 'Se produjo un error al crear la categoría. Por favor, intenta nuevamente.',}));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de la categoría:
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleInputChange}
              
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>
          <label>
            Descripción:
            <textarea
              name="description"
              value={category.description}
              onChange={handleInputChange}
            ></textarea>
             {errors.description && <p className="error">{errors.description}</p>}
          </label>
          <label>
            URL de la imagen:
            <input
              type="text"
              name="imageUrl"
              value={category.imageUrl}
              onChange={handleInputChange}  
            />
             {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
          </label>
          {showSuccessMessage && (
                    <div className='success-msg'>
                        <strong>Categoría creada! </strong>
                        <span>
                            La categoría ha sido creado con exito.
                        </span>
                    </div>
            )}
          <div>
            <button className='btn-close' onClick={() => { handleReset(); onClose(); }}>Regresar</button>
            <button type="submit">Crear</button>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default CreateCategory;