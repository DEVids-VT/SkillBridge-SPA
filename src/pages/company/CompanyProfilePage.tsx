import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { colors, typography } from "@/lib/design-system";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Users,
  Calendar,
  Tag,
  Plus,
} from 'lucide-react';

import EditModal from "@/components/ui/EditProfileModal";

export default function CompanyProfilePage() {
  const { t } = useTranslation('companyProfile');

  const [company, setCompany] = useState({
    logo: "/images/companies/techcorp-logo.webp",
    companyName: "TechCorp Solutions",
    about: "Leading technology solutions provider specializing in digital transformation and innovative software development.",
    activities: ["Software Development", "Digital Consulting", "Cloud Solutions", "AI Integration"],
    contactInfo: "contact@techcorp.com",
    offices: [
      { city: "Sofia", country: "Bulgaria", address: "123 Tech Street, Sofia 1000" },
      { city: "London", country: "UK", address: "456 Innovation Ave, London EC1A" },
      { city: "New York", country: "USA", address: "789 Digital Blvd, NY 10001" }
    ],
    employeeCount: 250,
    employeeStatus: "Growing",
    sector: "Technology",
    processes: ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "Figma", "Jira"],
    whyWorkWithUs: "We offer cutting-edge technology solutions with a focus on innovation, quality, and client success. Our team of experts delivers exceptional results through collaborative partnerships.",
    yearEstablished: 2015,
    subscription: {
      current: "Enterprise Plan",
      description: "Full access to all features and premium support",
      upcoming: "AI-Powered Analytics (Coming Soon)",
      upcomingDescription: "Advanced AI insights and predictive analytics",
    },
    theme: "system",
  });

  const [editField, setEditField] = useState<
    null | { 
      field: "companyName" | "about" | "contactInfo" | "whyWorkWithUs" | "yearEstablished"; 
      title: string;
      type: "text" | "textarea" | "number";
    }
  >(null);

  const [editActivities, setEditActivities] = useState(false);
  const [editProcesses, setEditProcesses] = useState(false);
  const [editOffices, setEditOffices] = useState(false);

  const addActivity = () => {
    const newActivity = prompt("Enter new activity:");
    if (newActivity && newActivity.trim()) {
      setCompany(prev => ({
        ...prev,
        activities: [...prev.activities, newActivity.trim()]
      }));
    }
  };

  const removeActivity = (index: number) => {
    setCompany(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const addProcess = () => {
    const newProcess = prompt("Enter new process/technology:");
    if (newProcess && newProcess.trim()) {
      setCompany(prev => ({
        ...prev,
        processes: [...prev.processes, newProcess.trim()]
      }));
    }
  };

  const removeProcess = (index: number) => {
    setCompany(prev => ({
      ...prev,
      processes: prev.processes.filter((_, i) => i !== index)
    }));
  };

  const addOffice = () => {
    const city = prompt("Enter city:");
    const country = prompt("Enter country:");
    const address = prompt("Enter address:");
    if (city && country && address) {
      setCompany(prev => ({
        ...prev,
        offices: [...prev.offices, { city, country, address }]
      }));
    }
  };

  const removeOffice = (index: number) => {
    setCompany(prev => ({
      ...prev,
      offices: prev.offices.filter((_, i) => i !== index)
    }));
  };

  return (
    <div
      className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-96"
      style={{ backgroundColor: colors.dark, color: colors.white }}
    >
      {/* Company Information Section */}
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
            onClick={() => setEditField({ field: "companyName", title: "Change company name", type: "text" })}
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
            onClick={() => setEditField({ field: "about", title: "Change company about", type: "textarea" })}
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
                    onClick={() => setEditActivities(false)}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-[${colors.blue}] text-[${colors.white}]`}
                    onClick={() => setEditActivities(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => setEditActivities(true)}
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
                    onClick={() => removeActivity(idx)}
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
                onClick={addActivity}
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
            onClick={() => setEditField({ field: "contactInfo", title: "Change contact info", type: "text" })}
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
                    onClick={() => setEditOffices(false)}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-[${colors.blue}] text-[${colors.white}]`}
                    onClick={() => setEditOffices(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => setEditOffices(true)}
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
                      onClick={() => removeOffice(idx)}
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
                onClick={addOffice}
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
                    onClick={() => setEditProcesses(false)}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-[${colors.blue}] text-[${colors.white}]`}
                    onClick={() => setEditProcesses(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-[${colors.blue}] text-[${colors.white}]`}
                  onClick={() => setEditProcesses(true)}
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
                    onClick={() => removeProcess(idx)}
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
                onClick={addProcess}
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
            onClick={() => setEditField({ field: "whyWorkWithUs", title: "Change why work with us message", type: "textarea" })}
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
            onClick={() => setEditField({ field: "yearEstablished", title: "Change year established", type: "number" })}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Subscription Section */}
      <div className={`space-y-6 border-b pb-8 border-[${colors.blue}]`}>
        <h2 className={typography.heading[4]}>Subscription</h2>

        <div>
          <p className={typography.body.lg}>{company.subscription.current}</p>
          <p className={typography.body.sm}>{company.subscription.description}</p>
        </div>

        <div>
          <p className={typography.body.lg}>{company.subscription.upcoming}</p>
          <p className={typography.body.sm}>{company.subscription.upcomingDescription}</p>
        </div>
      </div>

      {/* System Section */}
      <div className="space-y-6">
        <h2 className={typography.heading[4]}>System</h2>

        {/* Theme Preferences */}
        <div>
          <p className="text-sm font-medium mb-2">Theme Preferences</p>
          <Select
            value={company.theme}
            onValueChange={(val) => setCompany((prev) => ({ ...prev, theme: val }))}
          >
            <SelectTrigger className={`w-[200px] bg-transparent border border-[${colors.blue}]`}>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Support */}
        <Button variant="outline" className={`border-[${colors.blue}] text-[${colors.white}]`}>
          Support
        </Button>
      </div>

      {/* Modal */}
      <EditModal
        isOpen={!!editField}
        onClose={() => setEditField(null)}
        title={editField?.title || ""}
        initialValue={editField ? String(company[editField.field]) : ""}
        onSave={(newValue: string) => {
          if (!editField) return;
          const value = editField.type === "number" ? Number(newValue) : newValue;
          setCompany((prev) => ({ ...prev, [editField.field]: value }));
        }}
        renderField={(value: string, setValue: (val: string) => void) => {
          if (editField?.type === "textarea") {
            return (
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full bg-transparent border border-[${colors.blue}] px-2 py-1 rounded min-h-[100px]`}
                placeholder="Enter value..."
              />
            );
          }
          if (editField?.type === "number") {
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
