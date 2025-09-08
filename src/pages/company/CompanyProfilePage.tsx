import { useState } from "react";
import { colors } from "@/lib/design-system";
import EditModal from "@/components/ui/EditProfileModal";
import {
  CompanyInformationSection,
  CompanySubscriptionSection,
  CompanySystemSection,
} from "./components";

export default function CompanyProfilePage() {

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

  // Wrapper function to handle the type mismatch
  const handleEditField = (field: { field: string; title: string; type: string }) => {
    const validField = field.field as "companyName" | "about" | "contactInfo" | "whyWorkWithUs" | "yearEstablished";
    const validType = field.type as "text" | "textarea" | "number";
    setEditField({ field: validField, title: field.title, type: validType });
  };

  return (
    <div
      className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-96"
      style={{ backgroundColor: colors.dark, color: colors.white }}
    >
      <CompanyInformationSection
        company={company}
        editActivities={editActivities}
        editProcesses={editProcesses}
        editOffices={editOffices}
        onEditField={handleEditField}
        onSetEditActivities={setEditActivities}
        onSetEditProcesses={setEditProcesses}
        onSetEditOffices={setEditOffices}
        onAddActivity={addActivity}
        onRemoveActivity={removeActivity}
        onAddProcess={addProcess}
        onRemoveProcess={removeProcess}
        onAddOffice={addOffice}
        onRemoveOffice={removeOffice}
      />

      <CompanySubscriptionSection subscription={company.subscription} />

      <CompanySystemSection
        theme={company.theme}
        onThemeChange={(val) => setCompany((prev) => ({ ...prev, theme: val }))}
      />

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
