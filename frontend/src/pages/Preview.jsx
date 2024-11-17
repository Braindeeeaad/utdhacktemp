import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload } from 'react-icons/fi';

function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { combinedDocument } = location.state || {};

  const downloadDocument = () => {
    if (!combinedDocument) return;

    const blob = new Blob([combinedDocument], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'combined-notes.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (!combinedDocument) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No document to preview</h2>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <FiArrowLeft className="mr-2" />
            Head back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </button>
          <button
            onClick={downloadDocument}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <FiDownload className="mr-2" />
            Download
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Document Preview</h1>
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans">
                {combinedDocument}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;