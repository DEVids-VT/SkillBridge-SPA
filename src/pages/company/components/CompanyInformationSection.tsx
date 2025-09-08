import { Button } from "@/components/ui/button";
import { colors, typography } from "@/lib/design-system";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Users,
  Calendar,
  Tag,
  Plus,
} from 'lucide-react';

interface Office {
  city: string;
  country: string;
  address: string;
}

interface CompanyInformationSectionProps {
  company: {
    logo: string;
    companyName: string;
    about: string;
    activities: string[];
    contactInfo: string;
    offices: Office[];
    employeeCount: number;
    employeeStatus: string;
    sector: string;
    processes: string[];
    whyWorkWithUs: string;
    yearEstablished: number;
  };
  editActivities: boolean;
  editProcesses: boolean;
  editOffices: boolean;
  onEditField: (field: { field: string; title: string; type: string }) => void;
  onSetEditActivities: (value: boolean) => void;
  onSetEditProcesses: (value: boolean) => void;
  onSetEditOffices: (value: boolean) => void;
  onAddActivity: () => void;
  onRemoveActivity: (index: number) => void;
  onAddProcess: () => void;
  onRemoveProcess: (index: number) => void;
  onAddOffice: () => void;
  onRemoveOffice: (index: number) => void;
}

export default function CompanyInformationSection({
  company,
  editActivities,
  editProcesses,
  editOffices,
  onEditField,
  onSetEditActivities,
  onSetEditProcesses,
  onSetEditOffices,
  onAddActivity,
  onRemoveActivity,
  onAddProcess,
  onRemoveProcess,
  onAddOffice,
  onRemoveOffice,
}: CompanyInformationSectionProps) {
  return (
    <div className={`space-y-6 border-b pb-8 border-[${colors.blue}]`}>
      <h2 className={typography.heading[4]}>Company Information</h2>

      {/* Company Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={company.logo}
            alt="Company Logo"
            className={`w-16 h-16 rounded-full border-2 border-[${colors.white}]`}
          />
          <div>
            <p className="text-sm font-medium">Company Logo</p>
            <p className={typography.body.sm}>Upload or change your company logo</p>
          </div>
        </div>
        <Button variant="outline" className={`border-[${colors.blue}] text-[${colors.white}]`}>
          Change logo
        </Button>
      </div>

      {/* Company Name */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Company Name</p>
          <p className={typography.body.sm}>{company.companyName}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: "companyName", title: "Change company name", type: "text" })}
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
          onClick={() => onEditField({ field: "about", title: "Change company about", type: "textarea" })}
        >
          Edit
        </Button>
      </div>

      {/* Company Activities */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Company Activities</p>
          <div className="flex gap-2">
            {editActivities ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => onSetEditActivities(false)}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => onSetEditActivities(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className={`border-[${colors.blue}] text-[${colors.white}]`}
                onClick={() => onSetEditActivities(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {company.activities.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Badge className={`bg-[${colors.blue}] text-[${colors.white}]`}>
                {activity}
              </Badge>
              {editActivities && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
                  onClick={() => onRemoveActivity(idx)}
                >
                  ×
                </Button>
              )}
            </div>
          ))}
          {editActivities && (
            <Button
              size="sm"
              variant="outline"
              className={`border-[${colors.blue}] text-[${colors.white}]`}
              onClick={onAddActivity}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Contact Info</p>
          <p className={typography.body.sm}>{company.contactInfo}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: "contactInfo", title: "Change contact info", type: "text" })}
        >
          Edit
        </Button>
      </div>

      {/* Offices */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Offices</p>
          <div className="flex gap-2">
            {editOffices ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => onSetEditOffices(false)}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => onSetEditOffices(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className={`border-[${colors.blue}] text-[${colors.white}]`}
                onClick={() => onSetEditOffices(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="space-y-3">
          {company.offices.map((office, idx) => (
            <Card key={idx} className="p-3" style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" style={{ color: colors.yellow }} />
                  <div>
                    <p className="font-medium" style={{ color: colors.yellow }}>
                      {office.city}, {office.country}
                    </p>
                    <p className="text-sm" style={{ color: colors.white }}>
                      {office.address}
                    </p>
                  </div>
                </div>
                {editOffices && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    onClick={() => onRemoveOffice(idx)}
                  >
                    ×
                  </Button>
                )}
              </div>
            </Card>
          ))}
          {editOffices && (
            <Button
              size="sm"
              variant="outline"
              className={`border-[${colors.blue}] text-[${colors.white}]`}
              onClick={onAddOffice}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Office
            </Button>
          )}
        </div>
      </div>

      {/* Employee Count and Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium">Employee Count</p>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" style={{ color: colors.yellow }} />
            <p className={typography.body.sm}>{company.employeeCount} employees</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Status</p>
          <Badge className={`bg-[${colors.orange}] text-[${colors.dark}]`}>
            {company.employeeStatus}
          </Badge>
        </div>
      </div>

      {/* Sector */}
      <div>
        <p className="text-sm font-medium">Sector</p>
        <Badge className={`bg-[${colors.blue}] text-[${colors.white}]`}>
          {company.sector}
        </Badge>
      </div>

      {/* Processes Used */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium">Processes Used (Technologies, Tools, etc.)</p>
          <div className="flex gap-2">
            {editProcesses ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => onSetEditProcesses(false)}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => onSetEditProcesses(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className={`border-[${colors.blue}] text-[${colors.white}]`}
                onClick={() => onSetEditProcesses(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {company.processes.map((process, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Badge className={`bg-[${colors.yellow}] text-[${colors.dark}]`}>
                <Tag className="h-3 w-3 mr-1" />
                {process}
              </Badge>
              {editProcesses && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 text-red-400 hover:text-red-300"
                  onClick={() => onRemoveProcess(idx)}
                >
                  ×
                </Button>
              )}
            </div>
          ))}
          {editProcesses && (
            <Button
              size="sm"
              variant="outline"
              className={`border-[${colors.blue}] text-[${colors.white}]`}
              onClick={onAddProcess}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium">Why Work With Us</p>
          <p className={typography.body.sm}>{company.whyWorkWithUs}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}] ml-4`}
          onClick={() => onEditField({ field: "whyWorkWithUs", title: "Change why work with us message", type: "textarea" })}
        >
          Edit
        </Button>
      </div>

      {/* Year Established */}
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
          onClick={() => onEditField({ field: "yearEstablished", title: "Change year established", type: "number" })}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
