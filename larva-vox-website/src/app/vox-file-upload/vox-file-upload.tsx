'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  file: FileList;
};

const VoxFileUpload: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const file = data.file[0];
    // Do something with the file
    console.log(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Upload .vox file:</label>
        <input type="file" accept=".vox" {...register("file", { required: true })} className="border rounded py-2 px-3 w-full" />
        {errors.file && <span role="alert" className="text-red-500 text-sm">{errors.file.message || "This field is required"}</span>}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
    </form>
  );
};

export default VoxFileUpload;