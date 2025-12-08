import React from 'react';
import CardStats from '../components/card';
import GridExample from '../components/table/table';

const Dashboard = ({ setGridApi }) => {
  return (
    <div className="p-4 md:p-6">
      <main className="flex-1 overflow-auto">
        <CardStats />
        <GridExample onGridReady={(api) => setGridApi(api)} />
      </main>
    </div>
  );
}

export default Dashboard;