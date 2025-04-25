export default function CompletedProjectsSection() {
  const projects = [
    { id: 1, title: "Project One", description: "Description of project one." },
    { id: 2, title: "Project Two", description: "Description of project two." },
    { id: 3, title: "Project Three", description: "Description of project three." },
  ];

  return (
    <section className="bg-[#22232F] py-12 px-5 text-white min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-[#FFD700] mb-5">Completed Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#2C2D3E] p-5 rounded-lg shadow-md"
            >
              <h3 className="text-[#FFD700] mb-2">{project.title}</h3>
              <p className="text-[#CCCCCC]">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
