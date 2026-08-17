import type { HTMLAttributes, TimeHTMLAttributes } from "react";
interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
    defaultValue?: number;
    value?: number;
    onValueChange?: (value: number) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "steps" | "events";
}
declare function Timeline({ defaultValue, value, onValueChange, orientation, variant, className, children, ...props }: TimelineProps): React.JSX.Element;
declare function TimelineContent({ className, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element;
interface TimelineDateProps extends TimeHTMLAttributes<HTMLTimeElement> {
    asChild?: boolean;
}
declare function TimelineDate({ asChild, className, ...props }: TimelineDateProps): React.JSX.Element;
declare function TimelineHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): React.JSX.Element;
/** @deprecated Vertical timelines render the rail inside TimelineItem. */
declare function TimelineIndicator(_props: HTMLAttributes<HTMLDivElement>): null;
interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
    step: number;
}
declare function TimelineItem({ step, className, children, ...props }: TimelineItemProps): React.JSX.Element;
/** @deprecated Vertical timelines render the rail inside TimelineItem. */
declare function TimelineSeparator(_props: HTMLAttributes<HTMLDivElement>): null;
declare function TimelineTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): React.JSX.Element;
export { Timeline, TimelineContent, TimelineDate, TimelineHeader, TimelineIndicator, TimelineItem, TimelineSeparator, TimelineTitle, };
