import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, X } from 'lucide-react';
import { colors } from '@/lib/design-system';

interface CandidateFormStep2Props {
  formData: {
    profilePicture: File | null;
    externalLink: string;
  };
  errors: {
    profilePicture: boolean;
    externalLink: boolean;
  };
  onFieldChange: (field: string, value: string) => void;
  onProfilePictureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CandidateFormStep2({ formData, errors, onFieldChange, onProfilePictureChange }: CandidateFormStep2Props) {
  const { t } = useTranslation('welcome');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle profile picture change and create preview
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      onProfilePictureChange(event);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Remove profile picture
  const removeProfilePicture = () => {
    onProfilePictureChange({ target: { files: null } } as React.ChangeEvent<HTMLInputElement>);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Upload Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium" style={{ color: colors.white }}>
          {t('welcome.candidateForm.profilePicture')}
          <span className="text-xs ml-1" style={{ color: colors.textSecondary }}>
            ({t('welcome.candidateForm.optional')})
          </span>
        </Label>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={previewUrl || (formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : '/images/avatar-placeholder.jpg')}
              alt="Profile preview"
              className="w-16 h-16 rounded-full border-2 object-cover"
              style={{ borderColor: colors.white }}
            />
            <div>
              <p className="text-sm font-medium" style={{ color: colors.white }}>
                {t('welcome.candidateForm.profilePicture')}
              </p>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {formData.profilePicture ? formData.profilePicture.name : t('welcome.candidateForm.profilePictureUploadText')}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {formData.profilePicture && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                style={{ 
                  borderColor: colors.red, 
                  color: colors.red, 
                  backgroundColor: 'transparent' 
                }}
                onClick={removeProfilePicture}
              >
                <X className="h-4 w-4 mr-1" />
                Remove
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              style={{ 
                borderColor: colors.blue, 
                color: colors.white, 
                backgroundColor: 'transparent' 
              }}
              onClick={() => document.getElementById('profile-picture-upload')?.click()}
            >
              {formData.profilePicture ? t('welcome.candidateForm.changePicture') : t('welcome.candidateForm.uploadPicture')}
            </Button>
          </div>
        </div>

        <input
          id="profile-picture-upload"
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="hidden"
        />
        
        {errors.profilePicture && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            {t('welcome.candidateForm.profilePictureInvalid')}
          </div>
        )}
      </div>

      {/* External Link Field */}
      <div className="space-y-2">
        <Label htmlFor="externalLink" className="text-sm font-medium" style={{ color: colors.white }}>
          {t('welcome.candidateForm.externalLink')}
          <span className="text-xs ml-1" style={{ color: colors.textSecondary }}>
            ({t('welcome.candidateForm.optional')})
          </span>
        </Label>
        <Input
          id="externalLink"
          type="url"
          value={formData.externalLink}
          onChange={(e) => onFieldChange('externalLink', e.target.value)}
          placeholder={t('welcome.candidateForm.placeholders.externalLink')}
          className={`w-full ${errors.externalLink ? 'border-red-500' : ''}`}
          style={{ 
            backgroundColor: colors.blueDark, 
            borderColor: errors.externalLink ? '#ef4444' : colors.blue,
            color: colors.white 
          }}
        />
        {errors.externalLink && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            {t('welcome.candidateForm.externalLinkInvalid')}
          </div>
        )}
        <p className="text-xs" style={{ color: colors.textSecondary }}>
          {t('welcome.candidateForm.externalLinkHelp')}
        </p>
      </div>
    </div>
  );
}

export default CandidateFormStep2;
