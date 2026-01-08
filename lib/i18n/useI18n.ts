"use client";

import { useCallback, useMemo } from "react";
import { getMessages, type Locale, type Messages } from "./index";

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".").filter(Boolean);
  let cur: any = obj;
  for (const part of parts) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`)
  );
}

export function useI18n(locale: Locale = "en") {
  const m: Messages = useMemo(() => getMessages(locale), [locale]);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const value = getByPath(m, path);
      if (typeof value === "string") return interpolate(value, vars);
      if (value == null) return "";
      return String(value);
    },
    [m]
  );

  return { locale, m, t };
}
