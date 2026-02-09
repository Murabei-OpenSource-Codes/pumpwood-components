"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * A set of layered sections of content—known as tab panels—that are displayed one at a time.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Content</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "pw:inline-flex pw:h-9 pw:items-center pw:justify-center pw:rounded-lg pw:bg-muted pw:p-1 pw:text-muted-foreground",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            "pw:inline-flex pw:items-center pw:justify-center pw:whitespace-nowrap pw:rounded-md pw:px-3 pw:py-1 pw:text-sm pw:font-medium pw:ring-offset-background pw:transition-all focus-visible:pw:outline-none focus-visible:pw:ring-2 focus-visible:pw:ring-ring focus-visible:pw:ring-offset-2 disabled:pw:pointer-events-none disabled:pw:opacity-50 data-[state=active]:pw:bg-[#0E2B63] data-[state=active]:pw:text-[#FFFFFF] data-[state=active]:pw:shadow",
            className
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "pw:mt-2 pw:ring-offset-background focus-visible:pw:outline-none focus-visible:pw:ring-2 focus-visible:pw:ring-ring focus-visible:pw:ring-offset-2",
            className
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
