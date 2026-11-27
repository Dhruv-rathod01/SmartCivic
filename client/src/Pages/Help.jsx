import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import Sidebar from "../Components/Sidebar";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaPlusCircle,
  FaClipboardList,
  FaHeadset,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const faqs = [
  {
    question: "How do I submit a new civic issue report?",
    answer:
      "Click 'Report Issue' in the sidebar or 'Report New Issue' on the dashboard, choose a category, upload or capture a clear photo, enter the exact location and description, then submit.",
  },
  {
    question: "What do Pending, In Progress, and Resolved statuses mean?",
    answer:
      "Pending means your report has been received and is awaiting review. In Progress means municipal teams are actively working on the issue. Resolved means the concern has been addressed and closed.",
  },
  {
    question: "Why should I include a clear photo and exact landmark/location?",
    answer:
      "Clear photos in good lighting and specific street or landmark details help field teams verify the issue faster and bring the right equipment on the first visit.",
  },
  {
    question: "How can I update my profile details or change my password?",
    answer:
      "Open Profile from the top-right avatar or the sidebar, then use Edit Profile to update your name, username, or email, or Change Password to set a new password.",
  },
  {
    question: "What should I do in an immediate life-threatening emergency?",
    answer:
      "SmartCivic is designed for civic infrastructure and community reporting. For immediate medical, fire, police, or life-threatening emergencies, always contact local emergency services directly.",
  },
];

const Help = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "Report & Status",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const filteredFaqs = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setSupportForm({
      subject: "",
      category: "Report & Status",
      message: "",
    });
    setTimeout(() => {
      setSent(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1015] pt-16 text-zinc-100">
      <Nav onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <div
          className={`shrink-0 transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-20"
          }`}
        >
          <Sidebar isOpen={sidebarOpen} />
        </div>

        <main className="min-w-0 flex-1 p-6 text-white md:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-bold md:text-4xl">
                Help & <span className="text-amber-400">Support</span>
              </h1>

              <span className="flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-300">
                <FaQuestionCircle className="text-base" />
                Citizen Guide
              </span>
            </div>

            <p className="mt-3 text-zinc-400">
              Find answers to common questions, learn how reports are handled, or reach out for assistance.
            </p>
          </div>

          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              to="/report-issue"
              className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#131720] p-5 transition hover:border-amber-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <FaPlusCircle className="text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                    Report a New Issue
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Submit a photo, location, and details for a local concern.
                  </p>
                </div>
              </div>
              <span className="text-xl text-zinc-400 group-hover:text-amber-400 transition">
                ›
              </span>
            </Link>

            <Link
              to="/my-reports"
              className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#131720] p-5 transition hover:border-amber-400/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <FaClipboardList className="text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                    Track Submitted Reports
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Check live progress across Pending, In Progress, and Resolved items.
                  </p>
                </div>
              </div>
              <span className="text-xl text-zinc-400 group-hover:text-amber-400 transition">
                ›
              </span>
            </Link>
          </div>

         
          <section className="mt-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-white">
                Frequently Asked Questions
              </h2>

              <div className="relative w-full sm:w-72">
                <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search help topics..."
                  className="w-full rounded-xl border border-zinc-800 bg-[#131720] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-[#131720] p-6 text-sm text-zinc-400">
                  No matching questions found for “{searchQuery}”.
                </div>
              ) : (
                filteredFaqs.map((faq, index) => {
                  const isExpanded = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#131720]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isExpanded ? -1 : index)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition hover:bg-[#171c27]"
                      >
                        <span className="font-semibold text-white">
                          {faq.question}
                        </span>
                        <FaChevronDown
                          className={`shrink-0 text-sm text-amber-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="border-t border-zinc-800/80 px-5 py-4 text-sm leading-6 text-zinc-400">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

        
          <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-zinc-800 bg-[#131720] p-6 lg:col-span-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <FaHeadset className="text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Contact Support
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Need help with an account issue or report status? Send us a note.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Topic
                    </label>
                    <select
                      value={supportForm.category}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-sm text-white outline-none focus:border-amber-400"
                    >
                      <option value="Report & Status">Report & Status</option>
                      <option value="Account & Login">Account & Login</option>
                      <option value="Photo or Location Issue">
                        Photo or Location Issue
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={supportForm.subject}
                      onChange={(e) =>
                        setSupportForm({
                          ...supportForm,
                          subject: e.target.value,
                        })
                      }
                      placeholder="Brief summary of your question"
                      className="w-full rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={supportForm.message}
                    onChange={(e) =>
                      setSupportForm({
                        ...supportForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Describe what you need help with..."
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-[#0d1015] p-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-amber-400"
                  />
                </div>

                {sent && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
                    Your support request has been noted. Our team will review it shortly.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-amber-400 py-3 font-semibold text-zinc-950 transition hover:bg-amber-300 sm:w-auto sm:px-6"
                >
                  Send Support Message
                </button>
              </form>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#131720] p-6 lg:col-span-5">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Direct Channels
                </h2>
                <p className="mt-1.5 text-sm text-zinc-400">
                  Reach the SmartCivic help desk during standard civic service hours.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                    <div className="flex items-center gap-3 text-sm font-semibold text-white">
                      <FaEnvelope className="text-amber-400" />
                      <span>Support Email</span>
                    </div>
                    <p className="mt-1 pl-7 text-sm text-zinc-400">
                      support@smartcivic.org
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800 bg-[#0d1015] p-4">
                    <div className="flex items-center gap-3 text-sm font-semibold text-white">
                      <FaPhoneAlt className="text-amber-400" />
                      <span>Citizen Helpline</span>
                    </div>
                    <p className="mt-1 pl-7 text-sm text-zinc-400">
                      1800-11-2484 (Mon–Sat, 9:00 AM – 6:00 PM)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-xs leading-5 text-amber-200">
                <strong className="font-semibold text-amber-300">Tip:</strong>{" "}
                If your question is about an existing report, include the category and location so it is easier to locate.
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Help;