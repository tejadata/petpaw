"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PawPrint, Heart, Bell, AlertTriangle, FileText, Plus, Syringe } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getPetsByUser } from "@/lib/data/pets";
import { getUpcomingReminders, getOverdueReminders } from "@/lib/data/reminders";
import { getFavoriteBreedIds } from "@/lib/data/favorites";
import { getRecentReports } from "@/lib/data/medical-reports";
import { getOverdueVaccinationDoses, getUpcomingVaccinationDoses } from "@/lib/data/vaccinations";
import type { Pet } from "@/types/pet";
import type { MedicalReport } from "@/types/medical-report";
import type { VaccinationDose } from "@/types/vaccination";

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [favCount, setFavCount] = useState(0);
  const [reminderCount, setReminderCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [recentReports, setRecentReports] = useState<MedicalReport[]>([]);
  const [overdueVaccines, setOverdueVaccines] = useState<VaccinationDose[]>([]);
  const [upcomingVaccines, setUpcomingVaccines] = useState<VaccinationDose[]>([]);

  useEffect(() => {
    if (authLoading || !user) return;
    Promise.all([
      getPetsByUser(user.uid),
      getFavoriteBreedIds(user.uid),
      getUpcomingReminders(user.uid, 100),
      getOverdueReminders(user.uid),
      getRecentReports(user.uid, 3),
      getOverdueVaccinationDoses(user.uid),
      getUpcomingVaccinationDoses(user.uid, 3),
    ]).then(([p, favs, reminders, overdue, reports, vaxOverdue, vaxUpcoming]) => {
      setPets(p);
      setFavCount(favs.length);
      setReminderCount(reminders.length);
      setOverdueCount(overdue.length);
      setRecentReports(reports);
      setOverdueVaccines(vaxOverdue);
      setUpcomingVaccines(vaxUpcoming);
    });
  }, [user, authLoading]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back{user?.displayName ? `, ${user.displayName}` : ""}! Here&apos;s a quick overview of your PawMatch activity.
      </p>

      {overdueCount > 0 && (
        <Link href="/dashboard/reminders?tab=overdue" className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 hover:bg-red-100 transition-colors">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            You have <strong>{overdueCount}</strong> overdue reminder{overdueCount !== 1 ? "s" : ""} — click to review
          </span>
        </Link>
      )}

      {overdueVaccines.length > 0 && (
        <Link href="/dashboard/vaccinations" className="mt-2 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 hover:bg-red-100 transition-colors">
          <Syringe className="h-4 w-4 shrink-0" />
          <span>
            <strong>{overdueVaccines.length}</strong> overdue vaccination{overdueVaccines.length !== 1 ? "s" : ""} — click to review
          </span>
        </Link>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: PawPrint, label: "My Pets", value: pets.length, href: "/dashboard/pets", color: "text-primary" },
          { icon: Heart, label: "Favorites", value: favCount, href: "/dashboard/favorites", color: "text-red-500" },
          { icon: Bell, label: "Upcoming Reminders", value: reminderCount, href: "/dashboard/reminders", color: "text-amber-500" },
          { icon: Syringe, label: "Vaccinations", value: upcomingVaccines.length, href: "/dashboard/vaccinations", color: "text-emerald-600" },
          { icon: FileText, label: "Medical Reports", value: recentReports.length, href: "/dashboard/reports", color: "text-blue-600" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-xl font-bold">My Pets</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/dashboard/pets/new">
                <Plus className="h-4 w-4" />
                Add Pet
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {pets.length === 0 ? (
              <div className="py-6 text-center">
                <PawPrint className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <p className="mt-2 text-sm text-muted-foreground">No pets added yet</p>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link href="/dashboard/pets/new">Add your first pet</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {pets.slice(0, 4).map((pet) => (
                  <li key={pet.id}>
                    <Link
                      href={`/dashboard/pets/view?id=${pet.id}`}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                    >
                      {pet.profileImageUrl ? (
                        <img
                          src={pet.profileImageUrl}
                          alt={pet.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                          <PawPrint className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{pet.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {pet.breed ?? pet.species}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
                {pets.length > 4 && (
                  <li>
                    <Link href="/dashboard/pets" className="text-sm text-primary hover:underline">
                      View all {pets.length} pets →
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-xl font-bold">Recent Reports</h2>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/dashboard/reports/new">
                <Plus className="h-4 w-4" />
                Upload
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentReports.length === 0 ? (
              <div className="py-6 text-center">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <p className="mt-2 text-sm text-muted-foreground">No medical reports uploaded</p>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link href="/dashboard/reports/new">Upload a report</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentReports.map((report) => (
                  <li key={report.id}>
                    <Link
                      href={`/dashboard/reports/view?id=${report.id}`}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.petName} · {report.visitDate.toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/dashboard/reports" className="text-sm text-primary hover:underline">
                    View all reports →
                  </Link>
                </li>
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <h2 className="text-xl font-bold">Quick Actions</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/dashboard/pets/new">Add a Pet</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/reports/new">Upload Report</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/reminders/new">Set a Reminder</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/vaccinations/setup">Set Up Vaccines</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/quiz">Take the Breed Quiz</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/breeds">Explore Breeds</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
