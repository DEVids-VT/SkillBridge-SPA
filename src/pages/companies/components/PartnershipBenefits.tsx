import { Button } from '@/components/ui/button';
import { Briefcase, TrendingUp, Award } from 'lucide-react';

export const PartnershipBenefits = () => {
  return (
    <div className="bg-blue-50 rounded-xl p-8 lg:p-12 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Partnership Program Benefits</h2>
        <p className="text-gray-600 mb-8">
          Join our partner network to access exclusive resources, collaboration opportunities, and
          gain visibility in the tech community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Talent Access</h3>
            <p className="text-gray-500 text-sm">
              Connect with skilled professionals and recruit top talent for your organization.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Brand Visibility</h3>
            <p className="text-gray-500 text-sm">
              Increase your company's exposure through our platform, events, and marketing channels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
            <p className="text-gray-500 text-sm">
              Participate in industry projects, research initiatives, and networking opportunities.
            </p>
          </div>
        </div>

        <Button size="lg" className="px-8">
          Become a Partner
        </Button>
      </div>
    </div>
  );
};
