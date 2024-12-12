import React, { useState } from "react";
import './FileExplorer.css';

type File = {
  type: string;
  name: string;
  added?: string;
  files?: File[];
};

type Item = File;

const data: Item[] = [
  {
    type: "pdf",
    name: "Employee Handbook",
    added: "2017-01-06",
  },
  {
    type: "pdf",
    name: "Public Holiday policy",
    added: "2016-12-06",
  },
  {
    type: "folder",
    name: "Expenses",
    files: [
      {
        type: "doc",
        name: "Expenses claim form",
        added: "2017-05-02",
      },
      {
        type: "doc",
        name: "Fuel allowances",
        added: "2017-05-03",
      },
    ],
  },
  {
    type: "csv",
    name: "Cost centres",
    added: "2016-08-12",
  },
  {
    type: "folder",
    name: "Misc",
    files: [
      {
        type: "doc",
        name: "Christmas party",
        added: "2017-12-01",
      },
      {
        type: "mov",
        name: "Welcome to the company!",
        added: "2015-04-24",
      },
    ],
  },
];

const FileExplorer: React.FC = () => {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"name" | "type" | "added">("name");

  const toggleFolder = (name: string) => {
    const updatedFolders = new Set(openFolders);
    if (updatedFolders.has(name)) {
      updatedFolders.delete(name);
    } else {
      updatedFolders.add(name);
    }
    setOpenFolders(updatedFolders);
  };

  const sortFiles = (files: File[]): File[] => {
    return [...files].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      } else if (a.added && b.added) {
        return new Date(a.added).getTime() - new Date(b.added).getTime();
      } else {
        return 0; 
      }
    });
  };

  const renderFiles = (files: Item[]) => {
    const sortedFiles = sortFiles(files);
    return (
        <table className="file-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date Added</th>
                </tr>
            </thead>
            <tbody>
                {sortedFiles.map((file, index) => (
                    <tr key={index}>
                        {file.type === 'folder' ? (
                            <>
                                <td>
                                    <span
                                        onClick={() => toggleFolder(file.name)}
                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        {openFolders.has(file.name) ? '📂' : '📁'} {file.name}
                                    </span>
                                </td>
                                <td>Folder</td>
                                <td>-</td>
                                {openFolders.has(file.name) && file.files && (
                                    <tr>
                                        <td colSpan={3}>{renderFiles(file.files)}</td>
                                    </tr>
                                )}
                            </>
                        ) : (
                            <>
                                <td>
                                    {file.type === 'pdf' && '📄'}
                                    {file.type === 'doc' && '📃'}
                                    {file.type === 'csv' && '📑'}
                                    {file.type === 'mov' && '🎥'} {file.name}
                                </td>
                                <td>{file.type}</td>
                                <td>{file.added}</td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

  return (
    <div>
      <div className="sort-controls">
        <label>Sort By: </label>
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "name" | "type" | "added")
          }
        >
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="added">Date Added</option>
        </select>
      </div>
      {renderFiles(data)}
    </div>
  );
};

export default FileExplorer;
