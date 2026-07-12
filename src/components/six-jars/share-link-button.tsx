"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSixJarsContext } from "./six-jars-provider";
import { encodeConfigParam, SHARE_PARAM } from "./six-jars-url";

export function ShareLinkButton() {
  const { state } = useSixJarsContext();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const { origin, pathname } = window.location;
    const url = `${origin}${pathname}?${SHARE_PARAM}=${encodeConfigParam(state.config)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions, insecure context) — nothing to do.
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? "Copied ✓" : "Copy link"}
    </Button>
  );
}
