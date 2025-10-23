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

export function StatsSection() {
  return (
    <section className="section" id="stats">
      <div className="section-container mx-auto max-w-6xl px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-black my-5 ">Stats</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              100%
            </div>
            <div className="text-foreground/50 mt-2">Open Source</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">∞</div>
            <div className="text-foreground/50 mt-2">Scalability</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">0</div>
            <div className="text-foreground/50 mt-2">Tracking</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              100%
            </div>
            <div className="text-foreground/50 mt-2">Your Data</div>
          </div>
        </div>
      </div>
    </section>
  );
}
