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

export default function StatsSection() {
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Open Source
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">
              ∞
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Scalability
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">
              0
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Tracking
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">
              Your Data
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
