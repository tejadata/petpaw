"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/shared/empty-state";
import { ReminderCard } from "@/components/dashboard/reminders/reminder-card";
import { useAuth } from "@/lib/auth-context";
import {
  getReminders,
  deleteReminder,
  markReminderComplete,
  markReminderIncomplete,
} from "@/lib/data/reminders";
import { getPetsByUser } from "@/lib/data/pets";
import type { Reminder } from "@/types/reminder";
import type { Pet } from "@/types/pet";

export default function RemindersPage() {
  const { user, loading: authLoading } = useAuth();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPet, setFilterPet] = useState("all");

  useEffect(() => {
    if (authLoading || !user) return;
    Promise.all([getReminders(user.uid), getPetsByUser(user.uid)]).then(
      ([r, p]) => {
        setReminders(r);
        setPets(p);
        setLoading(false);
      }
    );
  }, [user, authLoading]);

  async function handleToggle(id: string, completed: boolean) {
    if (completed) {
      await markReminderComplete(id);
    } else {
      await markReminderIncomplete(id);
    }
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed } : r))
    );
  }

  async function handleDelete(id: string) {
    await deleteReminder(id);
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  const now = new Date();
  const filtered =
    filterPet === "all" ? reminders : reminders.filter((r) => r.petId === filterPet);

  const upcoming = filtered.filter((r) => !r.completed && r.scheduledDate >= now);
  const overdue = filtered.filter((r) => !r.completed && r.scheduledDate < now);
  const completedList = filtered.filter((r) => r.completed);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reminders</h1>
          <p className="mt-1 text-muted-foreground">
            Track vet visits, medications, grooming, and more.
          </p>
        </div>
        <Button asChild className="gap-1">
          <Link href="/dashboard/reminders/new">
            <Plus className="h-4 w-4" />
            Add Reminder
          </Link>
        </Button>
      </div>

      {pets.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilterPet("all")}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${filterPet === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            All
          </button>
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setFilterPet(pet.id)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${filterPet === pet.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
            >
              {pet.name}
            </button>
          ))}
        </div>
      )}

      {overdue.length > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            <strong>{overdue.length}</strong> overdue reminder{overdue.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <Tabs defaultValue="upcoming" className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="overdue" className={overdue.length > 0 ? "text-red-600" : ""}>
            Overdue ({overdue.length})
          </TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedList.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          {upcoming.length === 0 ? (
            <EmptyState title="No upcoming reminders" description="Add reminders for vet visits, medication, grooming, and more." className="mt-4" />
          ) : (
            <div className="space-y-3">
              {upcoming.map((r) => (
                <ReminderCard key={r.id} reminder={r} userEmail={user?.email} userName={user?.displayName} onToggleComplete={handleToggle} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="mt-4">
          {overdue.length === 0 ? (
            <EmptyState title="No overdue reminders" description="Great — you're all caught up!" className="mt-4" />
          ) : (
            <div className="space-y-3">
              {overdue.map((r) => (
                <ReminderCard key={r.id} reminder={r} userEmail={user?.email} userName={user?.displayName} onToggleComplete={handleToggle} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {completedList.length === 0 ? (
            <EmptyState title="No completed reminders" description="Completed reminders will appear here." className="mt-4" />
          ) : (
            <div className="space-y-3">
              {completedList.map((r) => (
                <ReminderCard key={r.id} reminder={r} userEmail={user?.email} userName={user?.displayName} onToggleComplete={handleToggle} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
