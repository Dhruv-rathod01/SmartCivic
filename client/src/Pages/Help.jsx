
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

import {
  FaSearch,
  FaFileAlt,
  FaClipboardList,
  FaUserCircle,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaHeadset,
  FaArrowRight,
  FaQuestionCircle,
  FaRegLightbulb,
  FaTimes,
} from "react-icons/fa";

const Help = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      title: "Reporting Issues",
      description: "Learn how to submit civic complaints.",
      icon: <FaFileAlt />,
      color: "text-emerald-400",
    },
    {
      title: "Tracking Reports",
      description: "Understand complaint status and progress.",
      icon: <FaClipboardList />,
      color: "text-blue-400",
    },
    {
      title: "Account & Profile",
      description: "Manage your account and personal details.",
      icon: <FaUserCircle />,
      color: "text-purple-400",
    },
    {
      title: "Privacy & Security",
      description: "Keep your account and information safe.",
      icon: <FaShieldAlt />,
      color: "text-orange-400",
    },
  ];

  const faqs = [
    {
      category: "Reporting Issues",
      question: "How can I report a civic issue?",
      answer:
        "Go to the Report Issue page, select the issue category, enter a description, upload a photo if available, add the location and submit your complaint.",
    },
    {
      category: "Reporting Issues",
      question: "Can I upload photos with my complaint?",
      answer:
        "Yes. You can attach relevant photos to help administrators understand the civic issue more clearly.",
    },
    {
      category: "Reporting Issues",
      question: "Which types of issues can I report?",
      answer:
        "You can report issues related to garbage, water supply, drainage, roads, streetlights, parks, sanitation and other available categories.",
    },
    {
      category: "Tracking Reports",
      question: "How can I track my submitted complaints?",
      answer:
        "Open My Reports from the sidebar. You can view your submitted complaints and check their latest status.",
    },
    {
      category: "Tracking Reports",
      question: "What does Pending status mean?",
      answer:
        "Pending means your complaint has been submitted and is waiting for review.",
    },
    {
      category: "Tracking Reports",
      question: "What does In Progress status mean?",
      answer:
        "It means your complaint has been reviewed and work on the reported issue has started.",
    },
    {
      category: "Tracking Reports",
      question: "What does Resolved status mean?",
      answer:
        "It means the reported issue has been marked as resolved by the responsible administrator.",
    },
    {
      category: "Account & Profile",
      question: "How can I update my profile details?",
      answer:
        "Go to Profile, open Edit Profile and update your name, username or email address.",
    },
    {
      category: "Account & Profile",
      question: "How can I change my password?",
      answer:
        "Open Profile, select Change Password, enter your current password and choose a new password.",
    },
    {
      category: "Privacy & Security",
      question: "Is my personal information secure?",
      answer:
        "SmartCivic uses account authentication and password protection to help secure user accounts. Avoid sharing your login credentials with anyone.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCategory = (category) => {
    setActiveCategory(category);
    setOpenFaq(null);

    document.getElementById("faq-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#050d0b] pt-16">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-0"
          }`}
        >
          {sidebarOpen && <Sidebar />}
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1 px-5 py-8 md:px-8">

          {/* Page Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Help & Support
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Find answers and get help using SmartCivic.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              <FaQuestionCircle />
              Support Center
            </div>
          </div>

          {/* Search Section */}
          <section className="relative mb-10 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-[#10241e] to-[#0b1715] p-6 md:p-10">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <div className="mb-3 flex justify-center">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">
                  <FaRegLightbulb size={27} />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white md:text-3xl">
                How can we help you?
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Search for guides, questions or common problems.
              </p>

              <div className="mt-6 flex items-center rounded-xl border border-slate-700 bg-[#081310] px-4 py-3 focus-within:border-emerald-500">
                <FaSearch className="shrink-0 text-slate-500" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveCategory("All");
                    setOpenFaq(null);
                  }}
                  placeholder="Search your question here..."
                  className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-slate-400 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
          </section>

          {/* Help Categories */}
          <section className="mb-10">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-white">
                Browse Help Topics
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Select a category to find relevant answers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => handleCategory(item.title)}
                  className={`group rounded-xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-[#10201b] ${
                    activeCategory === item.title
                      ? "border-emerald-500/50 bg-[#10201b]"
                      : "border-slate-800 bg-[#0b1715]"
                  }`}
                >
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-xl ${item.color}`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    Explore guides
                    <FaArrowRight className="transition group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq-section" className="mb-10 scroll-mt-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Frequently Asked Questions
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Find quick answers to common questions.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearch("");
                  setOpenFaq(null);
                }}
                className="w-fit text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Clear filters
              </button>
            </div>

            {/* Category Filters */}
            <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
              {["All", ...categories.map((item) => item.title)].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenFaq(null);
                    }}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
                      activeCategory === category
                        ? "border-emerald-500 bg-emerald-500 text-[#04110d]"
                        : "border-slate-700 bg-[#0b1715] text-slate-400 hover:border-emerald-500/50 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-xl border border-slate-800 bg-[#0b1715] transition hover:border-slate-700"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <div>
                        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                          {faq.category}
                        </span>

                        <span className="text-sm font-semibold text-slate-100">
                          {faq.question}
                        </span>
                      </div>

                      <span className="shrink-0 text-emerald-400">
                        {openFaq === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </button>

                    {openFaq === index && (
                      <div className="border-t border-slate-800 px-5 py-4">
                        <p className="text-sm leading-7 text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-slate-800 bg-[#0b1715] px-5 py-12 text-center">
                  <FaSearch className="mx-auto mb-3 text-3xl text-slate-600" />
                  <h3 className="font-semibold text-white">
                    No results found
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Try searching with different keywords.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                    className="mt-4 text-sm font-semibold text-emerald-400"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Contact Support */}
          <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="rounded-xl border border-slate-800 bg-[#0b1715] p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400">
                <FaEnvelope />
              </div>

              <h3 className="text-lg font-bold text-white">
                Email Support
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Need assistance with your account or reported issue?
                Contact our support team through email.
              </p>

              <p className="mt-4 text-xs text-slate-500">
                Add your official support email here.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-[#10241e] to-[#0b1715] p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400">
                <FaHeadset />
              </div>

              <h3 className="text-lg font-bold text-white">
                Still need help?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                If you cannot find the answer to your question,
                submit a support request and explain your problem.
              </p>

              <p className="mt-4 text-xs text-emerald-400">
                Support request feature can be connected to your backend.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Help;
