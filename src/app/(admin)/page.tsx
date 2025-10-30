import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
// import { GroupIcon } from "@/icons";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";
// import ComponentCard from "@/components/common/ComponentCard";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import AllCallsTable from "@/components/tables/AllCallsTable";

// interface ComponentCardProps {
//   title: string;
//   children: React.ReactNode;
//   className?: string; // Additional custom classes for styling
//   desc?: string; // Description text
// }

export const metadata: Metadata = {
  title:
    "Admin Консультант",
  description: "Таблица с данными по всем заявкам",
};

export default function Ecommerce() {
  return (
    <div className="w-full grid gap-4 md:gap-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <EcommerceMetrics />
      </div>
      <div className="col-span-12 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <MonthlyTarget />
          </div>
        </div>
    </div>
    
  );
}
