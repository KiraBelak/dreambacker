import { Fragment, useContext, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { WalletContext } from "../src/wallet";
import { ConnectWallet } from "./ConnectWallet";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { IoIosPerson } from "react-icons/io";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { publicKey, disconnect } = useWallet();
  const router = useRouter();
  // console.log("publicKey navbar", publicKey);

  // wait to get publicKey from useWallet, if the result is null redirect to landing
  // if not, just continue
  useEffect(() => {
    // if (publicKey == null) {
    //   router.push("/");
    // }
  }, [publicKey]);

  const signOut = () => {
    if (window) {
      const { solana } = window;
      // window.localStorage.removeItem("publicKey");
      // setPublicKey(null);
      // solana.disconnect();
      disconnect();
      toast.success("Wallet disconnected 👻");
      // router.push("/");
    }
  };

  const [hasProjectToEdit, setHasProjectToEdit] = useState(false);

  useEffect(() => {
    const checkProjectToEdit = async () => {
      try {
        // Lógica para verificar si el usuario tiene un proyecto para editar
        const response = await axios.get("/api/dream?wallet=" + publicKey);
        const hasProject = response.data.hasProject;

        setHasProjectToEdit(hasProject);
      } catch (error) {
        console.error("Error al verificar el proyecto:", error);
        // Manejar el error según corresponda
      }
    };

    checkProjectToEdit();
  }, []);

  return (
    <Disclosure as="nav" className="bg-graybacker shadow">
      {({ open }) => (
        <>
          <Toaster position="bottom-center" reverseOrder={false} />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <span className="sr-only">Workflow</span>
                    <Image
                      className="block h-8 w-auto lg:hidden"
                      src="https://res.cloudinary.com/dzdqwcqj0/image/upload/v1689556793/DreamBacker/db_logo_jhbegi.png"
                      alt="logo"
                      width={300}
                      height={200}
                    />
                  </Link>

                  <Link href="/">
                    <span className="sr-only">Workflow</span>
                    <Image
                      className="hidden h-8 w-auto lg:block"
                      src="https://res.cloudinary.com/dzdqwcqj0/image/upload/v1689556793/DreamBacker/db_logo_jhbegi.png"
                      alt="logo"
                      width={300}
                      height={200}
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}

                  <Link
                    href="/user/dashboard"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white  hover:text-black hover:bg-white hover:border-8 hover:border-black"
                  >
                    Projects
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}

                  <Link
                    href="/user/claim"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white  hover:text-black hover:bg-white hover:border-8 hover:border-black"
                  >
                    NFTs
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    href={hasProjectToEdit ? "/dream/edit" : "/dream/create"}
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5  bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:border-2 hover:border-white hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    {hasProjectToEdit ? "Edit Project" : "Create Project"}
                  </Link>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {publicKey == null ? (
                    <ConnectWallet />
                  ) : (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <IoIosPerson className="h-8 w-8 rounded-full text-black" />
                          {/* <image
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            width={40}
                            height={40}
                          /> */}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/dashboard"
                                className={classNames(
                                  active ? "bg-black" : "",
                                  "block px-4 py-2 text-sm text-gray-700 hover:text-white"
                                )}
                              >
                                Dashboard{" "}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/user/dashboard"
                                className={classNames(
                                  active ? "bg-black" : "",
                                  "block px-4 py-2 text-sm text-gray-700 hover:text-white"
                                )}
                              >
                                Projects
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={() => signOut()}
                                className={classNames(
                                  active ? "bg-black" : "",
                                  "block px-4 py-2 text-sm text-gray-700 hover:text-white"
                                )}
                              >
                                Disconnect Wallet
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden">
            <ConnectWallet />
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-gray-400 bg-white py-2 pl-3 pr-4 text-base font-medium text-black sm:pl-5 sm:pr-6"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Projects
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
