'use client';

import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  file: FileList;
};

const VoxFileUpload: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);

  const onSubmit = (data: FormData) => {
    const file = data.file[0];
    // Do something with the file
    console.log(file);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      // Do something with the file data
    };
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { ref, ...fileFormFieldProps } = register('file', { required: true });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onprogress = (event: ProgressEvent<FileReader>) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      reader.onloadend = () => {
        setProgress(0);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Upload .vox file:</label>
        <input type="file" accept=".vox" {...fileFormFieldProps} className="hidden" ref={(e) => {
          ref(e);
          fileInputRef.current = e; // you can still assign to ref
        }} onChange={handleFileChange} />
        <button type="button" onClick={handleClick} className="border rounded py-2 px-3 w-full">Choose file</button>
        {progress > 0 && (
          <div className="relative w-full h-2 rounded-sm bg-gray-300 mt-2">
            <div className="absolute top-0 left-0 bg-blue-500 h-full rounded-sm" style={{ width: `${progress}%` }} />
          </div>
        )}
        {errors.file && <span role="alert" className="text-red-500 text-sm">{errors.file.message || "This field is required"}</span>}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
    </form>
  );
};

export default VoxFileUpload;