import { BookOpen, Briefcase, Code, GraduationCap, LineChart, Users } from 'lucide-react';
import { spacing } from '@/lib/design-system';

// Student benefits data
const studentBenefits = [
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: 'Real Business Cases',
    description: 'Work on actual projects that companies need solved, not theoretical exercises.',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Skill Development',
    description: 'Learn by doing in a real business environment with practical challenges.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Supportive Platform',
    description: 'Access a user-friendly platform designed to guide and support your growth.',
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: 'Direct Opportunities',
    description: 'Get direct access to internship and job offers from participating companies.',
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Project Portfolio',
    description: 'Build a portfolio of completed real-world projects to showcase your abilities.',
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Structured Feedback',
    description: 'Receive detailed feedback and guidance to continuously improve your skills.',
  },
];

export const StudentsSection = () => {
  return (
    <section className="bg-green-50 py-16 md:py-24">
      <div className={spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">For Students</h2>
          </div>
          <p className="text-gray-700 text-lg">
            SkillBridge provides students with the tools, opportunities, and real-world experience 
            needed to launch successful careers in their chosen fields.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {studentBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <div className="text-green-600">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How it works for students */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
          <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">How It Works for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-semibold mb-2">Browse Cases</h4>
              <p className="text-sm text-gray-600">Find real business challenges that match your skills and interests</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-semibold mb-2">Apply & Solve</h4>
              <p className="text-sm text-gray-600">Work on the case using your knowledge and creativity</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-semibold mb-2">Get Evaluated</h4>
              <p className="text-sm text-gray-600">Receive AI-powered assessment and detailed feedback</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="font-semibold mb-2">Get Hired</h4>
              <p className="text-sm text-gray-600">Top performers get direct contact from interested companies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
