'use client'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  return (
    <div className="min-h-screen"> {/* Set background color for entire page */}
      <header className="flex justify-between items-center py-4 px-8 shadow-md">
        <div className="text-gray-800 text-xl font-bold">
          <Image
              src="/favicon.ico"
              alt="temp logo"
              className="w-8 h-8 rounded-full object-cover lg:mr-5 md:w-8 md:h-8 lg:w-12 lg:h-12" // Increase image size on larger screens
              width={50} // Add width
              height={50} // Add height
            />
        </div> {/* Adjust logo text as needed */}
        <nav className="space-x-2 md:space-x-4 lg:space-x-10">
          <a href="#Home" className="text-gray-600 hover:text-gray-800 font-medium">Home</a>
          <a href="/projects" className="text-gray-600 hover:text-gray-800 font-medium">Projects</a>
          <a href="#About" className="text-gray-600 hover:text-gray-800 font-medium">About</a>
          <a href="#Contact" className="text-gray-600 hover:text-gray-800 font-medium">Contact</a>
        </nav>
      </header>
      <main className="flex flex-col px-8 pb-16"> {/* Main content area */}
        {/* Add your portfolio content here, such as sections for projects, skills, etc. */}

        {/* Home  Section */}
        <section id="Home" className="min-h-screen flex flex-col lg:flex-row items-center justify-center lg:pb-20 space-y-2 md:space-y-8 lg:space-y-2"> {/* Increase space between items on larger screens */}
          <Image
            src="/profile-pic.png"
            alt="allan khester mesa profile picture"
            className="w-48 h-48 rounded-full object-cover lg:mr-5 md:w-48 md:h-48 lg:w-64 lg:h-64" // Increase image size on larger screens
            width={192} // Add width
            height={192} // Add height
          />
          <div className="pb-20 md:pb-10 lg:pb-0">
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">Allan Khester Mesa</h1> {/* Increase text size on larger screens */}
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl">Computer Science Student</p> {/* Increase text size on larger screens */}
          </div>
        </section>

        {/* About me Section*/}
        <section id="About" className="min-h-screen flex flex-col justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">About Me</h2>
            <p className="mt-4 text-gray-600 md:px-20 lg:px-40 xl:px-60">
              Hi! I'm Allan, a sophomore Computer Science Student from the University of Saint Louis - Tuguegarao. 
              I'm a passionate developer who loves to learn and explore more about the world of technology. The areas of interest that 
              I'm currently pursuing are back-end development, machine learning, Artificial Intelligence (AI), Data Engineering, and someday, 
              some open-source contributions. I'm also a digital creator that creates contents about 
              showcasing my projects and some tutorials on how to code.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="Contact" className="min-h-screen flex flex-col justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">Contact</h2>
            <div className="flex justify-center mt-6">
              <a href="https://github.com/AuxiliumGuru" className="mx-2" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} size="2x" className="text-gray-800 hover:text-gray-600" />
              </a>
              <a href="https://www.facebook.com/allankhester.mesa/" className="mx-2" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} size="2x" className="text-gray-800 hover:text-gray-600" />
              </a>
              <a href="https://www.linkedin.com/in/allan-khester-mesa-73753123a/" className="mx-2" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-gray-800 hover:text-gray-600" />
              </a>
            </div>
            <p className="mt-4 text-gray-600">
              <i className="fas fa-envelope"></i> khestermesa@gmail.com
            </p>
            <p className="text-gray-600">
              <i className="fas fa-map-marker-alt"></i> 3321 Purok 1 Luna, Quirino, Isabela, Philippines.
            </p>
          </div>
        </section>

      </main>
      <footer className="text-center py-4 bg-gray-200 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Auxghlann</p>
      </footer>
    </div>
  );
}
