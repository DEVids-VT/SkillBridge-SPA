import { ChevronDown, ChevronUp, BrainCircuit, Clipboard, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards, colors, typography } from '@/lib/design-system';

export interface DashboardProjectLlmIntegrationProps {
  isExpanded: boolean;
  onToggle: () => void;
  copied: boolean;
  onCopyPrompt: () => void;
}

export const DashboardProjectLlmIntegration = ({
  isExpanded,
  onToggle,
  copied,
  onCopyPrompt,
}: DashboardProjectLlmIntegrationProps) => {
  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cn(cards.header, 'cursor-pointer')} onClick={onToggle}>
        <div className="flex items-center justify-between w-full">
          <h3 className={typography.heading[4]}>AI Assistant Integration</h3>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className={cards.body}>
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
              style={{ backgroundColor: `${colors.blue}30` }}
            >
              <BrainCircuit size={24} style={{ color: colors.yellow }} />
            </div>
            <h4 className={typography.heading[5] + ' mb-2'}>Get AI Assistance With Your Project</h4>
            <p className="text-gray-300 mb-6 max-w-md">
              Generate a detailed prompt about this project to use with ChatGPT, Claude, or other AI
              assistants. This helps you get more targeted guidance on understanding the project
              requirements and implementation.
            </p>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
              style={{
                backgroundColor: copied ? `${colors.yellow}` : colors.blue,
                color: copied ? colors.dark : colors.dark,
                cursor: copied ? 'default' : 'pointer',
              }}
              onClick={onCopyPrompt}
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Prompt Copied!
                </>
              ) : (
                <>
                  <Clipboard size={18} />
                  Copy Project Prompt to Clipboard
                </>
              )}
            </button>
          </div>

          <div
            className="p-4 rounded-lg bg-opacity-50"
            style={{ backgroundColor: `${colors.blueDark}60` }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-gray-400 mt-1" />
              <div>
                <h5 className="font-medium mb-1">How to Use This Feature</h5>
                <p className="text-sm text-gray-400 mb-2">
                  The generated prompt contains comprehensive details about your project including
                  requirements, tasks, context, and specific questions to help an AI assistant
                  provide more relevant guidance.
                </p>
                <ol className="list-decimal text-sm text-gray-400 pl-4 space-y-1">
                  <li>Click the button above to copy the prompt</li>
                  <li>Paste it into ChatGPT, Claude, or your preferred AI assistant</li>
                  <li>Edit the prompt if needed to focus on specific aspects you need help with</li>
                  <li>
                    Use the AI's response to better understand your project and implementation
                    approach
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
