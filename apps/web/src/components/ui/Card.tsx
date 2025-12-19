import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn("rounded-lg border border-black/10 bg-surface", className)}
      {...props}
    />
  );
}

