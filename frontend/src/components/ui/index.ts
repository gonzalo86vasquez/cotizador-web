/**
 * CotizadorSAC UI Components
 *
 * A collection of reusable UI components built with a design system
 * inspired by Stripe, Vercel, and Linear.
 *
 * @example
 * ```tsx
 * import { Button, Card, Input, Badge, Container } from '@/components/ui';
 *
 * <Container size="default">
 *   <Card variant="default" padding="lg">
 *     <Input label="Email" placeholder="you@example.com" />
 *     <Button variant="primary">Submit</Button>
 *     <Badge variant="success">Active</Badge>
 *   </Card>
 * </Container>
 * ```
 */

// Core components
export { Button, type ButtonProps } from './Button';
export { Card, CardHeader, CardContent, CardFooter, type CardProps, type CardHeaderProps } from './Card';
export { Input, type InputProps } from './Input';
export { Badge, type BadgeProps } from './Badge';
export { Container, type ContainerProps } from './Container';
export {
  Skeleton,
  SkeletonCard,
  SkeletonProductCard,
  SkeletonAvatar,
  SkeletonButton,
  type SkeletonProps
} from './Skeleton';
