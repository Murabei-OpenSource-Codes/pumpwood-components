/** Shared visual tokens for form field triggers (Input, Select, etc.). */

export const fieldTriggerClassName =
    "flex h-10 w-full items-center rounded-md border border-input " +
    "bg-background px-3 text-sm font-normal shadow-none " +
    "hover:bg-[hsl(var(--hover-ring))] hover:border-[hsl(var(--focus-ring))] " +
    "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 " +
    "focus-visible:border-[hsl(var(--focus-ring))] " +
    "disabled:cursor-not-allowed disabled:opacity-50";

export const fieldTriggerPlaceholderClassName = "text-muted-foreground";

export const fieldTriggerIconClassName =
    "size-4 shrink-0 text-muted-foreground opacity-50";

export const fieldOptionClassName =
    "data-[selected=true]:bg-secondary " +
    "data-[selected=true]:text-secondary-foreground";
