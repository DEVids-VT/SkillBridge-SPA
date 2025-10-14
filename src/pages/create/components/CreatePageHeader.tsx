interface CreatePageHeaderProps {
  title1: string;
  title2: string;
  subtitle: string;
}

export default function CreatePageHeader({ title1, title2, subtitle }: CreatePageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
        <span className="text-accent">{title1}</span>{' '}
        <span className="text-foreground">{title2}</span>
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}
