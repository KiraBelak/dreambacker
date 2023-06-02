const Header = () => {
  return (
    <header className="bg-primary-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-10 w-auto"
                src="https://res.cloudinary.com/todoenminutos/image/upload/v1654385859/Black_logo_-_no_background_p94bma.png"
                alt="logo"
              />
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              <a
                href="/productos"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                Productos{" "}
              </a>

              <a
                href="/acercade"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                ¿Quiénes Somos?{" "}
              </a>

              <a
                href="soyproductor"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                Soy Productor{" "}
              </a>

              <a
                href="/carrito"
                className="text-base font-medium text-white hover:text-primary-50"
              >
                {" "}
                Carrito{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <a
            href="/productos"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Productos{" "}
          </a>

          <a
            href="/acercade"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Acerca de{" "}
          </a>

          <a
            href="/soyproductor"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Soy Productor{" "}
          </a>

          <a
            href="/carrito"
            className="text-base font-medium text-white hover:text-primary-50"
          >
            {" "}
            Carrito{" "}
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
