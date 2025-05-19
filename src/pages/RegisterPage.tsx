import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { RoutePage } from '@/types/enums/RoutePage';

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setError(null);

    try {
      // In a real app, you would send a request to your backend/Auth0
      // For demo purposes, we'll simulate a successful registration

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to welcome page after successful registration
      navigate(RoutePage.WELCOME);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div>
      <div className="container flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              {t('registerTitle', 'Create an Account')}
            </CardTitle>
            <CardDescription>
              {t('registerDescription', 'Enter your information to create an account')}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 p-3 rounded border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username">{t('username', 'Username')}</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('email', 'Email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('password', 'Password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isRegistering}>
                {isRegistering
                  ? t('registering', 'Registering...')
                  : t('submitRegister', 'Register')}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                {t('alreadyHaveAccount', 'Already have an account?')}{' '}
                <Link to="/login" className="text-primary-500 hover:underline">
                  {t('login', 'Login')}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default RegisterPage;
