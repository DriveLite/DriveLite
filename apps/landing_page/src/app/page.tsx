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

import { FeatureSection } from "@/_components/mainpage/FeaturesSection";
import { HeroSection } from "@/_components/mainpage/HeroSection";
import { OSSSection } from "@/_components/mainpage/OSSSection";
import { StatsSection } from "@/_components/mainpage/StatsSection";
import { WaitListSection } from "@/_components/mainpage/WaitListSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <WaitListSection />
      <OSSSection />
    </>
  );
}
