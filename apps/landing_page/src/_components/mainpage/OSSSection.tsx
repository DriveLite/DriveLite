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

export function OSSSection() {
  const techs: { name: string; color: string }[] = [
    { name: "MinIO", color: "bg-red-700" },
    { name: "s3", color: "bg-lime-700" },
    { name: "Sqlite", color: "bg-amber-700" },
    { name: "postgres", color: "bg-cyan-700" },
    { name: "File system", color: "bg-fuchsia-700" },
  ];
  return (
    <section className="section">
      <div className="section-container flex flex-col justify-between md:flex-row">
        <div>
          <h1 className="text-xl md:text-3xl font-black my-5">
            Fully Open Source, AGPLv3 license
          </h1>
          <p className="text-md md:text-xl my-5 text-foreground/50">
            DriveLite is built in public. Fork it, deploy it, or contribute.
            Join our community of developers building the future of file
            storage.
          </p>
        </div>
        <div className="bg-gray-900 border border-foreground/10 rounded-md p-6">
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
