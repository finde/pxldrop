// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './upload/upload.module.scss';
import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import useFileUpload from 'react-use-file-upload';
import { CardState } from './upload/upload.interface';
import { UploadCard } from './upload/uploadCard';
import { UploadButton } from './upload/uploadButton';
import confetti from 'canvas-confetti';

export function App() {
  const [cardState, setCardState] = React.useState(CardState.Default);
  const [fileNumber, setFileNumber] = React.useState(0);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const {
    files,
    // fileNames,
    // fileTypes,
    // totalSize,
    // totalSizeInBytes,
    // handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    // removeFile,
  } = useFileUpload();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSubmit = async () => {
      const formData = createFormData();
      setCardState(CardState.Uploading);

      try {
        await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / (total ?? 1));

            setUploadProgress(Math.min(percent, 100));
          },
        });

        // on success
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setCardState(CardState.Done);
        clearAllFiles();

      } catch (error) {
        console.error('Failed to submit files.', error);
        setCardState(CardState.Error);
        clearAllFiles();
      }
    };

    setFileNumber(files.length);

    if (files.length > 0) {
      handleSubmit();
      setCardState(CardState.Uploading);
    }
  }, [clearAllFiles, createFormData, files]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="audio/*,video/*,image/*"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          e.preventDefault();

          if (cardState === CardState.Default) {
            setFiles(e as any);
            setCardState(CardState.Uploading);
          }

          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }}
      />

      <img
        src="/flower_corner.png"
        alt="flower"
        className={styles['flower-top-left']}
      />

      <UploadCard cardState={cardState} fileNumber={fileNumber} />

      <UploadButton
        cardState={cardState}
        uploadProgress={uploadProgress}
        onClick={() => {
          switch (cardState) {
            case CardState.Default:
              if (inputRef.current) {
                inputRef.current.click();
              }
              break;

            case CardState.Done:
              setCardState(CardState.Default);
              break;

            case CardState.Error:
              setCardState(CardState.Default);
              break;
          }
        }}
      />
    </>
    // <div>
    //   <h1>Upload Files</h1>

    //   <p>
    //     Please use the form to your right to upload any file(s) of your
    //     choosing.
    //   </p>

    //   <div className="form-container">
    //     {/* Display the files to be uploaded */}

    //     {message && <div className="message">{message}</div>}
    //     {!message && (
    //       <div>
    //         <ul>
    //           {fileNames.map((name) => (
    //             <li key={name}>
    //               <span>{name}</span>

    //               <span onClick={() => removeFile(name)}>
    //                 <i className="fa fa-times" />
    //               </span>
    //             </li>
    //           ))}
    //         </ul>

    //         {files.length > 0 && (
    //           <ul>
    //             <li>File types found: {fileTypes.join(', ')}</li>
    //             <li>Total Size: {totalSize}</li>
    //             <li>Total Bytes: {totalSizeInBytes}</li>

    //             <li className="clear-all">
    //               <button onClick={() => clearAllFiles()}>Clear All</button>
    //             </li>
    //           </ul>
    //         )}
    //       </div>
    //     )}

    //     {/* Provide a drop zone and an alternative button inside it to upload files. */}
    //     <div
    //       onDragEnter={handleDragDropEvent}
    //       onDragOver={handleDragDropEvent}
    //       onDrop={(e) => {
    //         handleDragDropEvent(e);
    //         setFiles(e, 'a');
    //         setMessage(null);
    //       }}
    //     >
    //       <p>Drag and drop files here</p>

    //       <button onClick={() => inputRef.current.click()}>
    //         Or select files to upload
    //       </button>

    //       {/* Hide the crappy looking default HTML input */}
    //       <input
    //         ref={inputRef}
    //         type="file"
    //         accept="audio/*,video/*,image/*"
    //         multiple
    //         style={{ display: 'none' }}
    //         onChange={(e) => {
    //           setFiles(e);
    //           if (inputRef.current) {
    //             inputRef.current.value = null;
    //           }
    //         }}
    //       />
    //     </div>
    //   </div>

    //   <div className="submit">
    //     <button onClick={handleSubmit}>Submit</button>
    //   </div>
    // </div>
  );
}

export default App;
