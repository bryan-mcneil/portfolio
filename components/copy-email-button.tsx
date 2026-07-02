"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" size="lg" onClick={copy} className="font-mono">
      {copied ? (
        <Check data-icon="inline-start" className="text-emerald-500" />
      ) : (
        <Copy data-icon="inline-start" />
      )}
      {copied ? "Copied" : site.email}
    </Button>
  );
}
