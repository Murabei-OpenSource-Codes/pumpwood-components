import type { HTMLAttributes, ReactNode } from "react";
type TimelineRootProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};
declare function TimelineRoot({ children, className, ...props }: TimelineRootProps): React.JSX.Element;
type TimelineItemProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    isLast?: boolean;
};
declare function TimelineItem({ children, className, isLast, ...props }: TimelineItemProps): React.JSX.Element;
type TimelineIndicatorProps = HTMLAttributes<HTMLDivElement> & {
    isLast?: boolean;
};
declare function TimelineIndicator({ className, isLast, ...props }: TimelineIndicatorProps): React.JSX.Element;
type TimelineContentProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};
declare function TimelineContent({ children, className, ...props }: TimelineContentProps): React.JSX.Element;
type TimelineHeaderProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};
declare function TimelineHeader({ children, className, ...props }: TimelineHeaderProps): React.JSX.Element;
type TimelineBodyProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};
declare function TimelineBody({ children, className, ...props }: TimelineBodyProps): React.JSX.Element;
type TimelineMetaProps = HTMLAttributes<HTMLParagraphElement> & {
    children: ReactNode;
};
declare function TimelineMeta({ children, className, ...props }: TimelineMetaProps): React.JSX.Element;
/**
 * A Timeline component system for chronological event lists.
 *
 * @example
 * ```tsx
 * <PumpwoodTimeline.Root>
 *   <PumpwoodTimeline.Item isLast={false}>
 *     <PumpwoodTimeline.Indicator />
 *     <PumpwoodTimeline.Content>
 *       <PumpwoodTimeline.Header>
 *         <span>01/01/2024</span>
 *       </PumpwoodTimeline.Header>
 *       <PumpwoodTimeline.Body>Event description</PumpwoodTimeline.Body>
 *     </PumpwoodTimeline.Content>
 *   </PumpwoodTimeline.Item>
 * </PumpwoodTimeline.Root>
 * ```
 */
export declare const PumpwoodTimeline: {
    Root: typeof TimelineRoot;
    Item: typeof TimelineItem;
    Indicator: typeof TimelineIndicator;
    Content: typeof TimelineContent;
    Header: typeof TimelineHeader;
    Body: typeof TimelineBody;
    Meta: typeof TimelineMeta;
};
export {};
