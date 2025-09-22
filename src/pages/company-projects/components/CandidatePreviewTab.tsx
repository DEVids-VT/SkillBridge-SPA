import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { colors, typography } from '@/lib/design-system';

interface CandidatePreviewTabProps {
  projectId: string;
}

export default function CandidatePreviewTab({ projectId }: CandidatePreviewTabProps) {
  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-6 shadow-md"
        style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
      >
        <div className="mb-2">
          <h3 className={typography.heading[4]}>Candidate View</h3>
        </div>
        <div>
          <p className="text-gray-300">This is how candidates see your assessment.</p>
          <div className="mt-4">
            <Link
              to={`/projects/${projectId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium"
              style={{ backgroundColor: colors.blue, color: colors.dark }}
            >
              <Eye className="size-4" /> Open Candidate View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
