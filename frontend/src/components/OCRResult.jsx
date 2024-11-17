import { FiTrash2 } from 'react-icons/fi';

function OCRResult({ result, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {result.fileName}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {result.timestamp}
          </span>
          <button
            onClick={() => onDelete(result)}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete result"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-wrap">
          {result.text}
        </p>
      </div>
    </div>
  );
}

export default OCRResult;