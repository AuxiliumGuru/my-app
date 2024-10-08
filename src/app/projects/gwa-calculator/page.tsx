'use client'
import React, { useState, useRef, useEffect } from 'react';
import Footer from '../../../components/footer';
import ProjectsNavbar from '@/components/ProjectsNavbar';
export default function Main() {
    const [course, setCourse] = useState('');
    const [unit, setUnit] = useState('');
    const [grade, setGrade] = useState('');

    // !Average
    // Lists to store grades and units as numbers
    const [gradeList, setGradeList] = useState<number[]>([]);
    const [unitList, setUnitList] = useState<number[]>([]);
    const[average, setAverage] = useState('0');


    // Edit button reqs
    const[isEditing, setIsEditing] = useState<boolean>(false);

    const [editIndex, setEditIndex] = useState<number | null>(null);

    const [editCourse, setEditCourse] = useState<string>('');
    const [editUnit, setEditUnit] = useState<string>('');
    const [editGrade, setEditGrade] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case 'course':
                setCourse(value.toUpperCase());
                break;
            case 'unit':
                setUnit(value);
                break;
            case 'grade':
                setGrade(value);
                break;
            case 'editCourse':
                setEditCourse(value.toUpperCase());
                break;
            case 'editUnit':
                setEditUnit(value);
                break;
            case 'editGrade':
                setEditGrade(value);
                break;
            default:
                break;
        }
      }
    
    const validateInputs = (): boolean => {
    if (!course.trim() || !unit.trim() || !grade.trim()) {
        alert('Please fill in all the input fields!');
        return false;
    }
    return true;
    };


    const validateEditInputs = (): boolean => {
        if (!editCourse.trim() || !editUnit.trim() || !editGrade.trim()) {
            alert('Please fill in all the input fields!');
            return false;
        }
        return true;
        };
    const handleAddBtn = () => {
        // Check if any input field is empty
        if (!validateInputs()) return;
        addRow(course, unit, grade);
        setCourse('');
        setGrade('');
    };

    const calculateAverage = () => {
        // Check if both lists have elements to avoid division by zero
        if (!gradeList.length || !unitList.length) {
          return 0.00; // Return 0.00 if lists are empty
        }

        // Calculate the sum of grades and units
        // const totalGrade = gradeList.reduce((acc, curr) => acc + curr, 0);
        var totalGrade = 0;
        var totalUnit = 0;
        for(let i =0; i< gradeList.length; i++) {
            totalGrade += gradeList[i] * unitList[i];
            totalUnit += unitList[i];
        }
    
        // Calculate the average, handling potential division by zero
        return totalUnit ? (totalGrade / totalUnit).toFixed(2) : 0.00;
    };

    // const addRow = (course: string, unit: string, grade: string) => {
    //     const tableBody = document.getElementById('info_table')!.getElementsByTagName('tbody')[0];
    //     const newRowRef = useRef(null);
    //     // Define table row and cells using JSX
    //     const newRow = (
    //       <tr ref={newRowRef}>
    //         <td className="px-4 py-2">{course}</td>
    //         <td className="px-4 py-2">{unit}</td>
    //         <td className="px-4 py-2">{grade}</td>
    //         <td className="px-4 py-2">
    //           <button className="text-red-500 hover:underline">Delete</button>
    //         </td>
    //       </tr>
    //     );
      
    //     // Define delete button functionality within JSX
    //     const handleDelete = () => {
    //       const rowIndex = tableBody.querySelectorAll('tr').length - 1;
      
    //       if (newRowRef.current) { // Check if ref has a value before accessing
    //         tableBody.removeChild(newRowRef.current);
    //       }
      
    //       // Update grade and unit lists and average (assuming functions exist)
    //       setGradeList((prevList) => prevList.filter((_, index) => index !== rowIndex));
    //       setUnitList((prevList) => prevList.filter((_, index) => index !== rowIndex));
    //       const newAverage = calculateAverage();
    //       setAverage(String(newAverage));
      
    //       if (tableBody.querySelectorAll('tr').length === 0) {
    //         setGradeList([]);
    //         setUnitList([]);
    //       }
    //     };
      
    //     // Render the row with the delete button click handler
    //     return (
    //       <div>
    //         {newRow}
    //         <button onClick={handleDelete}>Delete</button>
    //       </div>
    //     );
    // };
    
    const addRow = (course: string, unit: string, grade: string) => {
        const tableBody = document.getElementById('info_table')!.getElementsByTagName('tbody')[0];
      
        // Create a new table row element
        const newRow = document.createElement('tr');
      
        // Create table data elements for each column
        const subjectCell = document.createElement('td');
        subjectCell.className = 'px-4 py-2';
        const upperCaseCourse = course.toUpperCase();
        subjectCell.textContent = upperCaseCourse;
      
        const unitCell = document.createElement('td');
        unitCell.className = 'px-4 py-2';
        unitCell.textContent = unit;
      
        const gradeCell = document.createElement('td');
        gradeCell.className = 'px-4 py-2';
        gradeCell.textContent = grade;
      
        // Optional: Add an action cell (e.g., delete button)
        // Create an action cell with a delete button
        const actionCell = document.createElement('td');
        actionCell.className = 'px-4 py-2';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'md:ml-2 lg:ml-2 text-red-500 hover:underline'; // Style the button

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'text-blue-500 hover:underline';
        editButton.addEventListener('click', () => handleEditRow(newRow));

         // Get the index of the row to be deleted
        const rowIndex = tableBody.querySelectorAll('tr').length - 1; // Calculate index based on current rows
       
       
        // Add click event listener to the delete button
        deleteButton.addEventListener('click', () => {
            tableBody.removeChild(newRow); // Remove the entire row on click
      
            // Remove the corresponding item from gradeList and unitList based on the index
            setGradeList((prevList) => prevList.filter((_, index) => index !== rowIndex));
            setUnitList((prevList) => prevList.filter((_, index) => index !== rowIndex));
      
            // Recalculate the average after removing the item
            const newAverage = calculateAverage();
            setAverage(String(newAverage));

            if (tableBody.querySelectorAll('tr').length === 0) {
                setGradeList([]);
                setUnitList([]);
            }
        });


    

        // Append the delete button to the action cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        
        // Append the cells to the new row
        newRow.appendChild(subjectCell);
        newRow.appendChild(unitCell);
        newRow.appendChild(gradeCell);
        newRow.appendChild(actionCell);
      
        // Append the new row to the table body
        tableBody.appendChild(newRow);

        // append grade and unit in their own respective list and calculate average
        // Convert grade and unit to numbers before adding to lists
        const numericGrade = parseFloat(grade);
        const numericUnit = parseInt(unit);

        // Add validated grade and unit to respective lists
        setGradeList([...gradeList, numericGrade]);
        setUnitList([...unitList, numericUnit]);

        // Calculate and update the average state using the helper function
    };


    const handleEditRow = (row: HTMLTableRowElement): void => {
        const rowIndex = Array.from(row.parentNode!.children).indexOf(row);
        setEditIndex(rowIndex);
        setIsEditing(true);
        setEditCourse(row.children[0].textContent || '');
        setEditUnit(row.children[1].textContent || '');
        setEditGrade(row.children[2].textContent || '');
      };
    
      const handleEditSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        if (editIndex === null || !validateEditInputs()) return;
    
        const updatedGradeList = [...gradeList];
        const updatedUnitList = [...unitList];
        updatedGradeList[editIndex] = parseFloat(editGrade);
        updatedUnitList[editIndex] = parseInt(editUnit);
    
        setGradeList(updatedGradeList);
        setUnitList(updatedUnitList);
        setAverage(String(calculateAverage()));

        // Update the table row content
        const tableBody = document.getElementById('info_table')!.getElementsByTagName('tbody')[0];
        const row = tableBody.children[editIndex] as HTMLTableRowElement;
        row.children[0].textContent = editCourse;
        row.children[1].textContent = editUnit;
        row.children[2].textContent = editGrade;
        
        setIsEditing(false);
        setEditIndex(null);
        setEditCourse('');
        setEditUnit('');
        setEditGrade('');
      };

      // useEffect to recalculate average when gradeList or unitList changes
    useEffect(() => {
        const newAverage = calculateAverage();
        setAverage(String(newAverage));
    }, [gradeList, unitList]); // Dependency array

    const handleReset = () => {
        setCourse('');
        setUnit('');
        setGrade('');
    }

    const handleClearBtn = () => {
        const tableBody = document.getElementById('info_table')!.getElementsByTagName('tbody')[0];
        // Remove all child elements (rows) from the table body
        while (tableBody.hasChildNodes()) {
          tableBody.removeChild(tableBody.firstChild!);
        }

            // Clear the grade and unit lists, and reset the average
        setGradeList([]);
        setUnitList([]);
        setAverage('0.00');
    };
    

    const hanndleCancelEditBtn = () => {

        if (isEditing) setIsEditing(false)
    }

    return (
        <div className="min-h-screen">
            <ProjectsNavbar />
            <main className="flex flex-col min-h-screen items-center justify-between p-24">
                {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <h1>Hello world!</h1>
                </div> */}
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                        <div className="w-full">
                            <label htmlFor="course" className="block text-sm font-medium mb-2">Course</label>
                            <input 
                                type="text" 
                                id="course" 
                                name="course" 
                                placeholder="Course Name"
                                value={course}
                                onChange={handleChange} 
                                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full" 
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="grade" className="block text-sm font-medium mb-2">Grade</label>
                            <input 
                                type="text" 
                                id="grade" 
                                name="grade" 
                                placeholder="Grade"
                                value={grade}
                                onChange={handleChange} 
                                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full" 
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="unit" className="block text-sm font-medium mb-2">Units</label>
                            <input 
                                type="text" 
                                id="unit" 
                                name="unit" 
                                placeholder="Units"
                                value={unit} 
                                onChange={handleChange} 
                                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full" 
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-2">
                        <button 
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleAddBtn}
                        >
                            Add Course
                        </button>
                        <button 
                            onClick={handleReset}
                            className="w-full bg-gray-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">

                        <table id="info_table" className="w-full rounded-lg shadow-md border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200 text-left text-sm font-medium">
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Units</th>
                                <th className="px-4 py-2">Final Grade</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>

                        <table id="ave_table" className="w-full rounded-lg shadow-md border border-gray-300">
                            <tbody>
                            <tr>
                                <td className="px-4 py-2 text-left text-sm font-medium">
                                    <span className="text-blue-500">
                                        Average: 
                                        <span className="text-blue-500"> {average}</span>
                                        %
                                    </span>
                                </td>
                                <td className="px-4 py-2 flex items-center justify-end">  
                                    <button 
                                        onClick={handleClearBtn}
                                        className="px-2 py-1 text-xs font-medium rounded-md bg-gray-400 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                                    >
                                        Clear Table
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {isEditing && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
                        <form onSubmit={handleEditSubmit} className="flex flex-col  lg:flex-row gap-4 p-4 bg-white shadow-md rounded-md">
                            <div className="flex flex-col">
                            <label htmlFor="editCourse" className="block text-sm font-medium mb-2">Course</label>
                            <input
                                type="text"
                                id="editCourse"
                                name="editCourse"
                                placeholder="Course Name"
                                value={editCourse}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            />
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="editGrade" className="block text-sm font-medium mb-2">Grade</label>
                            <input
                                type="text"
                                id="editGrade"
                                name="editGrade"
                                placeholder="Grade"
                                value={editGrade}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            />
                            </div>
                            <div className="flex flex-col">
                            <label htmlFor="editUnit" className="block text-sm font-medium mb-2">Units</label>
                            <input
                                type="text"
                                id="editUnit"
                                name="editUnit"
                                placeholder="Units"
                                value={editUnit}
                                onChange={handleChange}
                                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            />
                            </div>
                            <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                            Submit
                            </button>

                            <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={hanndleCancelEditBtn}
                            >
                            cancel
                            </button>
                        </form>
                        </div>
                                )}
            </main>
            <Footer />  
        </div>


    )
};