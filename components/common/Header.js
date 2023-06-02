import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-primary-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Workflow</span>
              <Image
                className="h-10 w-auto"
                src=""
                alt="logo"
                width={500}
                height={500}
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link
                href="/productos"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                Productos{" "}
              </Link>

              <Link
                href="/acercade"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                ¿Quiénes Somos?{" "}
              </Link>

              <Link
                href="soyproductor"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                Soy Productor{" "}
              </Link>

              <Link
                href="/carrito"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                Carrito{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <Link
            href="/productos"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Productos{" "}
          </Link>

          <Link
            href="/acercade"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Acerca de{" "}
          </Link>

          <Link
            href="/soyproductor"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Soy Productor{" "}
          </Link>

          <Link
            href="/carrito"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Carrito{" "}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
