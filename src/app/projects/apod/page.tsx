// pages/index.tsx
'use client'
import Footer from '@/components/footer';
import ProjectsNavbar from '@/components/ProjectsNavbar';
import React, { useState } from 'react';

interface APODData {
  date: string;
  explanation: string;
  title: string;
  url: string;
  copyright?: string;
}

export default function ProjectAPOD() {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonVisible, setButtonVisible] = useState(true); 

  const fetchAPODData = async () => {
    setIsLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_APOD_KEY;
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Could not fetch APOD data");
      }
      const data: APODData = await response.json();
      setApodData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setButtonVisible(false);
    }
  };

  return (

    <div className="flex flex-col min-h-screen">
      <ProjectsNavbar />
      <div className="flex-grow items-center justify-center min-h-screen p-10">
        {buttonVisible && ( // Step 4
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" 
            onClick={() => {
              fetchAPODData();
              setButtonVisible(false); // Step 3
            }} 
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Generate Image'}
          </button>
        )}
        {apodData && (
          <div className="flex flex-col p-4 min-h-screen rounded-lg shadow-md mt-5">
            <h2 className="text-xl font-semibold">{apodData.title}</h2>
            <p className="text-gray-500">({apodData.date})</p>
            <img className="mt-2 rounded" src={apodData.url} alt={apodData.title} />
            <p className="mt-2 text-gray-700">{apodData.explanation}</p>
            {apodData?.copyright && (
              <p className="mt-2 text-sm text-gray-500">Image Credit & Copyright: {apodData?.copyright}</p>
            )}
            <a 
              className="mt-2 text-blue-500 hover:text-blue-700 underline" 
              href={apodData.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Image
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
    
  )
}

