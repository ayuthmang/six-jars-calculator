import { cn } from "@/lib/utils";

export function TypographyH1({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "mt-10 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyP({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
  );
}
