"use client";

import { type MouseEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { PriceUnlockModal } from "@/components/marketplace/price-unlock-modal";
import { usePriceUnlock } from "@/lib/hooks/use-price-unlock";
import { formatCurrencyInr } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface PriceDisplayProps {
  price: number;
  salePrice?: number | null;
  className?: string;
  showButton?: boolean;
  buttonOnly?: boolean;
}

export function PriceDisplay({
  price,
  salePrice,
  className = "",
  showButton = true,
  buttonOnly = false,
}: PriceDisplayProps) {
  const {
    isPriceUnlocked,
    requestPriceUnlock,
    unlockPrice,
    showModal,
    setShowModal,
  } = usePriceUnlock();
  const [loading, setLoading] = useState(false);

  const handleUnlockClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!requestPriceUnlock()) {
      return;
    }
  };

  const handleModalSuccess = async (data: {
    email: string;
    mobile: string;
    allowCalls?: boolean;
  }) => {
    setLoading(true);
    try {
      const contactData = {
        email: data.email,
        mobile: data.mobile,
        allowCalls: data.allowCalls ?? false,
      };
      console.log("Contact data collected:", contactData);
      await unlockPrice(contactData);
    } finally {
      setLoading(false);
    }
  };

  if (!isPriceUnlocked()) {
    return (
      <>
        <div className={`flex items-center gap-2 ${className}`}>
          {!buttonOnly && (
            <span className="text-lg font-bold text-muted-foreground">
              Price Hidden
            </span>
          )}
          {showButton && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={(event) => handleUnlockClick(event)}
              className="h-8 px-3"
            >
              <Eye className="mr-1.5 h-3 w-3" />
              View Price
            </Button>
          )}
        </div>

        <PriceUnlockModal
          open={showModal}
          onOpenChange={setShowModal}
          onSuccess={handleModalSuccess}
          loading={loading}
        />
      </>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {salePrice != null ? (
        <>
          <span className="text-lg font-bold text-primary">
            {formatCurrencyInr(salePrice)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatCurrencyInr(price)}
          </span>
        </>
      ) : (
        <span className="text-lg font-bold text-primary">
          {formatCurrencyInr(price)}
        </span>
      )}
      {showButton && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setShowModal(true);
          }}
          className="h-8 px-2"
          title="Update contact information"
        >
          <EyeOff className="h-3 w-3" />
        </Button>
      )}

      <PriceUnlockModal
        open={showModal}
        onOpenChange={setShowModal}
        onSuccess={handleModalSuccess}
        loading={loading}
      />
    </div>
  );
}
