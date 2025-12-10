import React from 'react';
import CardStats from '../components/card';
import GridExample from '../components/table/table';
// import { useIsAllowed } from "@permitio/permit-react";

const Dashboard = ({ setGridApi }) => {
  // const { isAllowed } = useIsAllowed();
  return (
    <div className="p-4 md:p-6">
      <main className="flex-1 overflow-auto">
        {/* {isAllowed("read", "reports") && ( */}
        <CardStats />
        {/* )} */}
        <GridExample onGridReady={(api) => setGridApi(api)} />
      </main>
    </div>
  );
}

export default Dashboard;