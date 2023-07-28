import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-primary-600">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
        aria-label="Top"
      >
        <div className="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="h-30 w-auto"
                src="https://res.cloudinary.com/dzdqwcqj0/image/upload/v1689556793/DreamBacker/db_logo_jhbegi.png"
                alt="dreambacker logo"
                width={500}
                height={500}
              />
            </Link>
          </div>
          <div className="hidden ml-16 space-x-8 lg:block">
            <div className="text-base font-medium text-white hover:text-primary-50">
              {/* <ConnectWallet /> */}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden"></div>
      </nav>
    </header>
  );
};

export default Header;
