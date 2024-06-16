// components/Table.tsx
import React, { useState, useRef } from 'react';

interface TableData {
  subject: string;
  grade: string;
  units: string;
}

type TableProps = {};

const Table: React.FC<TableProps> = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const gradeInputRef = useRef<HTMLInputElement>(null);
  const unitsInputRef = useRef<HTMLInputElement>(null);

  const handleAddRow = () => {
    const subject = subjectInputRef.current?.value || '';
    const grade = gradeInputRef.current?.value || '';
    const units = unitsInputRef.current?.value || '';

    if (!subject || !grade || !units) {
      alert('Please fill in all fields.');
      return;
    }

    setTableData([...tableData, { subject, grade, units }]);

    // Clear input fields after adding
    subjectInputRef.current!.value = '';
    gradeInputRef.current!.value = '';
    unitsInputRef.current!.value = '';
  };

  const handleDeleteRow = (index: number) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
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
          {tableData.map((data, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{data.subject}</td>
              <td className="px-4 py-2">{data.units}</td>
              <td className="px-4 py-2">{data.grade}</td>
              <td className="px-4 py-2">
                <button
                  className="px-2 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => handleDeleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;