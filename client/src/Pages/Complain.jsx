import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import categories from "../Components/Categories";
import axios from "axios";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Complain = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted,setSubmitted] = useState("false");
  const[loding,setLoding] = useState("false")
  const[error , setError]= useState("")
   

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const formData = new FormData();
        formData.append("category", category);
        formData.append("description", description);
        if (photo) {
        formData.append("photo", photo);
        }
        const response = await axios.post(
        (`${API_URL}/post`, FormData),
        { category, description, photo },
        { withCredentials: true }
    );
    console.log({
      photo,
      category,
      description,
    });
         if (response.data.success === true) {
              console.log("Receive")
            }
        } catch(error){
            console.log(error.response?.data?.message);
            setError(
              error.response?.data?.message || "Registration failed. Please try again."
            );
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

                <label
                  htmlFor="issuePhoto"
                  className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 p-6 text-center transition hover:border-emerald-400 hover:bg-emerald-400/5"
                >
                  <FaCloudUploadAlt className="mb-4 text-4xl text-emerald-400" />

                  <p className="text-base font-medium text-white">
                    {photo ? photo.name : "Click to upload a photo"}
                  </p>

                  <p className="mt-2 text-sm text-zinc-400">
                    Upload a clear picture of the reported issue
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    PNG, JPG or JPEG
                  </p>

                  <input
                    type="file"
                    id="issuePhoto"
                    name="issuePhoto"
                    accept="image/png,image/jpeg"
                    required
                    className="hidden"
                    onChange={(e) =>
                      setPhoto(e.target.files[0] || null)
                    }
                  />
                </label>
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
                className="mt-2 w-full rounded-lg border-none bg-emerald-500 px-4 py-3 font-semibold text-white outline-none transition hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d0b]"
              >
                Submit Report
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Complain;