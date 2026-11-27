import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import categories from "../Components/Categories";
import { Link } from "react-router-dom";
import { useState } from "react";

const Report = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0d1015] pt-16 text-white">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-20"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>

        <main className="min-w-0 flex-1 p-5 text-white md:p-8 lg:p-8">
          <h1 className="text-3xl font-bold md:text-4xl">
            Raise a <span className="text-amber-400">Concern</span>
          </h1>
          <p className="mt-2 text-zinc-400">
            Report local issues and contribute to a better community.
          </p>

          <section className="mt-10 rounded-xl border border-zinc-800 bg-[#131720] p-5 md:p-7">
            <h2 className="text-2xl font-bold">Report a New Issue</h2>
            <p className="mt-2 text-sm text-zinc-400 md:text-base">
              Select a category to begin your report. For urgent issues, select Emergency Report.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  to="/complain"
                  state={{ selectedCategory: category.title }}
                  className="rounded-xl border border-zinc-800 bg-[#0d1015] p-5 text-center transition hover:border-amber-400"
                >
                  <category.icon className="mx-auto mb-4 text-3xl text-amber-400" />

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