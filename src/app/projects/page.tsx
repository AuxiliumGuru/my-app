"use client"
import Navbar from '../../components/Navbar';
import projectsData from '../../../constants/projects.json'; // Adjust the path as necessary
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer';

export default function ProjectPage() { // Renamed to avoid conflict with the Project interface

  interface Project {
    id: number;
    name: string;
    author: string;
    description: string;
    image: string;
    link: string;
  }
  const projects: Project[] = projectsData.projects // Added type annotation
  return (

    <div className="min-h-screen">
      
      <Navbar />
      <div className="flex flex-row py-8 px-6 flex-wrap min-h-screen"> {/* Added flex-wrap for responsiveness */}
        {projects.map((project) => (
          <Link key={project.id} href={project.link} passHref prefetch={false}>
            <div className="max-w-sm rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer m-4">
              <Image src={project.image} alt="Project Image" width={100} height={50} layout="responsive" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{project.name}</div>
                {/* <p className="text-gray-900 text-base">
                  {project.author}
                </p> */}
                <p className="text-gray-700 text-sm mb-2 pt-2 pb-2">
                  {project.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}