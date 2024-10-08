import { Fragment, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";

const AddPhotos = () => {
  const [tab, setTab] = useState("details");
  const [credits, setCredits] = useState([{ name: "", type: "" }]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setError] = useState("");
  const [formData, setFormData] = useState({
    albumName: "",
    description: "",
    credits: [{ name: "", type: "" }],
    images: [],
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const imageUrls = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagePreviews((prevData) => [...prevData, ...imageUrls]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...files],
    }));
  };

  const addCredit = () => {
    setCredits([...credits, { name: "", type: "" }]);
  };

  const handleCreditChange = (index, field, value) => {
    const updatedCredits = credits.map((credit, i) =>
      i === index ? { ...credit, [field]: value } : credit
    );
    setCredits(updatedCredits);
    setFormData((prevData) => ({ ...prevData, credits: updatedCredits }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVadilation = () => {
    let newerrors = {};
    let hasErrors = false;

    if (formData.albumName === "" || formData.albumName === null) {
      newerrors.albumName = "Album name is required";
      hasErrors = true;
    }

    // Images validation
    if (formData.images.length === 0) {
      newerrors.images = "At least one image is required";
      hasErrors = true;
    }

    // Credits validation
    formData.credits.forEach((credit, index) => {
      if (!credit.name.trim()) {
        newerrors[`name_${index}`] = "Name is required";
        hasErrors = true;
      }
      if (!credit.type.trim()) {
        newerrors[`type_${index}`] = "Vendor type is required";
        hasErrors = true;
      }
    });

    setError(newerrors);
    return hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateResponse = handleVadilation();
    if (validateResponse) {
      alert("Please fill requires fields");
      return null;
    }

    console.log("Submitted form data", formData);
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full lg:overflow-hidden"
      >
        <div className="flex items-center justify-between px-2 lg:px-10 py-5">
          <button
            type="button"
            className="flex items-center lg:gap-2 text-[16px] font-semibold"
          >
            <IoIosArrowRoundBack className="text-2xl" />
            EDIT PHOTO COLLECTIONS
          </button>
          <div className="space-x-4 lg:flex-row flex flex-col gap-4 justify-center">
            <button
              type="button"
              className="border-black/30 border-2 text-black/70 text-[14px] font-semibold px-4 py-1 rounded-sm"
            >
              SAVE AS DRAFT
            </button>
            <button
              type="submit"
              className="bg-black border-black border-2 text-white font-semibold text-[14px] px-4 py-1 rounded-sm"
            >
              PUBLISH
            </button>
          </div>
        </div>
        <hr />
        <section className="w-full h-full lg:flex">
          <div className="lg:w-[80%] w-full lg:h-full px-4 pt-4 pb-20 overflow-y-auto">
            <div
              className={`w-full h-full ${
                errors.images
                  ? "border-red-500/80 border-2"
                  : "border-black/20 border"
              } rounded-[12px] ${
                imagePreviews.length === 0
                  ? "flex items-center justify-center"
                  : "flex flex-wrap gap-2 p-4"
              }`}
            >
              {imagePreviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <MdOutlineCloudUpload className="text-3xl" />
                  <p>Browse to upload or drag and drop</p>
                  <label
                    htmlFor="browse_files"
                    className={`text-[12px] font-semibold ${
                      errors.images
                        ? "border-red-500/80 border-2 bg-red-100"
                        : "border-black/20 border"
                    } rounded-[4px] py-2 px-4 cursor-pointer`}
                  >
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id="browse_files"
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                  <button className="text-[12px] border font-semibold border-black/20 rounded-[4px] py-2 px-4 flex gap-2 items-center">
                    <FaDropbox className="text-blue-600" />
                    ADD FROM DROPBOX
                  </button>
                </div>
              ) : (
                <div className="w-full flex flex-wrap gap-x-6 gap-y-4">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      className="lg:w-[18%] w-full h-36 object-cover rounded-lg"
                    />
                  ))}
                  <div className="h-36 w-full lg:w-[18%] px-2 py-2 flex flex-col items-center justify-center gap-1 xl:gap-2 border rounded-[12px]">
                    <MdOutlineCloudUpload className="text-2xl text-center" />
                    <p className="xl:text-[12px] text-[10px]">
                      Browse to upload or drag and drop
                    </p>
                    <label
                      htmlFor="browse_files"
                      className="xl:text-[12px] text-[10px] border font-semibold border-black/20 rounded-[4px] py-1 px-3 cursor-pointer"
                    >
                      Browse Files
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="browse_files"
                        hidden
                        onChange={handleImageChange}
                      />
                    </label>
                    <button className="xl:text-[12px] text-[10px] border font-semibold border-black/20 rounded-[4px] py-1 px-1 xl:px-3 flex xl:gap-2 items-center">
                      <FaDropbox className="text-blue-600" />
                      ADD FROM DROPBOX
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-black/20 w-[1px] lg:h-full" />
          <div className="lg:w-[20%] h-full">
            <div className="w-full flex justify-around items-center border-b pt-4">
              <button
                type="button"
                onClick={() => setTab("details")}
                className={`w-full pb-4 text-black font-semibold text-[14px] ${
                  tab === "details"
                    ? "border-b-4 border-black "
                    : "border-b-4 border-transparent"
                }`}
              >
                DETAILS
              </button>
              <button
                type="button"
                onClick={() => setTab("credits")}
                className={`w-full pb-4 text-black font-semibold text-[14px] ${
                  tab === "credits"
                    ? "border-b-4 border-black "
                    : "border-b-4 border-transparent"
                }`}
              >
                CREDITS
              </button>
            </div>
            {tab === "details" && (
              <div className="py-4 px-4 space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="album_name"
                    className="font-semibold text-[14px]"
                  >
                    Album Name
                  </label>
                  <input
                    type="text"
                    name="albumName"
                    id="album_name"
                    className={`w-full px-4 py-2 text-[14px] ${
                      errors.albumName
                        ? "border-red-500/80 border-2"
                        : "border-black/20 border"
                    } rounded-[4px]`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="font-semibold text-[14px]"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    className="w-full h-32 border px-4 py-2 text-[14px] border-black/20 rounded-[4px]"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {tab === "credits" && (
              <div className="py-4 px-4 space-y-4">
                <h4>CREDIT</h4>
                {credits.map((credit, index) => (
                  <div key={index} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor={`name_${index}`}
                        className="font-semibold text-[14px]"
                      >
                        Your Name {index === 0 ? "" : index}
                      </label>
                      <input
                        type="text"
                        name={`yourName_${index}`}
                        id={`name_${index}`}
                        value={credit.name}
                        onChange={(e) =>
                          handleCreditChange(index, "name", e.target.value)
                        }
                        className={`w-full  px-4 py-2 text-[14px] ${
                          errors[`name_${index}`]
                            ? "border-red-500/80 border-2"
                            : "border-black/20 border"
                        } rounded-[4px]`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor={`type_${index}`}
                        className="font-semibold text-[14px]"
                      >
                        Vendor Type {index === 0 ? "" : index}
                      </label>
                      <input
                        type="text"
                        name={`vendorType_${index}`}
                        id={`type_${index}`}
                        value={credit.type}
                        onChange={(e) =>
                          handleCreditChange(index, "type", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-[14px] ${
                          errors[`type_${index}`]
                            ? "border-red-500/80 border-2"
                            : "border-black/20 border"
                        } rounded-[4px]`}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCredit}
                  className="text-[14px] font-semibold border border-black/50 rounded-[4px] w-full py-2"
                >
                  ADD ANOTHER CREDIT
                </button>
              </div>
            )}
          </div>
        </section>
      </form>
    </Fragment>
  );
};
export default AddPhotos;
