//Mohammad Danish Mohd Hazman (104139021)
import React, { useState } from 'react';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './uploadarea.css';
import ResultsPage from './resultspage';
import { Navigate } from 'react-router-dom';

function FileUploadButton() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No Selected File');
  const [analysisResults, setAnalysisResults] = useState('');

  const handleFileUpload = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResults(data.results);
    } catch (error) {
      //console.error('Error:', error);
    }
  };

  return (
    <main className="upload-container">
      <form
        onClick={() => document.querySelector('.input-field').click()}
        className="form-container"
      >
        <input
          type="file"
          accept=".sol"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            const selectedFile = files[0];
            if (selectedFile) {
              setFileName(selectedFile.name);
              setFile(selectedFile);
              handleFileUpload(selectedFile);
            }
          }}
        />

        {file ? (
          <div>
            <img src={URL.createObjectURL(file)} width={80} height={80} alt={fileName} />
            <p>{fileName}</p>
          </div>
        ) : (
          <>
            <DriveFolderUploadIcon color="#1475cf" size={60} />
            <p>Upload Your Solidity (.sol) File</p>
          </>
        )}
      </form>

      <section className="uploaded-details">
        <ArticleIcon color="#1475cf" />
        <span className="uploaded-content">
          {analysisResults ? (
            <div>
              <p>Analysis Results: Done</p>
            </div>
          ) : (
            'No analysis results yet.'
          )}
        </span>
      </section>
    </main>
  );
}

export default FileUploadButton;
