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
import { useWallet } from "@solana/wallet-adapter-react";

export default function Example() {
  const { publicKey } = useWallet();
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

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async (file) => {
    toast.loading("Uploading image to IPFS");
    console.log("file", file);
    const uploadUrl = await upload({
      data: [file],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });
    toast.dismiss();
    toast.success("Image uploaded to IPFS");
    console.log(uploadUrl);
    return uploadUrl[0];
  };
  const getProfile = async (publicKey) => {
    const wallet = publicKey;
    toast.loading("Loading profile...");
    try {
      const response = await axios.get(`/api/user/${wallet}`);
      // console.log("response");
      if (response.data != null) {
        toast.dismiss();
        toast.success("Profile loaded");
        console.log(response.data.profile);
        setUser(response.data.profile);
      } else {
        toast.dismiss();
        toast.success("Create your profile");
        router.push("/createprofile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (publicKey && !(user == null || user == {})) {
      getProfile(publicKey);
    }
  }, [publicKey]);

  //funcion para manejar el envio del formulario
  const handleSubmit = async (e, file) => {
    e.preventDefault();
    const wallet = publicKey;
    const benefits = [
      { bronze, price: 0.001, perks: ["Bronce jelly time"] },

      { silver, price: 0.01, perks: ["Plata jelly time"] },
      { gold, price: 0.1, perks: ["Oro jelly time"] },
    ];
    toast.loading("Converting URL to Blob...");
    await fetch(thumbnail)
      .then((res) => res.blob())
      .then((myblob) => {
        myblob.name = "blob.png";
        file = new File([myblob], "image.png", { type: myblob.type });
      });
    toast.dismiss();
    const uploadUrl = await uploadToIpfs(file);
    console.log(uploadUrl);
    const thum = uploadUrl;
    const user_id = user._id;

    console.log("user_id", user);
    const data = {
      title,
      description,
      user_id,
      main_goal,
      wallet,
      benefits,
      deadline,
      thum,
    };
    console.log(data);
    try {
      const response = await axios.post("/api/dream", data);
      console.log(response.data);
      toast.success("Project created");
      router.push("/user/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />
      <Toaster position="bottom-center" />
      <form>
        <div className="space-y-12 m-6 lg:px-60">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">
              Create new project{" "}
            </h2>
            <p className="mt-1 text-sm leading-6 text-white">
              This information will be displayed publicly, so be cautious about
              the information you share here.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Project Name{" "}
                </label>
                <div className="mt-2">
                  <div className="flex  bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-white">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="My Proyect"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="block w-full  border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    defaultValue={""}
                    placeholder="Clearly describe your project and what you want to achieve."
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
                ) : (
                  <>
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Cover{" "}
                    </label>
                    <div className="mt-2 flex justify-center border border-dashed border-white/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-white"
                          aria-hidden="true"
                        />
                        <div className="mt-4 flex text-sm leading-6 text-white">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer  bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-white"
                          >
                            <span>Upload file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                console.log(file);
                                //crear blob
                                const blob = new Blob([file], {
                                  type: file.type,
                                });
                                console.log(blob);
                                //crear url
                                const url = URL.createObjectURL(blob);
                                setThumbnail(url);
                                setFile(blob);
                              }}
                              value={thumbnail}
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-white">
                          PNG, JPG, GIF up to 10MB
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
              Project Information{" "}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Monetary Goal{" "}
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
                    className="block w-full  border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Wallet Adress{" "}
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    disabled
                    value={publicKey}
                    className="block w-full  border-0 bg-white/5 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                    placeholder="Wallet Connected"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Deadline / Campaign Duration
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="block w-full  border-0 bg-white/5 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <br></br>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  ¿Cuáles son los beneficios de cada nivel?
                </label>
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
                    className="block w-full  border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
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
                    className="block w-full  border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
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
                    className="block w-full  border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 mr-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="px-4 py-1 text-sm font-semibold leading-6 text-red-500 hover:text-red-600 hover:border-2 hover:border-dashed hover:border-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className=" bg-white px-3 py-2 text-sm font-semibold text-black  hover:bg-black hover:border-2  hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Save and Publish{" "}
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}
