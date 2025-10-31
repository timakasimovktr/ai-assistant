import ComponentCard from "@/components/common/ComponentCard";
import KnowledgeBase from "@/components/ecommerce/KnowledgeBase";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basic Table | Консультант Uzbekistan - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for Консультант Uzbekistan  Tailwind CSS Admin Dashboard Template",
};

export default function BasicTables() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="space-y-6">
        <ComponentCard title="Таблица со всем созданными базами знаний">
          <KnowledgeBase />
        </ComponentCard>
      </div>
    </div>
  );
}
