import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Mail } from "lucide-react";

interface ProgressModalProps {
  isOpen: boolean;
  progress: number;
  onClose: () => void;
}

export default function ProgressModal({ isOpen, progress, onClose }: ProgressModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-effect border-[var(--light-text)]/10 bg-transparent max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--primary)]/20 rounded-full flex items-center justify-center">
            <Mail className="text-2xl text-[var(--primary)]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Sending Emails</h3>
          <p className="text-gray-300 mb-6">Please wait while we send your emails...</p>
          <div className="progress-bar mb-4">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-400">
            {Math.round(progress)}% Complete
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
