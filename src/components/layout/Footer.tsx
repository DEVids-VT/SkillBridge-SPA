import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t } = useTranslation('layout');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: t('layoutPage.footer.socialLinks.github'), icon: Github, href: '#' },
    { name: t('layoutPage.footer.socialLinks.linkedin'), icon: Linkedin, href: '#' },
    { name: t('layoutPage.footer.socialLinks.twitter'), icon: Twitter, href: '#' },
  ];

  return (
    <footer className="mt-auto border-t border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {t('layoutPage.footer.appName')} -{' '}
            {t('layoutPage.footer.copyright')}
          </p>

          <div className="flex gap-2">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild className="rounded-full">
                <a
                  href={link.href}
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
