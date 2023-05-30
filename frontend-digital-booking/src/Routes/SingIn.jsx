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
                <div className="flex flex-col items-center   text-center w-full gap-10">
                    <div className="relative w-[40%]">
                        <input
                            name="Nombre del producto"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200 "
                            {...register("email", { required: true })}
                        />

                        <label
                            className="absolute left-20 top-0 transition-all text-black"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        {errors.email && (
                            <p className="text-red-500 ">
                                Este campo es requerido
                            </p>
                        )}
                    </div>

                    <div className="relative w-[40%]">
                        <input
                            type="password"
                            name="password"
                            placeholder=" "
                            className="pt-4 pb-1  w-[80%] px-4 mt-0 bg-white text-black transition-all border appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
                            {...register("password", { required: true })}
                        />
                        <label className="absolute left-20 top-1 transition-all text-black">
                            Contraseña
                        </label>
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
