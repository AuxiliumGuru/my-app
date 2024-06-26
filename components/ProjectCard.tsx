import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCard() {
  return (

    <Link href="/projects/gwa-calculator" passHref>
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
            <Image src="/path-to-your-image.jpg" alt="Project Image" width={300} height={100} layout="responsive" />
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Gwa-Calculator</div>
            <p className="text-gray-700 text-base">
                Quokka
            </p>
            </div>
            <div className="px-6 pt-4 pb-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <p className="text-gray-700 text-sm mb-2">A calculator used to compute a general weighted average of a student</p>
            <div className="text-gray-700 text-sm">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#TechStack1</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#TechStack2</span>
                {/* Add more tech stack tags as needed */}
            </div>
            </div>
        </div>
    </Link>
  );
}