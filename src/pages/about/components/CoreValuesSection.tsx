import { Target, Users, Lightbulb, Award, Clock, MessageSquare } from 'lucide-react';
import { spacing } from '@/lib/design-system';

// Core values data
const coreValues = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Purpose-Driven',
    description:
      "We're focused on creating meaningful impact through connecting talent with opportunity.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community-Focused',
    description:
      'We believe in building strong, supportive communities that foster growth and collaboration.',
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Innovation',
    description: 'We embrace creativity and continuous innovation to solve complex challenges.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Excellence',
    description:
      'We strive for excellence in everything we do, from platform experience to educational content.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Adaptability',
    description: 'We stay agile and responsive to the evolving needs of our users and the market.',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Transparency',
    description:
      'We believe in open communication and honesty with our community and stakeholders.',
  },
];

export const CoreValuesSection = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className={spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-600">
            These principles guide everything we do, from product development to partner
            relationships and community building.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <div className="text-blue-600">{value.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
