import { FaDropbox } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <MdOutlineCloudUpload className="text-3xl" />
      <p>Browse to upload or drag and drop</p>
      <label
        htmlFor="browse_files"
        className="text-[12px] border font-semibold border-black/20 rounded-[4px] py-2 px-4 cursor-pointer"
      >
        Browse Files
        <input type="file" accept="image/*" multiple id="browse_files" hidden />
      </label>
      <button className="text-[12px] border font-semibold border-black/20 rounded-[4px] py-2 px-4 flex gap-2 items-center">
        <FaDropbox className="text-blue-600" />
        ADD FROM DROPBOX
      </button>
    </div>
  );
};
export default UploadImage;
