import type { CompanyResponse } from '../types';

const STORAGE_KEY = 'sb_company_profile';

export function loadCompanyProfileFromStorage(): CompanyResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CompanyResponse;
  } catch {
    return null;
  }
}

export function saveCompanyProfileToStorage(profile: CompanyResponse): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore storage errors
  }
}

export function mergeAndSaveCompanyProfile(
  partial: Partial<CompanyResponse>
): CompanyResponse | null {
  const existing = loadCompanyProfileFromStorage();
  if (existing) {
    const merged: CompanyResponse = {
      id: partial.id ?? existing.id,
      name: partial.name ?? existing.name,
      about: partial.about ?? existing.about,
      logoUrl: partial.logoUrl !== undefined ? partial.logoUrl : existing.logoUrl,
      bannerUrl: partial.bannerUrl !== undefined ? partial.bannerUrl : existing.bannerUrl,
      activities: partial.activities ?? existing.activities,
      sector: partial.sector ?? existing.sector,
      headOfficeLocation: partial.headOfficeLocation ?? existing.headOfficeLocation,
      technologies: partial.technologies ?? existing.technologies,
      yearEstablished:
        partial.yearEstablished !== undefined ? partial.yearEstablished : existing.yearEstablished,
      hasOfficesInBulgaria: partial.hasOfficesInBulgaria ?? existing.hasOfficesInBulgaria,
      bulgarianOfficeLocations:
        partial.bulgarianOfficeLocations !== undefined
          ? partial.bulgarianOfficeLocations
          : existing.bulgarianOfficeLocations,
      employeesInBulgaria:
        partial.employeesInBulgaria !== undefined
          ? partial.employeesInBulgaria
          : existing.employeesInBulgaria,
      employeesWorldwide: partial.employeesWorldwide ?? existing.employeesWorldwide,
      whyWorkWithUs:
        partial.whyWorkWithUs !== undefined ? partial.whyWorkWithUs : existing.whyWorkWithUs,
      websiteUrl: partial.websiteUrl ?? existing.websiteUrl,
      contactName: partial.contactName ?? existing.contactName,
      contactEmail: partial.contactEmail ?? existing.contactEmail,
      contactPhone: partial.contactPhone ?? existing.contactPhone,
      auth0UserId: partial.auth0UserId ?? existing.auth0UserId,
      createdAt: partial.createdAt ?? existing.createdAt,
      updatedAt: partial.updatedAt !== undefined ? partial.updatedAt : existing.updatedAt,
    };
    saveCompanyProfileToStorage(merged);
    return merged;
  }

  // No existing profile in storage; only save if we have at least an id
  if (partial.id) {
    const initial: CompanyResponse = {
      id: partial.id,
      name: partial.name ?? '',
      about: partial.about ?? '',
      logoUrl: partial.logoUrl ?? null,
      bannerUrl: partial.bannerUrl ?? null,
      activities: partial.activities ?? '',
      sector: partial.sector ?? '',
      headOfficeLocation: partial.headOfficeLocation ?? '',
      technologies: partial.technologies ?? '',
      yearEstablished: partial.yearEstablished ?? null,
      hasOfficesInBulgaria: partial.hasOfficesInBulgaria ?? false,
      bulgarianOfficeLocations: partial.bulgarianOfficeLocations ?? null,
      employeesInBulgaria: partial.employeesInBulgaria ?? null,
      employeesWorldwide: partial.employeesWorldwide ?? 0,
      whyWorkWithUs: partial.whyWorkWithUs ?? null,
      websiteUrl: partial.websiteUrl ?? '',
      contactName: partial.contactName ?? '',
      contactEmail: partial.contactEmail ?? '',
      contactPhone: partial.contactPhone ?? '',
      auth0UserId: partial.auth0UserId ?? '',
      createdAt: partial.createdAt ?? new Date().toISOString(),
      updatedAt: partial.updatedAt ?? null,
    };
    saveCompanyProfileToStorage(initial);
    return initial;
  }
  return null;
}

export function clearCompanyProfileStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
