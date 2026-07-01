export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

import * as LucideIcons from "lucide-react";
export function getIconComponent(iconName: string): any {
  return (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
}
