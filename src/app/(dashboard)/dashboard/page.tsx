'use client';

import Headers from "@/components/Reusable/Headers";
import StatsCards from "./_components/stats-cards/StatsCards";
import OverviewTable from "./_components/overview-table/OverviewTable";

export default function Page() {
  return (
    <div className='min-h-screen'>
      <Headers title={"Dashboard"} subHeader={"Welcome back! Here's what's happening with your school."} />
      <StatsCards />
      <OverviewTable />
    </div>
  );
}
