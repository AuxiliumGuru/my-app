'use client'
import Footer from '@/components/footer';
import ProjectsNavbar from '@/components/ProjectsNavbar';
import React, { useState } from 'react';




interface FactData {
    fact: string;
}


export default function RandFact() {

    const baseURL = 'https://my-api-plum-alpha.vercel.app';
    const randomFact = `${baseURL}/facts/random`;
    const today_random_fact = `${baseURL}/facts/today`;

    const [activeTab, setActiveTab] = useState('randomFact');
    const [fact, setFact] = useState<FactData | null>(null);
    const [todayFact, setTodayFact] = useState<FactData | null>(null);
    const [todayFactGenerated, setTodayFactGenerated] = useState(false);

    const get_rand_fact = async () => {
        try {
            const response = await fetch(randomFact);
            if (!response.ok) {
                throw new Error("Could not fetch random fact");
            }
            const data: FactData = await response.json();
            setFact(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const get_today_rand_fact = async () => {
        try {
            const response = await fetch(today_random_fact);
            if (!response.ok) {
                throw new Error("Could not fetch today's random fact");
            }
            const data: FactData = await response.json();
            setTodayFact(data);
            setTodayFactGenerated(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (

        <div className="min-h-screen">
            <ProjectsNavbar />
            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full max-w-4xl px-4 py-28">
                    <h1 className="text-6xl font-bold text-gray-800 mb-8 text-center">
                        Random Fact Generator
                    </h1>
                    <div className="flex justify-center mb-8 border-gray-500 rounded-lg p-2">
                        <button
                            className={`px-4 py-2 mx-2 rounded ${activeTab === 'randomFact' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                            onClick={() => setActiveTab('randomFact')}
                        >
                            Random Fact
                        </button>
                        <button
                            className={`px-4 py-2 mx-2 rounded ${activeTab === 'todaysFact' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                            onClick={() => setActiveTab('todaysFact')}
                        >
                            Today's Random Fact
                        </button>
                    </div>
                    <div className="text-center">
                        {activeTab === 'randomFact' && (
                            <div>
                                <p className="mt-3 text-2xl text-gray-700 italic">
                                    
                                    {fact?.fact || "Random Fact"}
                                    
                                </p>
                                <button
                                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                    onClick={get_rand_fact}
                                >
                                    Generate
                                </button>
                            </div>
                        )}
                        {activeTab === 'todaysFact' && (
                            <div>
                                <p className="mt-3 text-2xl text-gray-700 italic">
                                    
                                    {todayFact?.fact || "Random Fact"}
                                    
                                </p>
                                {!todayFactGenerated && (
                                    <button
                                        className="mt-4 px-4 py-2  bg-green-500 text-white rounded hover:bg-green-700"
                                        onClick={get_today_rand_fact}
                                    >
                                        Generate
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        
    )
}
