export default function OSSSection() {
  return (
    <section className="mb-20 grid sm:grid-cols-2 gap-10 items-start">
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Fully Open Source, MIT Licensed
        </h3>
        <p className="text-gray-400 mb-4">
          DriveLite is built in public. Fork it, deploy it, or contribute.
        </p>
        <a
          href="https://github.com/Moukhtar-youssef/DriveLite"
          className="text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>
      <div className="bg-gray-900 border border-gray-700 rounded p-6">
        <h4 className="font-bold mb-4 text-white">
          Pluggable, Scalable Architecture
        </h4>
        <div className="flex flex-wrap gap-4 text-sm text-white">
          <span className="bg-red-500 px-2 py-1 rounded">MinIO</span>
          <span className="bg-blue-500 px-2 py-1 rounded">Go</span>
          <span className="bg-green-600 px-2 py-1 rounded">React</span>
          <span className="bg-indigo-600 px-2 py-1 rounded">Qdrant</span>
        </div>
      </div>
    </section>
  );
}
