import { useState } from "react";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { BsWechat } from "react-icons/bs";

const Chatbot = () => {
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
            SmartCivic <span className="text-amber-400">Chatbot</span>
          </h1>
          <p className="mt-2 text-zinc-400">
            Assistant for civic reporting guidance and status help.
          </p>

          <section className="mt-10 rounded-xl border border-zinc-800 bg-[#131720] p-10 text-center md:p-16">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-400">
              <BsWechat className="text-3xl" />
            </div>

            <span className="inline-block rounded-full border border-amber-400/20 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              In Development
            </span>

            <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Coming Soon
            </h2>

            <p className="mx-auto mt-2.5 max-w-md text-sm leading-6 text-zinc-400 md:text-base">
              We are building the SmartCivic virtual assistant to help citizens report issues faster and check updates effortlessly.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;