// Types related to the AboutPage components

import { JSX } from 'react';

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface CoreValue {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
