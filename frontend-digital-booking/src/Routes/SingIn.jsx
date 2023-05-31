import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SingIn = () => {
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

    //ejemplo de imagenes
    // const { register, handleSubmit } = useForm();

    // const onSubmit = (data) => {
    //     const photos = Array.from(data.photos);
    //     console.log(photos);
    //     console.log(photos[0]);
    // };

    return (
        <div className="form-container gap-5 bg-gray-100">
            <h1 className=" w-full mb-9  text-center font-bold text-black">
                Iniciar Sesión
            </h1>
            <form
                className="w-[80%]  flex flex-col items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center  w-[100%] md:w-[65%]  lg:w-[60%] text-center  gap-10">
                    <div className="relative lg:w-[60%]  w-[80%] md:w-[60%] sm:w-[50%]  ">
                        <input
                            name="Nombre del producto"
                            placeholder=" "
                            className="inputsSingIn "
                            {...register("email", { required: true })}
                        />

                        <label className="labels" htmlFor="email">
                            Email
                        </label>
                        {errors.email && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>

                    <div className="relative lg:w-[60%]  w-[80%] md:w-[60%] sm:w-[50%] ">
                        <input
                            type="password"
                            name="password"
                            placeholder=" "
                            className="inputsSingIn"
                            {...register("password", { required: true })}
                        />
                        <label className="labels">Contraseña</label>
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
                    Ingresar
                </button>
            </form>
            <p className="text-black">
                ¿Aún no tienes cuenta?
                <Link to={"/sing-up"}>Registrate aquí</Link>
            </p>
            {/* ejemplo de imagenes */}
            {/* <form className="bg-slate-400" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="file"
                    name="photos"
                    {...register("photos", { required: true })}
                    multiple
                />
                <button type="submit">Enviar</button>
            </form> */}
        </div>
    );
};

export default SingIn;
