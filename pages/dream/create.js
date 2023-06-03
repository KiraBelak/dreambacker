import axios from "axios";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input, TextArea } from "@/components/forms/fields";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const CreateFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/chayannehello", data);
      toast.success("Todo OK");
      router.push("/");
    } catch (error) {
      toast.error("Ocurrió un error mandando tu información");
    }
    setLoading(false);
  };

  return (
    <div className="ml-3 mr-3 pt-20 w-full flex justify-center  min-h-screen bg-black">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
        <div className="ml-3 mr-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Información Personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Comparte tu correo electrónico para acceder a la descarga
          </p>

          <Input
            placeholder="ejemplo@email.com"
            name="email"
            type="email"
            register={{
              ...register("email", {
                required: {
                  value: true,
                  message: "Por favor ingresa un email válido",
                },
              }),
            }}
            errorMessage={errors?.email?.message}
          />

          <TextArea
            className="mt-1 text-base leading-6 text-gray-600"
            label="¿Te gustaría recibir actualizaciones de nuevos libros para colorear en el futuro?"
            placeholder="Si es así, ¿cómo te gustaría recibirlas (por correo electrónico, redes sociales, etc.)?"
            name="about"
            register={{
              ...register("about", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }),
            }}
            errorMessage={errors?.about?.message}
          />
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? <LoadingCircle color="#ffffff" /> : "Guardar y enviar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateFormPage;
