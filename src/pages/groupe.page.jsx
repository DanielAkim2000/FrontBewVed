import axios from "axios";
import React, { useEffect, useState } from "react";
import TableGroupes from "../components/tablegroupes";

function GroupePage() {
  
  useEffect(() => {
    document.title = "Groupes";
  }, []);
  return (
    <div className="rounded p-5 bg-body-secondary  mx-5">
      <h1 className="text-center mb-5">Page des groupes</h1>

      <TableGroupes />
    </div>
  );
}

export default GroupePage;
