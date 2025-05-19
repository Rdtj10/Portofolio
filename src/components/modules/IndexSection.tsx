// import Link from "next/link";
"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function IndexSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section
      className="w-full min-h-screen dark:bg-[#22232F] bg-[#F0F0F5] flex flex-col gap-8 py-8 px-6 lg:px-24 items-center justify-center transition-all duration-500"
      id="index"
    >
      <h1 className="text-center text-3xl text-yellow-600 dark:text-yellow-300 font-semibold">
        Index
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center h-full md:mt-4">
        <div className="md:max-w-1/2 h-full flex flex-col justify-center">
          <h1 className="text-xl md:text-3xl dark:text-white font-semibold">
            Let see all my works
          </h1>
          <p className="md:text-lg dark:text-gray-300 mt-4 text-justify">
            Here you can explore all my projects categorized into three
            sections:{" "}
            <span className="text-yellow-600 dark:text-yellow-300 font-medium">
              Current
            </span>{" "}
            projects that I am actively working on,
            <span className="text-yellow-600 dark:text-yellow-300 font-medium">
              {" "}
              Pending
            </span>{" "}
            projects that are in the pipeline, and{" "}
            <span className="text-yellow-600 dark:text-yellow-300 font-medium">
              {" "}
              Completed
            </span>{" "}
            projects that showcase my accomplishments.
          </p>
          <div className="grid grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-8">
            <div className="flex flex-col items-center justify-center p-6 rounded-lg">
              <h2 className="text-lg md:text-xl text-yellow-600 dark:text-yellow-300 font-semibold">
                In progress
              </h2>
              <p className="dark:text-white text-xl md:text-2xl font-bold">1</p>
              <p className="dark:text-white">Project</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg">
              <h2 className="text-lg md:text-xl text-yellow-600 dark:text-yellow-300 font-semibold">
                Pending
              </h2>
              <p className="dark:text-white text-xl md:text-2xl font-bold">4</p>
              <p className="dark:text-white">Projects</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg">
              <h2 className="text-lg md:text-xl text-yellow-600 dark:text-yellow-300 font-semibold">
                Totally Complete
              </h2>
              <p className="dark:text-white text-xl md:text-2xl font-bold">2</p>
              <p className="dark:text-white">Projects</p>
            </div>
            <div className="flex flex-col items-center justify-center p-6 rounded-lg">
              <h2 className="text-lg md:text-xl text-yellow-600 dark:text-yellow-300 font-semibold">
                Total
              </h2>
              <p className="dark:text-white text-xl md:text-2xl font-bold">
                7
              </p>
              <p className="dark:text-white">Projects</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-12 w-full">
          {/* <Link href="#current-projects" passHref>
            <div onClick={() => handleScroll('completed-projects')} className="dark:text-white border-b border-[#4B4A5D] p-6 rounded-lg cursor-pointer hover:dark:bg-[#4B4A5D] hover:bg-white/5 transition flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl">
                  <Icon icon="mdi:progress-clock" className="text-6xl" />
                </span>
                <div>
                  <h2 className="text-base md:text-xl font-semibold">Current Projects</h2>
                  <p>Explore the projects I am actively working on.</p>
                </div>
              </div>
              <span className="text-gray-400 text-2xl">
                <Icon icon="mdi:chevron-right" />
              </span>
            </div>
          </Link>
          <Link href="#pending-projects" passHref>
            <div className="dark:text-white border-b border-[#4B4A5D] p-6 rounded-lg cursor-pointer hover:bg-[#4B4A5D] transition flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl">
                  <Icon icon="mdi:clock-alert" className="text-6xl"/>
                </span>
                <div>
                  <h2 className="text-base md:text-xl font-semibold">Pending Projects</h2>
                  <p>Check out the projects in the pipeline.</p>
                </div>
              </div>
              <span className="text-gray-400 text-2xl">
                <Icon icon="mdi:chevron-right" />
              </span>
            </div>
          </Link>
          <Link href="#completed-projects" passHref>
            <div className="dark:text-white border-b border-[#4B4A5D] p-6 rounded-lg cursor-pointer hover:bg-[#4B4A5D] transition flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl">
                  <Icon icon="mdi:check-circle" className="text-6xl"/>
                </span>
                <div>
                  <h2 className="text-base md:text-xl font-semibold">Completed Projects</h2>
                  <p>View the projects I have successfully completed.</p>
                </div>
              </div>
              <span className="text-gray-400 text-2xl">
                <Icon icon="mdi:chevron-right" />
              </span>
            </div>
          </Link> */}
          <div
            onClick={() => handleScroll("completed-projects")}
            className="dark:text-white border-b border-[#4B4A5D] p-1 md:p-6 rounded-lg cursor-pointer hover:dark:bg-[#4B4A5D] hover:bg-white/5 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl">
                <Icon icon="mdi:check-circle" className="text-6xl" />
              </span>
              <div>
                <h2 className="text-base md:text-xl font-semibold">
                  Completed Projects
                </h2>
                <p className="text-xs md:text-base">
                  View the projects I have successfully completed.
                </p>
              </div>
            </div>
            <span className="text-gray-400 text-2xl">
              <Icon icon="mdi:chevron-right" />
            </span>
          </div>
          <div
            onClick={() => handleScroll("current-projects")}
            className="dark:text-white border-b border-[#4B4A5D] p-1 md:p-6 rounded-lg cursor-pointer hover:dark:bg-[#4B4A5D] hover:bg-white/5 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl">
                <Icon icon="mdi:progress-clock" className="text-6xl" />
              </span>

              <div>
                <h2 className="text-base md:text-xl font-semibold">
                  Current Projects
                </h2>
                <p className="text-xs md:text-base">
                  Explore the projects I am actively working on.
                </p>
              </div>
            </div>
            <span className="text-gray-400 text-2xl">
              <Icon icon="mdi:chevron-right" />
            </span>
          </div>
          <div
            onClick={() => handleScroll("other-projects")}
            className="dark:text-white border-b border-[#4B4A5D] p-1 md:p-6 rounded-lg cursor-pointer hover:dark:bg-[#4B4A5D] hover:bg-white/5 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="text-yellow-600 dark:text-yellow-300 text-xl md:text-2xl">
                <Icon icon="mdi:clock-alert" className="text-6xl" />
              </span>
              <div>
                <h2 className="text-base md:text-xl font-semibold">
                  Pending Projects
                </h2>
                <p className="text-xs md:text-base">
                  Check out the projects in the pipeline.
                </p>
              </div>
            </div>
            <span className="text-gray-400 text-2xl">
              <Icon icon="mdi:chevron-right" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
