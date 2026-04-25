import { ShieldCheck } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export function EthicalBreedingNotice() {
  return (
    <div className="rounded-lg border-2 border-blue-400 bg-blue-600 p-4">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
        <div className="text-sm text-white">
          <p className="font-bold text-base">Ethical Breeding Guidelines</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-blue-50">
            <li>All puppies should have up-to-date vaccinations and deworming records.</li>
            <li>Health certificates from a licensed veterinarian are strongly recommended.</li>
            <li>Puppies should not be separated from their mother before 4 to 8 weeks of age.</li>
            <li>Provide accurate breed information and disclose any known health conditions.</li>
            <li>Ensure safe and humane living conditions for all animals.</li>
          </ul>
          <p className="mt-2 text-xs text-blue-100 font-medium">
            {APP_NAME} reserves the right to remove listings that do not comply with ethical breeding standards.
          </p>
        </div>
      </div>
    </div>
  );
}
