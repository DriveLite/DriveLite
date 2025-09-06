export default function OSSSection() {
  const techs: { name: string; color: string }[] = [
    { name: "Go", color: "bg-blue-700" },
    { name: "React", color: "bg-green-700" },
    { name: "MinIO", color: "bg-red-700" },
    { name: "s3", color: "bg-lime-700" },
    { name: "Echo", color: "bg-indigo-700" },
    { name: "Sqlite", color: "bg-amber-700" },
    { name: "postgres", color: "bg-cyan-700" },
    { name: "File system", color: "bg-fuchsia-700" },
  ];
  return (
    <section className="mb-20 grid sm:grid-cols-2 gap-10 items-start">
      <div>
        <h3 className="text-xl font-bold mb-2">
          Fully Open Source, Apache License 2.0
        </h3>
        <p className="text-gray-400 mb-4 font-semibold">
          DriveLite is built in public. Fork it, deploy it, or contribute.
        </p>
      </div>
      <div className="bg-gray-900 border border-gray-700 rounded p-6">
        <h4 className="font-bold mb-4 text-white">
          Pluggable, Scalable Architecture
        </h4>
        <div className="flex flex-wrap gap-4 text-sm text-white">
          {techs.map((tech) => (
            <span
              key={tech.name}
              className={`${tech.color} text-white px-2 py-1 rounded font-bold`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
