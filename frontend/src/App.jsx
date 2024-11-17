import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { FiUpload, FiFile, FiTrash2, FiLoader } from 'react-icons/fi';

function App() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }))]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const processFiles = () => {
    setIsProcessing(true);
    // Simulated processing - in real app this would call the backend
    setTimeout(() => {
      setIsProcessing(false);
      setFiles([]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Notes Compiler
          </h1>
          <p className="text-lg text-gray-600">
            Upload your handwritten notes and let AI combine them into a comprehensive document
          </p>
        </div>

        <Dropzone onDrop={handleDrop} accept={{'image/*': ['.png', '.jpg', '.jpeg']}}>
          {({getRootProps, getInputProps}) => (
            <div 
              {...getRootProps()} 
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop your notes here, or click to select files
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports PNG, JPG, JPEG
              </p>
            </div>
          )}
        </Dropzone>

        {files.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h2>
            <div className="space-y-3">
              {files.map(({file, id}) => (
                <div 
                  key={id} 
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <FiFile className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={processFiles}
              disabled={isProcessing}
              className={`mt-6 w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isProcessing ? (
                <>
                  <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                'Process Notes'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;