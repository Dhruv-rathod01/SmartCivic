import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import categories from "../Components/Categories";
import {Link,useNavigate } from "react-router-dom";
import {useState,useEffect} from "react";


const Report = () => {
   const [sidebarOpen, setSidebarOpen] = useState(true);
 
  return (
    <div className="w-full min-h-screen bg-[#050d0b] pt-16">
      <Nav onMenuClick={()=> setSidebarOpen(!sidebarOpen)} 
        />
       <div className="flex">
  <div
    className={`shrink-0 transition-all duration-300 ${
      sidebarOpen ? "w-60" : "w-0"
    }`}
  >
    {sidebarOpen && <Sidebar />}
  </div>

            <main className="min-w-0 flex-1 p-5 text-white md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold tracking-tighter">
          Citizen Dashboard
        </h1>
        <p className="mt-2 text-zinc-400">
          Track your reports and see community issues.
        </p>
        <section className="mt-10 rounded-xl border border-slate-800 p-5 md:p-7">
          <h2 className=" text-2xl font-bold" >Report a New Issue</h2>
        <p className="mt-2 text-sm text-zinc-400 md:text-base">Select a category to begin your report. For urgent issues, select Emergency Report.</p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((category) => (
            <Link
              key={category.title}
              to="/complain"
              className="rounded-xl border border-slate-800 p-5 text-center hover:border-emerald-500"
            >
              <category.icon className="mx-auto mb-4 text-3xl text-emerald-500" />

              <h3 className="font-semibold">{category.title}</h3>

              <p className="mt-2 text-sm text-zinc-400">
                {category.description}
              </p>
            </Link>
          
        ))}
      </div>
      </section>
              
      </main>
          
    </div>
    </div>
  );
};

export default Report;