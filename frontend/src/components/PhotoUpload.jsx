import { motion } from 'framer-motion';
import { useState } from 'react';

const PhotoUpload = ({ maxFiles = 3, maxSizeMB = 5, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setError('');

    if (selectedFiles.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = selectedFiles.every(file => {
      const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

      if (!isValidType) {
        setError('Only JPEG and PNG images are allowed');
        return false;
      }
      if (!isValidSize) {
        setError(`File size must be less than ${maxSizeMB}MB`);
        return false;
      }
      return true;
    });

    if (validFiles) {
      setFiles([...files, ...selectedFiles]);

      selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews(prev => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });

      if (onUpload) {
        onUpload([...files, ...selectedFiles]);
      }
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="rounded-2xl border-2 border-dashed border-saffron/50 p-8 text-center cursor-pointer hover:border-saffron transition-colors bg-saffron/5 mb-4">
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
          id="photo-upload"
        />
        <label htmlFor="photo-upload" className="cursor-pointer block">
          <p className="text-lg font-bold text-white mb-2">📸 Upload Photos</p>
          <p className="text-sm text-navy-400">
            JPEG or PNG • Max {maxSizeMB}MB each • Up to {maxFiles} files
          </p>
          <p className="text-sm text-saffron font-bold mt-2">{files.length}/{maxFiles}</p>
        </label>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-4 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-lg overflow-hidden"
            >
              <img src={preview} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PhotoUpload;
