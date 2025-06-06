import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface UploadFormData {
  uploadedBy: number;
  date: string;
  videoUrl: string;
  notes: string;
}

interface UploadFormProps {
  onSubmit: (formValues: UploadFormData) => Promise<void>;
  onCancel: () => void;
  showProgress?: boolean;
  progressPercentage?: number;
  fileName?: string;
  initialVideoUrl?: string;
}

const UploadForm: React.FC<UploadFormProps> = ({
  onSubmit,
  onCancel,
  showProgress = false,
  progressPercentage = 0,
  fileName = '',
  initialVideoUrl = ''
}) => {
  const [formData, setFormData] = useState<UploadFormData>({
    date: new Date().toISOString().split('T')[0],
    uploadedBy: 1,
    videoUrl: initialVideoUrl,
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'date') {
        return { ...prev, [name]: new Date(value).toISOString().split('T')[0] };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Practice Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:border-[#FFB81C] focus:ring-2 focus:ring-[#FFB81C] focus:ring-opacity-20 transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Add session notes..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:border-[#FFB81C] focus:ring-2 focus:ring-[#FFB81C] focus:ring-opacity-20 transition-all"
            />
          </div>
        </div>

        {/* Upload Progress */}
        {showProgress && (
          <div className="mt-8">
            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-2">
              <span>Uploading {fileName}...</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <motion.div 
                className="h-2 bg-[#FFB81C] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <motion.button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="px-6 py-3 bg-[#2D3092] text-white rounded-lg hover:bg-[#2D3092]/90 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Start Upload</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default UploadForm;
