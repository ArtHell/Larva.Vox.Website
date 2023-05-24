import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';


const VoxFileUpload = () => {
  const { register, setValue, handleSubmit, formState } = useForm();
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isLoadingFile, setIsLoadingFile] = useState(false);

  const onSubmit = (data) => {
    console.log(data.file);

  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileName(file.name);
      setIsLoadingFile(true);
      const reader = new FileReader();


      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      reader.onloadend = () => {
        setIsLoadingFile(false);
        setProgress(0);
      };

      reader.readAsDataURL(file);

      reader.onload = () => {
        setValue('file', reader.result);
        console.log(formState);
      };
    }
  };

  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-slate-800- p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-8">
          <div className="mb-4">
            <label className="block font-bold mb-2">Upload .vox file:</label>
            <input type="file" accept=".vox" className="hidden" onChange={handleFileChange} ref={fileInputRef}/>
            <input type="text" {...register("file", { required: true })} className="hidden" />
            <button type="button" onClick={handleClick} className="py-2 px-3 text-white text-sm font-semibold rounded-md shadow focus:outline-none border">Choose file</button>
            <div className="relative w-full h-2 rounded-sm mt-2">
              {
                isLoadingFile ? `Loading ${fileName}} ${progress}%` : fileName
              }
            </div>
            {progress > 0 && (
              <div className="relative w-full h-2 rounded-sm mt-2">
                <div className="absolute top-0 left-0 bg-blue-500 h-full rounded-sm" style={{ width: `${progress}%` }} />
              </div>
            )}
            {formState.errors.file && <span role="alert" className="text-red-500 text-sm">{formState.errors.file.message || "This field is required"}</span>}
          </div>
          <button type="submit" className="py-2 px-9 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none">Upload</button>
        </form>
      </div>
    </div>

  );
};

export default VoxFileUpload;