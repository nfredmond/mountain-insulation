import { cn } from "@/lib/cn";
import { Container } from "@/components/site/Container";

type Props = React.HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
};

export function Section({
  className,
  containerClassName,
  children,
  ...props
}: Props) {
  return (
    <section className={cn("py-14 sm:py-16", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

