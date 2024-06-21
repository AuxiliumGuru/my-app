import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100"> {/* Set background color for entire page */}
      <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <div className="text-gray-800 text-xl font-bold">Your Logo</div> {/* Adjust logo text as needed */}
        <nav className="space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-800 font-medium">Home</a>
          <a href="/projects" className="text-gray-600 hover:text-gray-800 font-medium">Projects</a>
          <a href="/about" className="text-gray-600 hover:text-gray-800 font-medium">About</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-800 font-medium">Contact</a>
        </nav>
      </header>
      <main className="flex flex-col px-8 pb-16"> {/* Main content area */}
        {/* Add your portfolio content here, such as sections for projects, skills, etc. */}
        <section className="flex flex-col lg:flex-row items-center justify-center space-y-4 md:space-y-8 lg:space-y-16"> {/* Increase space between items on larger screens */}
          <Image
            src="/profile-pic.png"
            alt="Your Name Profile Picture"
            className="w-48 h-48 rounded-full object-cover mt-10 mr-5 md:w-48 md:h-48 lg:w-64 lg:h-64" // Increase image size on larger screens
            width={192} // Add width
            height={192} // Add height
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">Allan Khester Mesa</h1> {/* Increase text size on larger screens */}
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl">Computer Science Student</p> {/* Increase text size on larger screens */}
          </div>
        </section>

      </main>
      <footer className="text-center py-4 bg-gray-200 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Allan Khester M. Mesa</p>
      </footer>
    </div>
  );
}
