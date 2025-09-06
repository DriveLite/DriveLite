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
          Fully Open Source, AGPLv3 license
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
