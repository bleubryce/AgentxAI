
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';
import ResumeSubmissionForm from './ResumeSubmissionForm';

interface ResumeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const ResumeDialog: React.FC<ResumeDialogProps> = ({ isOpen, onClose, jobTitle }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-bolt-darker border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-clash">
            Apply for Position
          </DialogTitle>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <ResumeSubmissionForm jobTitle={jobTitle} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDialog;
