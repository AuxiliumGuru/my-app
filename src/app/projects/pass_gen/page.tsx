'use client'
import Footer from '../../../components/footer';
import ProjectsNavbar from '@/components/ProjectsNavbar';
import { useState } from 'react';

const baseURL = 'https://my-api-plum-alpha.vercel.app';

interface TestResult {
  entropy: number;
  strength: string;
}

async function generatePassword(length: number, setPassword: (password: string) => void): Promise<void> {
  try {
    const response = await fetch(`${baseURL}/generate_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ length }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }

    const data = await response.json();
    console.log('Status Code:', response.status);
    console.log('Response:', data);
    setPassword(data.password);
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

async function testPassword(password: string, setTestResult: (result: { entropy: number; strength: string }) => void): Promise<void> {
  try {
    const response = await fetch(`${baseURL}/test_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail);
    }

    const data = await response.json();
    console.log('Status Code:', response.status);
    console.log('Response:', data);
    setTestResult({ entropy: data.entropy, strength: data.strength });
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

export default function PassGen() {
  const [activeTab, setActiveTab] = useState('generation');
  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [passwordToTest, setPasswordToTest] = useState('');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handle_generate_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generatePassword(passwordLength, setGeneratedPassword);
  };

  const handle_test_submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await testPassword(passwordToTest, setTestResult);
  }

  return (
    <div className="min-h-screen">
      <ProjectsNavbar />

      <div className="flex-grow items-center justify-center min-h-screen p-10">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'generation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('generation')}
          >
            Password Generation
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'testing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('testing')}
          >
            Password Testing
          </button>
        </div>

        {activeTab === 'generation' && (
          <div className="flex items-center justify-center pt-40">
            <form onSubmit={handle_generate_submit} className="mt-4">
              <label htmlFor="password" className="block text-gray-700">
                Password Length:
              </label>
              <input
                id="password"
                name="password"
                type="number"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Generate
              </button>
            </form>
          </div>
        )}

        {activeTab === 'testing' && (
          <div className="flex items-center justify-center pt-40">
            <form onSubmit={handle_test_submit} className="mt-4">
              <label htmlFor="passwordToTest" className="block text-gray-700">
                Password to Test:
              </label>
              <input
                id="passwordToTest"
                name="passwordToTest"
                type="text"
                value={passwordToTest}
                onChange={(e) => setPasswordToTest(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Test
              </button>
            </form>
          </div>
        )}

        {generatedPassword && activeTab === 'generation' && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Generated Password:</p>
            <p className="text-blue-500 font-bold">{generatedPassword}</p>
          </div>
        )}

        {testResult && activeTab === 'testing' && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Entropy: {testResult.entropy}</p>
            <p className="text-blue-500 font-bold">Strength: {testResult.strength}</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}