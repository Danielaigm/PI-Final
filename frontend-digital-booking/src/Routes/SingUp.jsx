import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SingUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset();
    };
    return (
        <div className="form-container gap-5 bg-gray-100">
            <h1 className=" w-full mb-9  text-center font-bold text-black">
                Registrarse
            </h1>
            <form
                className="w-[80%]  flex flex-col items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2   items-center   text-center w-full gap-10">
                    <div className="relative ">
                        <input
                            name="Nombre del producto"
                            placeholder=" "
                            className="inputsSinUp"
                            {...register("email", { required: true })}
                        />

                        <label className="labelsUp" htmlFor="email">
                            Nombre Completo
                        </label>
                        {errors.email && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            name="Nombre del producto"
                            placeholder=" "
                            className="inputsSinUp"
                            {...register("email", { required: true })}
                        />

                        <label className="labelsUp" htmlFor="email">
                            Email
                        </label>
                        {errors.email && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                    <div className="relative ">
                        <input
                            name="Nombre del producto"
                            placeholder=" "
                            className="inputsSinUp  "
                            {...register("email", { required: true })}
                        />

                        <label className="labelsUp" htmlFor="email">
                            Email
                        </label>
                        {errors.email && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder=" "
                            className="inputsSinUp "
                            {...register("password", { required: true })}
                        />
                        <label className="labelsUp">Contraseña</label>
                        {errors.password && (
                            <p className="text-red-500">
                                Este campo es requerido
                            </p>
                        )}
                    </div>
                </div>

                <button
                    className=" btn-cuenta mt-10 hover:text-white hover:bg-black"
                    type="submit"
                >
                    Registrarse
                </button>
            </form>
            <p className="text-black">
                ¿Ya tienes cuenta?
                <Link to={"/sing-in"}>Ingresa aquí</Link>
            </p>
        </div>
    );
};

export default SingUp;
