import "./Styles/Form.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import digitalBooking from "../api/digitalBooking";
import { IoTrashOutline } from "react-icons/io5";

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "inputs",
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [productos, setProductos] = useState([]);
    const [showError, setShowError] = useState(false);
    const [categorias, setCategorias] = useState([]);

    const cargarCategorias = async () => {
        const data = await digitalBooking.get("/category/getAll");
        setCategorias(data.data);
    };
    const cargarProductos = async () => {
        const data = await digitalBooking.get("/product/allRandom");
        setProductos(data.data);
    };
    useEffect(() => {
        async function fetchData() {
            cargarCategorias();
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            cargarProductos();
        }
        fetchData();
    }, []);

    const onSubmit = (data) => {
        const formData = {
            nameProduct: data.nameProduct,
            descriptionProduct: data.descriptionProduct,
            price: (data.price = parseInt(data.price)),
            turistGuide: data.turistGuide,
            category: { idCategory: (data.category = parseInt(data.category)) },
            duration: (data.duration = parseInt(data.duration)),
            images: data.inputs.map((input, index) => ({
                nameImage: "img" + index + data.nameProduct,
                urlImage: input.value,
            })),
        };

        const aux = productos.map((product) => product.nameProduct);
        const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBkYi5jb20iLCJpYXQiOjE2ODU0MDk3OTAsImV4cCI6MTY4NTQxMDk5MH0.m7dH9cV4NQM_LB9LWQvhjv1i5PQGwOd92QxnyOpeQLA";

        if (aux.includes(formData.nameProduct)) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        } else {
            axios;
            digitalBooking
                .post("/product/create", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    reset();
                    remove();
                    setShowSuccessMessage(true);

                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                })
                .catch((error) => {
                    console.error(error);
                });
            // pueba local
            // console.log(formData);
            // reset();
            // remove();
            // setShowSuccessMessage(true);

            // setTimeout(() => {
            //     setShowSuccessMessage(false);
            // }, 3000);
        }
    };

    return (
        <div className="form-container bg-gray-100 overflow-auto ">
            <h1 className=" w-full mb-9  text-center font-bold text-black">
                Crear nuevo tour
            </h1>

            <form
                className="w-[80%] h-[80%]  flex flex-col items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid  grid-cols-2 text-center flex-wrap justify-between w-full gap-10">
                    <div className="relative">
                        <input
                            name="Nombre del producto"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200 "
                            {...register("nameProduct", { required: true })}
                        />

                        <label
                            className="absolute left-20 top-1 transition-all text-black"
                            htmlFor="nameProduct"
                        >
                            Nombre del tour
                        </label>
                        {errors.nameProduct && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <select
                            name="categoria"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                            {...register("category", { required: true })}
                        >
                            <option value=""></option>
                            {categorias.map((category) => (
                                <option
                                    key={category.idCategory}
                                    value={category.idCategory}
                                >
                                    {category.nameCategory}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="category"
                            className="absolute left-20 top-8 transition-all text-black "
                        >
                            Categoría
                        </label>
                        {errors.category && (
                            <p className="text-red-500">
                                Este campo es requerido
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            name="duration"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                            {...register("duration", { required: true })}
                        />
                        <label className="absolute left-20 top-1 transition-all text-black">
                            Duración del tour
                        </label>
                        {errors.duration && (
                            <p className="text-red-500">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            name="turistGuide"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                            {...register("turistGuide", { required: true })}
                        />
                        <label className="absolute left-20 top-1 transition-all text-black">
                            Guía Turístico
                        </label>
                        {errors.turistGuide && (
                            <p className="text-red-500">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            name="price"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                            {...register("price", { required: true })}
                        />
                        <label className="absolute left-20 top-1 transition-all text-black">
                            Precio del tour
                        </label>
                        {errors.price && (
                            <p className="text-red-500">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid mt-10  grid-cols-2 text-center flex-wrap justify-between w-full gap-10">
                    <div className="relative ">
                        <textarea
                            name="descriptionProduct"
                            placeholder=" "
                            className="pt-4 pb-1 w-[80%] h-40 px-4 mt-0 bg-white text-black border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                            {...register("descriptionProduct", {
                                required: true,
                            })}
                        />
                        <label className="absolute left-20 top-2 transition-all text-black">
                            Descripción del tour
                        </label>
                        {errors.descriptionProduct && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                    <div>
                        {fields.map((field, index) => (
                            <div className="relative mb-10" key={field.id}>
                                <input
                                    placeholder=" "
                                    className="pt-4 pb-1  w-[75%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                                    type="text"
                                    {...register(`inputs.${index}.value`, {
                                        required: true,
                                    })}
                                    defaultValue={field.value}
                                />
                                <label
                                    className="absolute left-20 top-1 transition-all text-black"
                                    htmlFor="dd"
                                >
                                    Imagen N° {index + 1}
                                </label>
                                <button
                                    className="text-red-400 text-2xl"
                                    type="button"
                                    onClick={() => remove(index)}
                                >
                                    <IoTrashOutline />
                                </button>
                            </div>
                        ))}
                        <button
                            className="btn-cuenta  hover:text-white hover:bg-black"
                            type="button"
                            onClick={() => append({ value: "" })}
                        >
                            Agregar imagen
                        </button>
                    </div>
                </div>

                {showSuccessMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <strong className="font-bold">Tour creado!</strong>
                        <span className="block sm:inline">
                            El tour ha sido creado con exito.
                        </span>
                    </div>
                )}
                {showError && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline">
                            El Tour que estas ingresando se encuentra
                            registrado.
                        </span>
                    </div>
                )}

                <button
                    className=" btn-cuenta mt-5  hover:text-white hover:bg-black"
                    type="submit"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Form;
