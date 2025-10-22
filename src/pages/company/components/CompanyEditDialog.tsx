import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CompanyResponse, UpdateCompanyRequest } from '../types';

interface CompanyEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: CompanyResponse;
  onSave: (changes: UpdateCompanyRequest) => Promise<void> | void;
  isSaving?: boolean;
}

export default function CompanyEditDialog({
  open,
  onOpenChange,
  company,
  onSave,
  isSaving = false,
}: CompanyEditDialogProps) {
  const [form, setForm] = useState(() => initializeForm(company));

  useEffect(() => {
    if (open) {
      setForm(initializeForm(company));
    }
  }, [open, company]);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const changes = buildChanges(company, form);
    if (Object.keys(changes).length === 0) {
      onOpenChange(false);
      return;
    }
    await onSave(changes);
    onOpenChange(false);
  };

  const showBgFields = useMemo(() => form.hasOfficesInBulgaria === 'true', [form.hasOfficesInBulgaria]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit company details</DialogTitle>
          <DialogDescription>Update your company's public profile information.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2">
          <div className="space-y-2">
            <Label htmlFor="name">Company name</Label>
            <Input id="name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Input id="sector" value={form.sector} onChange={(e) => handleChange('sector', e.target.value)} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="about">About</Label>
            <Textarea id="about" value={form.about} onChange={(e) => handleChange('about', e.target.value)} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="activities">Activities</Label>
            <Textarea
              id="activities"
              value={form.activities}
              onChange={(e) => handleChange('activities', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headOfficeLocation">Head office location</Label>
            <Input
              id="headOfficeLocation"
              value={form.headOfficeLocation}
              onChange={(e) => handleChange('headOfficeLocation', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Textarea
              id="technologies"
              value={form.technologies}
              onChange={(e) => handleChange('technologies', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearEstablished">Year established</Label>
            <Input
              id="yearEstablished"
              inputMode="numeric"
              value={form.yearEstablished}
              onChange={(e) => handleChange('yearEstablished', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Has offices in Bulgaria</Label>
            <Select value={form.hasOfficesInBulgaria} onValueChange={(v) => handleChange('hasOfficesInBulgaria', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showBgFields && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bulgarianOfficeLocations">Bulgarian office locations</Label>
              <Textarea
                id="bulgarianOfficeLocations"
                value={form.bulgarianOfficeLocations}
                onChange={(e) => handleChange('bulgarianOfficeLocations', e.target.value)}
              />
            </div>
          )}

          {showBgFields && (
            <div className="space-y-2">
              <Label htmlFor="employeesInBulgaria">Employees in Bulgaria</Label>
              <Input
                id="employeesInBulgaria"
                inputMode="numeric"
                value={form.employeesInBulgaria}
                onChange={(e) => handleChange('employeesInBulgaria', e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="employeesWorldwide">Employees worldwide</Label>
            <Input
              id="employeesWorldwide"
              inputMode="numeric"
              value={form.employeesWorldwide}
              onChange={(e) => handleChange('employeesWorldwide', e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="whyWorkWithUs">Why work with us</Label>
            <Textarea
              id="whyWorkWithUs"
              value={form.whyWorkWithUs}
              onChange={(e) => handleChange('whyWorkWithUs', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website</Label>
            <Input id="websiteUrl" value={form.websiteUrl} onChange={(e) => handleChange('websiteUrl', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactName">Contact name</Label>
            <Input id="contactName" value={form.contactName} onChange={(e) => handleChange('contactName', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input id="contactEmail" value={form.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact phone</Label>
            <Input id="contactPhone" value={form.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function initializeForm(company: CompanyResponse) {
  return {
    name: company.name ?? '',
    about: company.about ?? '',
    activities: company.activities ?? '',
    sector: company.sector ?? '',
    headOfficeLocation: company.headOfficeLocation ?? '',
    technologies: company.technologies ?? '',
    yearEstablished: company.yearEstablished != null ? String(company.yearEstablished) : '',
    hasOfficesInBulgaria: String(Boolean(company.hasOfficesInBulgaria)),
    bulgarianOfficeLocations: company.bulgarianOfficeLocations ?? '',
    employeesInBulgaria:
      company.employeesInBulgaria != null ? String(company.employeesInBulgaria) : '',
    employeesWorldwide: company.employeesWorldwide != null ? String(company.employeesWorldwide) : '',
    whyWorkWithUs: company.whyWorkWithUs ?? '',
    websiteUrl: company.websiteUrl ?? '',
    contactName: company.contactName ?? '',
    contactEmail: company.contactEmail ?? '',
    contactPhone: company.contactPhone ?? '',
  } as const;
}

function buildChanges(company: CompanyResponse, form: ReturnType<typeof initializeForm>): UpdateCompanyRequest {
  const changes: UpdateCompanyRequest = {};

  const setIfChanged = <K extends keyof UpdateCompanyRequest>(key: K, newVal: UpdateCompanyRequest[K]) => {
    // @ts-expect-error indexing for comparison
    const oldVal = company[key];
    if (newVal !== oldVal) {
      changes[key] = newVal as any;
    }
  };

  if (form.name !== company.name) setIfChanged('name', form.name.trim());
  if (form.about !== (company.about ?? '')) setIfChanged('about', form.about.trim());
  if (form.activities !== (company.activities ?? '')) setIfChanged('activities', form.activities.trim());
  if (form.sector !== (company.sector ?? '')) setIfChanged('sector', form.sector.trim());
  if (form.headOfficeLocation !== (company.headOfficeLocation ?? ''))
    setIfChanged('headOfficeLocation', form.headOfficeLocation.trim());
  if (form.technologies !== (company.technologies ?? '')) setIfChanged('technologies', form.technologies.trim());

  const yearEstablished = form.yearEstablished ? Number(form.yearEstablished) : undefined;
  if ((yearEstablished ?? undefined) !== (company.yearEstablished ?? undefined))
    setIfChanged('yearEstablished', yearEstablished);

  const hasBg = form.hasOfficesInBulgaria === 'true';
  if (hasBg !== company.hasOfficesInBulgaria) setIfChanged('hasOfficesInBulgaria', hasBg);

  const employeesInBg = form.employeesInBulgaria ? Number(form.employeesInBulgaria) : undefined;
  if ((employeesInBg ?? undefined) !== (company.employeesInBulgaria ?? undefined))
    setIfChanged('employeesInBulgaria', employeesInBg);

  const employeesWorldwide = form.employeesWorldwide ? Number(form.employeesWorldwide) : undefined;
  if ((employeesWorldwide ?? undefined) !== (company.employeesWorldwide ?? undefined))
    setIfChanged('employeesWorldwide', employeesWorldwide);

  if ((form.whyWorkWithUs ?? '') !== (company.whyWorkWithUs ?? ''))
    setIfChanged('whyWorkWithUs', form.whyWorkWithUs.trim());

  if (form.websiteUrl !== (company.websiteUrl ?? '')) setIfChanged('websiteUrl', form.websiteUrl.trim());
  if (form.contactName !== (company.contactName ?? '')) setIfChanged('contactName', form.contactName.trim());
  if (form.contactEmail !== (company.contactEmail ?? '')) setIfChanged('contactEmail', form.contactEmail.trim());
  if (form.contactPhone !== (company.contactPhone ?? '')) setIfChanged('contactPhone', form.contactPhone.trim());

  // If hasOfficesInBulgaria is false, drop bg-specific fields if present
  if (!hasBg) {
    if ('bulgarianOfficeLocations' in changes) delete changes.bulgarianOfficeLocations;
    if ('employeesInBulgaria' in changes) delete changes.employeesInBulgaria;
  } else {
    if ((form.bulgarianOfficeLocations ?? '') !== (company.bulgarianOfficeLocations ?? ''))
      setIfChanged('bulgarianOfficeLocations', form.bulgarianOfficeLocations.trim());
  }

  return changes;
}


