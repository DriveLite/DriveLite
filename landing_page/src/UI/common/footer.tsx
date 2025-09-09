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

export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="container mx-auto px-6 py-8 text-sm text-gray-500">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} DriveLite</div>
          <div>Built with Next.js • Supabase • Clerk</div>
        </div>
      </div>
    </footer>
  );
}
