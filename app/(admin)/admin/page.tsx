"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dog,
  FileText,
  ShoppingBag,
  Users,
  HelpCircle,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { getAllUsers } from "@/lib/data/users";
import { PendingVendorsWidget } from "@/components/admin/pending-vendors";

export default function AdminDashboardPage() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    getAllUsers()
      .then((users) => setUserCount(users.length))
      .catch((error) => {
        console.error("Error loading admin dashboard users:", error);
        setUserCount(0);
      });
  }, []);

  const stats = [
    {
      icon: Dog,
      label: "Breeds",
      value: "15",
      href: "/admin/breeds",
      color: "text-blue-600",
    },
    {
      icon: FileText,
      label: "Articles",
      value: "10",
      href: "/admin/articles",
      color: "text-green-600",
    },
    {
      icon: ShoppingBag,
      label: "Products",
      value: "12",
      href: "/admin/products",
      color: "text-purple-600",
    },
    {
      icon: HelpCircle,
      label: "FAQs",
      value: "10",
      href: "/admin/faqs",
      color: "text-amber-600",
    },
    {
      icon: Stethoscope,
      label: "Symptoms",
      value: "20",
      href: "/admin/symptoms",
      color: "text-red-600",
    },
    {
      icon: Users,
      label: "Users",
      value: userCount === null ? "..." : userCount.toString(),
      href: "/admin/users",
      color: "text-indigo-600",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage PawMatch content and users.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-colors hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-muted-foreground">
                  Total {stat.label}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <PendingVendorsWidget />
      </div>
    </div>
  );
}
