import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header className="flex justify-between items-center py-4 px-8 shadow-md">
        <div className="text-gray-800 text-xl font-bold">
          <Link href="./"> {/* Wrap Image in Link to make it clickable */}
              <Image
                  src="/favicon.ico"
                  alt="temp logo"
                  className="w-8 h-8 rounded-full object-cover lg:mr-5 md:w-8 md:h-8 lg:w-12 lg:h-12" // Increase image size on larger screens
                  width={50} // Add width
                  height={50} // Add height
              />
          </Link>
        </div> {/* Adjust logo text as needed */}

        
        <nav className="space-x-2 md:space-x-4 lg:space-x-10">
          <a href="./" className="text-gray-600 hover:text-gray-800 font-medium">Home</a>
          <a href="/projects" className="text-gray-600 hover:text-gray-800 font-medium">Projects</a>
          <a href="./#About" className="text-gray-600 hover:text-gray-800 font-medium hidden md:inline">About</a>
          <a href="./#Contact" className="text-gray-600 hover:text-gray-800 font-medium hidden md:inline">Contact</a>
        </nav>
    </header>
  )
}
