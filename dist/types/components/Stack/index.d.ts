import { type HTMLAttributes, type ReactNode } from "react";
/**
 * A layout component that arranges children in a stack (vertical or horizontal).
 *
 * When `onClick` is provided, the stack receives `role="button"`, `tabIndex={0}`,
 * and responds to Enter and Space keys. Provide visible text or pass `aria-label`
 * via props for accessibility.
 *
 * @example
 * ```tsx
 * <Stack direction="row" gap={4}>
 *   <Button>Btn 1</Button>
 *   <Button>Btn 2</Button>
 * </Stack>
 * ```
 */
declare const Stack: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    /** The direction of the stack. Defaults to 'col'. */
    direction?: "row" | "col";
    /** The gap between elements. Maps to Tailwind gap utility (e.g. 4 -> gap-4). */
    gap?: number;
    /** Click handler. When set, the stack becomes keyboard-accessible (role="button"). */
    onClick?: () => void;
    className?: string;
} & import("react").RefAttributes<HTMLDivElement>>;
export default Stack;
