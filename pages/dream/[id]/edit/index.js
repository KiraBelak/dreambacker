// import MainLayout from "@/components/layouts/MainLayout";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import NavBar from "@/components/NavBar";
import Footer from "@/components/common/Footer";
import { useContext, useState, useEffect } from "react";
import { WalletContext } from "@/src/wallet";
import { useStorageUpload } from "@thirdweb-dev/react";
import { set } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
<<<<<<< HEAD
=======
import { useWallet } from "@solana/wallet-adapter-react";
>>>>>>> 2553d35359bae392eec86a35193b246b7d65d2ab



export default function Example() {
<<<<<<< HEAD
  const {publicKey} = useContext(WalletContext);
=======
  const {publicKey} = useWallet();
>>>>>>> 2553d35359bae392eec86a35193b246b7d65d2ab
  const [user, setUser] = useState({}); //user data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [main_goal, setMainGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [bronze, setBronze] = useState("");
  const [silver, setSilver] = useState("");
  const [gold, setGold] = useState("");
  const [files, setFile] = useState(null);
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);

  
  //traer el [id] del proyecto
  const { id } = router.query;
  // console.log(id);
  
  const getDream = async() => {
    try {      
      const response = await axios.get(`/api/dream/${id}`);
      console.log("the dream",response.data.dream);
      setTitle(response.data.dream.title);
      setDescription(response.data.dream.description);
      setMainGoal(response.data.dream.main_goal);
      setDeadline(response.data.dream.deadline);
      setThumbnail(response.data.dream.thumbnail);
      console.log("the benefits",response.data.dream.benefits[0]);
      setBronze(response.data.dream.benefits[0].bronze);
      setSilver(response.data.dream.benefits[1].silver);
      setGold(response.data.dream.benefits[2].gold);


      
      setDream(response.data.dream);
    } catch (error) {
      console.log(error);
    }
  }

  const getOwner = async() => {
    try{
      const response = await axios.get(`/api/dream?wallet=${publicKey}`);
      //the response contains an array of dreams, if the publicKey is inside the wallet propery of any of the dreams, then the user is the owner of the dream
      if(response.data.dreams.length > 0){
        const isOwner = response.data.dreams.some(dream => dream.wallet == publicKey);

        setIsOwner(isOwner);
      }
      console.log(response);
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if(id != null && id != undefined)
    getDream();
    getOwner();
  }, [id]);


  
  

  

  
  
  useEffect(()=> {
    if (publicKey && !(user == null || user == {})) {
      // getProfile(publicKey);
    }
  }, [publicKey]);

 //funcion para manejar el envio del formulario
  const handleSubmit = async (e, file) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.put(`/api/dream/${id}`, {
      title,
      description,
      main_goal,
      // benefits,
      deadline,
    });
    console.log(res);
    setLoading(false);
    toast.success("Proyecto actualizado");
    router.push(`/dream/${id}`);

 
  };


  return (
    <div>
      <NavBar />
      <Toaster position="bottom-center" />
        <form>
          <div className="space-y-12 m-6">
            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                Información sobre el proyecto{" "}
              </h2>
              <p className="mt-1 text-sm leading-6 text-white">
                Esta información será mostrada publicamente así que toma tu
                precaución con la información que compartes aquí.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Nombre del Proyecto
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Mi Proyecto"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Descripción
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      placeholder="Describe claramente tu proyecto y lo que quieres lograr."
                    />
                  </div>
                </div>

                <div className="col-span-full">
                {thumbnail ? (
                  <div className="flex justify-center">
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="w-1/2 h-1/2"
                    />
                    </div>
                ):(
                  <>
                  <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Portada{" "}
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-white"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                      >
                        <span>Sube un archivo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            console.log(file);
                           //crear blob
                            const blob = new Blob([file], { type: file.type });
                            console.log(blob);
                            //crear url
                            const url = URL.createObjectURL(blob);
                            setThumbnail(url);
                            setFile(blob);
                          }
                          }
                           value={thumbnail}
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta aquí</p>
                    </div>
                    <p className="text-xs leading-5 text-white">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>
                </>
                )}
                </div>
              </div>
            </div>

            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                Información del Proyecto{" "}
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Meta Monetaria{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="meta"
                      id="meta"
                      value={main_goal}
                      onChange={(e) => setMainGoal(e.target.value)}
                      placeholder="En SOL"
                      autoComplete="meta"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Dirección de Wallet{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      disabled
                      value={publicKey}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Fecha Límite /Duración de Campaña
                  </label>
                  <div className="mt-2">
                    <input
                    type="date"
                      name="date"
                      id="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                    </div>

                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Bronce{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={bronze}
                      onChange={(e) => setBronze(e.target.value)}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Plata{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      value={silver}
                      onChange={(e) => setSilver(e.target.value)}
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Oro{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      value={gold}
                      onChange={(e) => setGold(e.target.value)}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 mr-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-white"
              onClick={() => router.back()}
            >
              Cancelar
            </button>
            
              {loading ? <div className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
            </div> : <div
             onClick={handleSubmit}
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Actualizar
              </div>
              }
          </div>
        </form>
        <Footer />
    </div>
  );
}
