import Image from 'next/image';
import Link from 'next/link';
import ProjectCard from '../../../components/ProjectCard';
import Navbar from '../../../components/Navbar';

export default function Project() {
  return (

    <div className="min-h-screen"> {/* Set background color for entire page */}   
        <Navbar />

        <div className="flex flex-row py-8 px-6">
            <ProjectCard />
            

        </div>
        
    </div>
  )
}
