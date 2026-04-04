import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Phone, Mail, MapPin, CheckCircle2, Package, Truck } from "lucide-react";
import { STORE_TYPE_LABELS } from "@/types/vendor";
import type { Store as StoreType } from "@/types/vendor";

interface VendorDetailsCardProps {
  store: StoreType;
  pickupAvailable?: boolean;
  deliveryAvailable?: boolean;
  className?: string;
}

export function VendorDetailsCard({
  store,
  pickupAvailable,
  deliveryAvailable,
  className,
}: VendorDetailsCardProps) {
  return (
    <Card className={`p-5 space-y-4 ${className ?? ""}`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        {store.logoUrl ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border bg-muted">
            <Image src={store.logoUrl} alt={store.storeName} fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-primary/10">
            <Store className="h-6 w-6 text-primary" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold leading-tight">{store.storeName}</h3>
            {store.approvalStatus === "approved" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                <CheckCircle2 className="h-3 w-3" />
                Verified Seller
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {STORE_TYPE_LABELS[store.storeType]}
          </p>
          {store.ownerName && (
            <p className="text-xs text-muted-foreground">Owner: {store.ownerName}</p>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-2 text-sm">
        {store.phone && (
          <a
            href={`tel:${store.phone}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span>{store.phone}</span>
          </a>
        )}
        {store.email && (
          <a
            href={`mailto:${store.email}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{store.email}</span>
          </a>
        )}
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
          <div className="leading-snug">
            {store.address && <p>{store.address}</p>}
            <p>
              {[store.city, store.state].filter(Boolean).join(", ")}
              {store.postalCode && ` — ${store.postalCode}`}
            </p>
            {store.country && <p>{store.country}</p>}
          </div>
        </div>
      </div>

      {/* Delivery options (shown only when props provided) */}
      {(pickupAvailable !== undefined || deliveryAvailable !== undefined) && (
        <div className="flex flex-wrap gap-2 pt-1 border-t">
          {pickupAvailable && (
            <Badge variant="outline" className="gap-1 text-xs">
              <Package className="h-3 w-3" /> Pickup Available
            </Badge>
          )}
          {deliveryAvailable && (
            <Badge variant="outline" className="gap-1 text-xs">
              <Truck className="h-3 w-3" /> Delivery Available
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
}
