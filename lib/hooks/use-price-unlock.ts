"use client";

import { useState, useEffect } from "react";
import { storeContactData } from "@/lib/data/contacts";

interface ContactData {
  email: string;
  mobile: string;
  allowCalls: boolean;
  timestamp: number;
}

const STORAGE_KEY = "pawmatch_contact_data";
const EXPIRY_DAYS = 30; // Contact data expires after 30 days
const STORAGE_EVENT = "pawmatch_contact_data_change";

export function usePriceUnlock() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load contact data from localStorage on mount
  useEffect(() => {
    const loadContactData = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data: ContactData = JSON.parse(stored);
          const now = Date.now();
          const expiryTime = data.timestamp + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);

          if (now < expiryTime) {
            setContactData(data);
          } else {
            // Expired, remove from storage
            localStorage.removeItem(STORAGE_KEY);
            setContactData(null);
          }
        }
      } catch (error) {
        console.error("Error loading contact data:", error);
        localStorage.removeItem(STORAGE_KEY);
        setContactData(null);
      }
    };

    loadContactData();

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        loadContactData();
      }
    };

    // Listen for custom events from same tab
    const handleCustomEvent = () => {
      loadContactData();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(STORAGE_EVENT, handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(STORAGE_EVENT, handleCustomEvent);
    };
  }, []);

  const unlockPrice = async (data: { email: string; mobile: string; allowCalls?: boolean }) => {
    console.log("unlockPrice called with data:", data);
    const contactData: ContactData = {
      email: data.email,
      mobile: data.mobile,
      allowCalls: data.allowCalls ?? false,
      timestamp: Date.now(),
    };

    console.log("Contact data being saved:", contactData);
    setContactData(contactData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactData));

    // Dispatch custom event to notify other components in the same tab
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT));

    // Store in Firebase for marketing purposes
    try {
      await storeContactData({
        email: data.email,
        mobile: data.mobile,
        allowCalls: data.allowCalls ?? false,
        source: "marketplace_price_unlock",
      });
      console.log("Contact data stored in Firebase successfully");
    } catch (error) {
      console.error("Failed to store contact data in Firebase:", error);
      // Continue with local storage even if Firebase fails
    }
  };

  const requestPriceUnlock = () => {
    if (!contactData) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  const isPriceUnlocked = () => {
    return contactData !== null;
  };

  return {
    contactData,
    showModal,
    setShowModal,
    unlockPrice,
    requestPriceUnlock,
    isPriceUnlocked,
  };
}