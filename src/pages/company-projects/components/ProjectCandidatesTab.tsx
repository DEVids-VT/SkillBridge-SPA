import { Button } from '@/components/ui/button';
import { colors, typography } from '@/lib/design-system';
import { Download, ExternalLink } from 'lucide-react';

export default function ProjectCandidatesTab() {
  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border p-6 shadow-md"
        style={{ backgroundColor: colors.blueDark, borderColor: colors.borderLight }}
      >
        <div className="mb-2">
          <h3 className={typography.heading[4]}>Enrolled Candidates</h3>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="rounded-lg border p-4" style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium" style={{ color: colors.white }}>Candidate {n}</p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>Frontend Developer</p>
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>Progress: {Math.floor(Math.random()*100)}%</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Button variant="outline" className="gap-2" style={{ borderColor: colors.blue, color: colors.white }}>
                    <Download className="size-4" /> Download CV
                  </Button>
                  <a href="#" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-md border"
                    style={{ borderColor: colors.blue, color: colors.white }}>
                    <ExternalLink className="size-4" /> Open Tracker
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
