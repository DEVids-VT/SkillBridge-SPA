import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Clock, Target, TrendingUp, Users } from 'lucide-react';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export const CompaniesSection = () => {
  const businessBenefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Save Time & Resources',
      description: 'Automated candidate evaluation eliminates manual screening processes.'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Objective Assessment',
      description: 'AI-powered evaluation provides unbiased candidate analysis.'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Faster Selection',
      description: 'Streamlined process reduces time-to-hire significantly.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Long-term Connections',
      description: 'Build lasting relationships with emerging professionals.'
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: 'Innovative Reputation',
      description: 'Build reputation as an innovative employer in the market.'
    },
    {
      icon: <ArrowRight className="h-6 w-6" />,
      title: 'Reduced Costs',
      description: 'Significantly reduce recruitment costs and overhead expenses.'
    }
  ];

  return (
    <section className="bg-blue-50 py-16 md:py-24">
      <div className={spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900">For Companies</h2>
          </div>
          <p className="text-gray-700 text-lg">
            SkillBridge provides companies with efficient, automated tools to discover, evaluate, 
            and connect with the best emerging talent in the market.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {businessBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-100"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <div className="text-blue-600">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How it works for companies */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">How It Works for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-semibold mb-2">Define Need</h4>
              <p className="text-sm text-gray-600">Specify your requirements for junior positions or projects</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-semibold mb-2">Auto-Generate</h4>
              <p className="text-sm text-gray-600">Platform creates tailored business cases for evaluation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-semibold mb-2">Review Results</h4>
              <p className="text-sm text-gray-600">AI evaluates candidates and provides detailed analytics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="font-semibold mb-2">Connect</h4>
              <p className="text-sm text-gray-600">Get matched with top performers for direct recruitment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
