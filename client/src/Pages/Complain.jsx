import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import categories from "../Components/Categories";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCloudUploadAlt, FaCamera } from "react-icons/fa";

const Complain = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const loc = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState( loc.state ? loc.state.selectedCategory : "");
  const [location , setLocation] = useState("")
  const [description, setDescription] = useState("");
  const [submitted,setSubmitted] = useState(false);
  const [loading,setLoading] = useState(false)
  const [error , setError]= useState("")
  const playClickSound = () => {
  const audio = new Audio("/audio/sent.mp3");
  audio.volume = 1.0;
  audio.play();
};

 
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          setLoading(true);
          setError("");

          const formData = new FormData();
          formData.append("category", category);
          formData.append("description", description);
          formData.append("location", location);

          if (photo) {
            formData.append("photo", photo);
          }

          const response = await axios.post(
            `${API_URL}/post`,
            formData,
            {
              withCredentials: true
            }
          );

          if (response.data.success === true) {
             playClickSound();
            setSubmitted(true);
            setPhoto(null);
            setCategory("");
            setLocation("");
            setDescription("");

            
            document.getElementById("issuePhoto").value = "";
            document.getElementById("cameraPhoto").value = "";

            
            setTimeout(() => {
              setSubmitted(false);
            }, 3000);
          }

        } catch (error) {
          console.log(error.response?.data?.message || error.message);

          setError(
            error.response?.data?.message || "Report submission failed."
          );
        } finally {
          setLoading(false);
        }
      };


  return (
    <div className="min-h-screen w-full bg-[#050d0b] pt-16">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
  <div
    className={`shrink-0 transition-all duration-300 ${
      sidebarOpen ? "w-60" : "w-0"
    }`}
  >
    {sidebarOpen && <Sidebar />}
  </div>


        <main className="min-w-0 flex-1 p-5 text-white md:p-8 lg:p-10">
          <section className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-800 p-6 shadow-xl shadow-black/20 md:p-10">
          
            <div className="mb-8 border-b border-slate-800 pb-6">
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Report a New Issue
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
                Help improve your community by reporting issues. Please
                provide a clear photo and description.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              
             
            <div className="mb-6">
              <label className="mb-3 block text-sm font-semibold text-white">
                Issue Photo <span className="text-red-400">*</span>
              </label>

              <div className="rounded-xl border-2 border-dashed border-slate-700 p-6 text-center transition hover:border-emerald-400">
                <FaCloudUploadAlt className="mx-auto mb-3 text-4xl text-emerald-400" />

                <p className="text-base font-medium text-white">
                  {photo ? photo.name : "Upload your issue photo"}
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Choose an existing image or capture a new one
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  PNG, JPG or JPEG
                </p>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <label
                    htmlFor="issuePhoto"
                    className="cursor-pointer rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    Choose Photo
                  </label>

                  <label
                    htmlFor="cameraPhoto"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-500/50 px-4 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/10"
                  >
                    <FaCamera />
                    Take Photo
                  </label>
                </div>

                <input
                  type="file"
                  id="issuePhoto"
                  name="issuePhoto"
                  accept="image/png,image/jpeg"
                  required={!photo}
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                />

                <input
                  type="file"
                  id="cameraPhoto"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                />
              </div>
            </div>


    
              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  Confirm Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-[#091310] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                >
                  <option value="" disabled>
                    Select an issue category
                  </option>

                  {categories.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>

              </div>
               <div className="mb-6">
                   <label htmlFor="location"
                   className="mb-2 block text-sm font-semibold text-white"
                   > Location </label>
                   <input type="text"
                   id="location"
                   name="location"
                   value={location}
                   onChange={(e)=> setLocation(e.target.value)}
                   placeholder="Enter your location"
                   required
                    className="w-full rounded-lg border border-slate-800 bg-[#091310] px-4 py-3 text-white outline-none transition focus:border-emerald-500"
                   />
               </div>
    
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-lg border border-slate-800 bg-[#091310] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald-500"
                />
              </div>

             
                    <button
          type="submit"
          disabled={loading || submitted}
          className="mt-2 w-full rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? "Submitting..."
            : submitted
            ? "✓ Thank You!"
            : "Submit Report"}
        </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Complain;