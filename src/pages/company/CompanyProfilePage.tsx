import { useState } from 'react';
import { colors } from '@/lib/design-system';
import EditModal from '@/components/ui/EditProfileModal';
import {
  CompanyInformationSection,
  CompanySubscriptionSection,
  CompanySystemSection,
} from './components';
import { useCompanyProfile, useUpdateCompanyProfile } from './hooks/useCompanyProfile';
import { mergeAndSaveCompanyProfile } from './hooks/companyProfileStorage';
import { CompanyResponse, UpdateCompanyRequest } from './types';

export default function CompanyProfilePage() {
  const { data: company, isLoading, error } = useCompanyProfile();
  const updateCompanyMutation = useUpdateCompanyProfile();

  const [editField, setEditField] = useState<null | {
    field: keyof CompanyResponse;
    title: string;
    type: 'text' | 'textarea' | 'number' | 'boolean';
  }>(null);

  const [subscription] = useState({
    current: 'Demo Plan',
    description: 'Full access to all features and premium support',
    upcoming: 'AI-Powered Analytics (Coming Soon)',
    upcomingDescription: 'Advanced AI insights and predictive analytics',
  });

  const [theme, setTheme] = useState('system');

  const handleEditField = (field: {
    field: keyof CompanyResponse;
    title: string;
    type: string;
  }) => {
    const validType = field.type as 'text' | 'textarea' | 'number' | 'boolean';
    setEditField({ field: field.field, title: field.title, type: validType });
  };

  const handleSave = async (newValue: string) => {
    if (!editField || !company) return;

    let processedValue: string | number | boolean = newValue;

    // Process value based on field type
    if (editField.type === 'number') {
      processedValue = Number(newValue);
    } else if (editField.type === 'boolean') {
      processedValue = newValue.toLowerCase() === 'true' || newValue === '1';
    }

    const updateData: UpdateCompanyRequest = {
      [editField.field]: processedValue,
    };

    try {
      const updatedCompany = await updateCompanyMutation.mutateAsync({
        id: company.id,
        data: updateData,
      });

      // Merge the updated data into local storage
      mergeAndSaveCompanyProfile({
        id: updatedCompany.id,
        [editField.field]: processedValue,
      } as Partial<CompanyResponse>);

      setEditField(null);
    } catch (error) {
      console.error('Failed to update company:', error);
      // You could add a toast notification here
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: colors.dark }}
      >
        <div className="text-white">Loading company profile...</div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: colors.dark }}
      >
        <div className="text-white">Failed to load company profile. Please try again.</div>
      </div>
    );
  }

  return (
    <div
      className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-96"
      style={{ backgroundColor: colors.dark, color: colors.white }}
    >
      <CompanyInformationSection company={company} onEditField={handleEditField} />

      <CompanySubscriptionSection subscription={subscription} />

      <CompanySystemSection theme={theme} onThemeChange={setTheme} />

      {/* Modal */}
      <EditModal
        isOpen={!!editField}
        onClose={() => setEditField(null)}
        title={editField?.title || ''}
        initialValue={editField ? String(company[editField.field] || '') : ''}
        onSave={handleSave}
        renderField={(value: string, setValue: (val: string) => void) => {
          if (editField?.type === 'textarea') {
            return (
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full bg-transparent border border-[${colors.blue}] px-2 py-1 rounded min-h-[100px]`}
                placeholder="Enter value..."
              />
            );
          }
          if (editField?.type === 'number') {
            return (
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full bg-transparent border border-[${colors.blue}] px-2 py-1 rounded`}
                placeholder="Enter number..."
              />
            );
          }
          if (editField?.type === 'boolean') {
            return (
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full bg-transparent border border-[${colors.blue}] px-2 py-1 rounded`}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            );
          }
          return (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className={`w-full bg-transparent border border-[${colors.blue}] px-2 py-1 rounded`}
              placeholder="Enter value..."
            />
          );
        }}
      />
    </div>
  );
}
