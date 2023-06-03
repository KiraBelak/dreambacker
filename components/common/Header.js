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
                className="h-20 w-auto"
                src="https://res.cloudinary.com/dzdqwcqj0/image/upload/c_crop,h_106,w_500/v1685746064/DreamBacker/DreamBacker_-_Logo_qc9fp7.png"
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
                Aquí qué{" "}
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
            Aquí qué{" "}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
