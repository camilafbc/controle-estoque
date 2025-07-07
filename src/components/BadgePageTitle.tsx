interface BadgePageTitleProps {
  title: string;
}

export default function BadgePageTitle({ title }: BadgePageTitleProps) {
  return <h2 className="mt-4 text-lg font-bold md:text-2xl">{title}</h2>;
}
