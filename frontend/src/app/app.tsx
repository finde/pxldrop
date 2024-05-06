// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import React, { useRef } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';

// import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  const [message, setMessage] = React.useState(null);

  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();

  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = createFormData();

    console.log('Submitting files:', formData);
    try {
      axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Files submitted successfully.');
      clearAllFiles();
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };

  return (
    <div>
      <h1>Upload Files</h1>

      <p>
        Please use the form to your right to upload any file(s) of your
        choosing.
      </p>

      <div className="form-container">
        {/* Display the files to be uploaded */}

        {message && <div className="message">{message}</div>}
        {!message && (
          <div>
            <ul>
              {fileNames.map((name) => (
                <li key={name}>
                  <span>{name}</span>

                  <span onClick={() => removeFile(name)}>
                    <i className="fa fa-times" />
                  </span>
                </li>
              ))}
            </ul>

            {files.length > 0 && (
              <ul>
                <li>File types found: {fileTypes.join(', ')}</li>
                <li>Total Size: {totalSize}</li>
                <li>Total Bytes: {totalSizeInBytes}</li>

                <li className="clear-all">
                  <button onClick={() => clearAllFiles()}>Clear All</button>
                </li>
              </ul>
            )}
          </div>
        )}

        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <div
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, 'a');
            setMessage(null);
          }}
        >
          <p>Drag and drop files here</p>

          <button onClick={() => inputRef.current.click()}>
            Or select files to upload
          </button>

          {/* Hide the crappy looking default HTML input */}
          <input
            ref={inputRef}
            type="file"
            accept="audio/*,video/*,image/*"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              setFiles(e);
              if (inputRef.current) {
                inputRef.current.value = null;
              }
            }}
          />
        </div>
      </div>

      <div className="submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    // <div>

    //   <NxWelcome title="frontend" />

    //   {/* START: routes */}
    //   {/* These routes and navigation have been generated for you */}
    //   {/* Feel free to move and update them to fit your needs */}
    //   <br />
    //   <hr />
    //   <br />
    //   <div role="navigation">
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li>
    //         <Link to="/page-2">Page 2</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <div>
    //           This is the generated root route.{' '}
    //           <Link to="/page-2">Click here for page 2.</Link>
    //         </div>
    //       }
    //     />
    //     <Route
    //       path="/page-2"
    //       element={
    //         <div>
    //           <Link to="/">Click here to go back to root page.</Link>
    //         </div>
    //       }
    //     />
    //   </Routes>
    //   {/* END: routes */}
    // </div>
  );
}

export default App;
