// DriveLite - The self-hostable file storage solution.
// Copyright (C) 2025
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

export default function OSSSection() {
  const techs: { name: string; color: string }[] = [
    { name: "MinIO", color: "bg-red-700" },
    { name: "s3", color: "bg-lime-700" },
    { name: "Sqlite", color: "bg-amber-700" },
    { name: "postgres", color: "bg-cyan-700" },
    { name: "File system", color: "bg-fuchsia-700" },
  ];
  return (
    <section className="">
      <div className="mx-20 sm:p-12 p-2 py-12 grid sm:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="font-bold mb-2 text-3xl md:text-4xl">
            Fully Open Source, AGPLv3 license
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            DriveLite is built in public. Fork it, deploy it, or contribute.
            Join our community of developers building the future of file
            storage.
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-4xl p-6">
          <h4 className="font-bold mb-4 text-white">
            DriveLite&apos;s pluggable architecture. Choose your own stack and
            avoid lock-in.
          </h4>
          <div className="flex flex-wrap gap-4 sm:text-sm text-xs text-white">
            {techs.map((tech) => (
              <span
                key={tech.name}
                className={`${tech.color} text-white tech-tag px-2 py-1 rounded font-bold hover:cursor-pointer`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
