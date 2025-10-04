import { Button } from '@/components/ui/button';
import { colors, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Tag, Globe, Mail, Phone, User } from 'lucide-react';
import { CompanyResponse } from '../types';

interface CompanyInformationSectionProps {
  company: CompanyResponse;
  onEditField: (field: { field: keyof CompanyResponse; title: string; type: string }) => void;
}

export default function CompanyInformationSection({
  company,
  onEditField,
}: CompanyInformationSectionProps) {
  return (
    <div className={`space-y-6 border-b pb-8 border-[${colors.blue}]`}>
      <h2 className={typography.heading[4]}>Company Information</h2>

      {/* Company Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={company.logoUrl || '/images/companies/default-logo.png'}
            alt="Company Logo"
            className={`w-16 h-16 rounded-full border-2 border-[${colors.white}]`}
          />
          <div>
            <p className="text-sm font-medium">Company Logo</p>
            <p className={typography.body.sm}>Upload or change your company logo</p>
          </div>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: 'logoUrl', title: 'Change logo URL', type: 'text' })}
        >
          Change logo
        </Button>
      </div>

      {/* Banner */}
      {company.bannerUrl && (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-medium">Banner Image</p>
            <img
              src={company.bannerUrl}
              alt="Company Banner"
              className="w-full h-32 object-cover rounded-lg mt-2"
            />
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
            onClick={() =>
              onEditField({ field: 'bannerUrl', title: 'Change banner URL', type: 'text' })
            }
          >
            Edit
          </Button>
        </div>
      )}

      {/* Company Name */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Company Name</p>
          <p className={typography.body.sm}>{company.name}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: 'name', title: 'Change company name', type: 'text' })}
        >
          Edit
        </Button>
      </div>

      {/* About */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">About</p>
          <p className={typography.body.sm}>{company.about}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
          onClick={() =>
            onEditField({ field: 'about', title: 'Change company about', type: 'textarea' })
          }
        >
          Edit
        </Button>
      </div>

      {/* Activities */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">Activities</p>
          <p className={typography.body.sm}>{company.activities}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
          onClick={() =>
            onEditField({ field: 'activities', title: 'Change activities', type: 'textarea' })
          }
        >
          Edit
        </Button>
      </div>

      {/* Sector */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Sector</p>
          <Badge className={`bg-[${colors.blue}] text-[${colors.white}]`}>{company.sector}</Badge>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: 'sector', title: 'Change sector', type: 'text' })}
        >
          Edit
        </Button>
      </div>

      {/* Head Office Location */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" style={{ color: colors.yellow }} />
          <div>
            <p className="text-sm font-medium">Head Office Location</p>
            <p className={typography.body.sm}>{company.headOfficeLocation}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() =>
            onEditField({
              field: 'headOfficeLocation',
              title: 'Change head office location',
              type: 'text',
            })
          }
        >
          Edit
        </Button>
      </div>

      {/* Technologies */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">Technologies</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {company.technologies.split(',').map((tech, idx) => (
              <Badge key={idx} className={`bg-[${colors.blue}] text-[${colors.white}]`}>
                <Tag className="h-3 w-3 mr-1" />
                {tech.trim()}
              </Badge>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
          onClick={() =>
            onEditField({
              field: 'technologies',
              title: 'Change technologies (comma-separated)',
              type: 'textarea',
            })
          }
        >
          Edit
        </Button>
      </div>

      {/* Year Established */}
      {company.yearEstablished && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" style={{ color: colors.yellow }} />
            <div>
              <p className="text-sm font-medium">Year Established</p>
              <p className={typography.body.sm}>{company.yearEstablished}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}]`}
            onClick={() =>
              onEditField({
                field: 'yearEstablished',
                title: 'Change year established',
                type: 'number',
              })
            }
          >
            Edit
          </Button>
        </div>
      )}

      {/* Bulgaria Office Information */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Has Offices in Bulgaria</p>
            <Badge
              className={
                company.hasOfficesInBulgaria
                  ? `bg-[${colors.success}] text-[${colors.white}]`
                  : `bg-[${colors.blue}] text-[${colors.white}]`
              }
            >
              {company.hasOfficesInBulgaria ? 'Yes' : 'No'}
            </Badge>
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}]`}
            onClick={() =>
              onEditField({
                field: 'hasOfficesInBulgaria',
                title: 'Has offices in Bulgaria',
                type: 'boolean',
              })
            }
          >
            Edit
          </Button>
        </div>

        {company.hasOfficesInBulgaria && company.bulgarianOfficeLocations && (
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm font-medium">Bulgarian Office Locations</p>
              <p className={typography.body.sm}>{company.bulgarianOfficeLocations}</p>
            </div>
            <Button
              variant="outline"
              className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
              onClick={() =>
                onEditField({
                  field: 'bulgarianOfficeLocations',
                  title: 'Change Bulgarian office locations',
                  type: 'textarea',
                })
              }
            >
              Edit
            </Button>
          </div>
        )}

        {company.hasOfficesInBulgaria && company.employeesInBulgaria && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: colors.yellow }} />
              <div>
                <p className="text-sm font-medium">Employees in Bulgaria</p>
                <p className={typography.body.sm}>{company.employeesInBulgaria} employees</p>
              </div>
            </div>
            <Button
              variant="outline"
              className={`border-[${colors.blue}] text-[${colors.white}]`}
              onClick={() =>
                onEditField({
                  field: 'employeesInBulgaria',
                  title: 'Change employees in Bulgaria',
                  type: 'number',
                })
              }
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      {/* Employees Worldwide */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" style={{ color: colors.yellow }} />
          <div>
            <p className="text-sm font-medium">Employees Worldwide</p>
            <p className={typography.body.sm}>{company.employeesWorldwide} employees</p>
          </div>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() =>
            onEditField({
              field: 'employeesWorldwide',
              title: 'Change employees worldwide',
              type: 'number',
            })
          }
        >
          Edit
        </Button>
      </div>

      {/* Why Work With Us */}
      {company.whyWorkWithUs && (
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm font-medium">Why Work With Us</p>
            <p className={typography.body.sm}>{company.whyWorkWithUs}</p>
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
            onClick={() =>
              onEditField({
                field: 'whyWorkWithUs',
                title: 'Change why work with us message',
                type: 'textarea',
              })
            }
          >
            Edit
          </Button>
        </div>
      )}

      {/* Website */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" style={{ color: colors.yellow }} />
          <div>
            <p className="text-sm font-medium">Website</p>
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${typography.body.sm} text-blue-400 hover:text-blue-300 underline`}
            >
              {company.websiteUrl}
            </a>
          </div>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() =>
            onEditField({ field: 'websiteUrl', title: 'Change website URL', type: 'text' })
          }
        >
          Edit
        </Button>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" style={{ color: colors.yellow }} />
            <div>
              <p className="text-sm font-medium">Contact Name</p>
              <p className={typography.body.sm}>{company.contactName}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}]`}
            onClick={() =>
              onEditField({ field: 'contactName', title: 'Change contact name', type: 'text' })
            }
          >
            Edit
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" style={{ color: colors.yellow }} />
            <div>
              <p className="text-sm font-medium">Contact Email</p>
              <a
                href={`mailto:${company.contactEmail}`}
                className={`${typography.body.sm} text-blue-400 hover:text-blue-300 underline`}
              >
                {company.contactEmail}
              </a>
            </div>
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}]`}
            onClick={() =>
              onEditField({ field: 'contactEmail', title: 'Change contact email', type: 'text' })
            }
          >
            Edit
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" style={{ color: colors.yellow }} />
            <div>
              <p className="text-sm font-medium">Contact Phone</p>
              <a
                href={`tel:${company.contactPhone}`}
                className={`${typography.body.sm} text-blue-400 hover:text-blue-300 underline`}
              >
                {company.contactPhone}
              </a>
            </div>
          </div>
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}]`}
            onClick={() =>
              onEditField({ field: 'contactPhone', title: 'Change contact phone', type: 'text' })
            }
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
