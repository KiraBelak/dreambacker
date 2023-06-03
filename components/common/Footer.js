import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 " aria-label="Footer">
          <div className="px-5 py-2">
            <Link
              href="/contacto"
              className="text-base text-white hover:text-white mr-6"
            >
              {" "}
              Contacto{" "}
            </Link>

            <Link
              href="/productos"
              className="text-base text-white hover:text-gray-900"
            >
              {" "}
              FAQ's{" "}
            </Link>
            <p className="text-center text-base text-white">
              &copy; 2023 DreamBacker{" "}
            </p>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
