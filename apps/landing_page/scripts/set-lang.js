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

const fs = require("fs");
const path = require("path");

function setLangAttribute(buildDir) {
  function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        processDirectory(itemPath);
      } else if (item.endsWith(".html")) {
        processHtmlFile(itemPath);
      }
    });
  }

  function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");

    // Extract locale from file path
    const localeMatch = filePath.match(/\/docs\/([^/]+)/);
    if (localeMatch) {
      const locale = localeMatch[1];
      // Add or replace lang attribute
      content = content.replace(/<html(.*?)>/, `<html lang="${locale}"$1>`);
      fs.writeFileSync(filePath, content);
      console.log(`Set lang="${locale}" for ${filePath}`);
    }
  }

  processDirectory(buildDir);
}

// Use the Vercel output directory
setLangAttribute("./.next");
