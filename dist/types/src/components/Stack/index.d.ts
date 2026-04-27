import type { HTMLAttributes, ReactNode } from "react";
type StackProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    /** The direction of the stack. Defaults to 'col'. */
    direction?: "row" | "col";
    /** The gap between elements. Maps to Tailwind gap utility (e.g. 4 -> gap-4). */
    gap?: number;
    className?: string;
};
/**
 * A layout component that arranges children in a stack (vertical or horizontal).
 *
 * @example
 * ```tsx
 * <Stack direction="row" gap={4}>
 *   <Button>Btn 1</Button>
 *   <Button>Btn 2</Button>
 * </Stack>
 * ```
 */
declare function Stack({ children, direction, gap, className, ...props }: StackProps): import("react/jsx-runtime").JSX.Element;
export default Stack;
