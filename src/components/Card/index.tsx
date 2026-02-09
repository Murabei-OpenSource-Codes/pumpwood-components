import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

/**
 * A Card component system for displaying content in boxes.
 *
 * @example
 * ```tsx
 * <Card.Root>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card Description</Card.Description>
 *   </Card.Header>
 *   <Card.Content>
 *     <p>Card Content</p>
 *   </Card.Content>
 * </Card.Root>
 * ```
 */
export const PumpwoodCard = {
    Root: Card,
    Content: CardContent,
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
}