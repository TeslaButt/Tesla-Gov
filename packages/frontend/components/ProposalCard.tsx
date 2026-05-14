import { Check, X, Clock } from 'lucide-react';

interface Proposal {
  id: string;
  creator: string;
  title: string;
  description: string;
  yes_votes: number;
  no_votes: number;
  deadline: number;
  status: 'active' | 'closed';
}

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  const totalVotes = proposal.yes_votes + proposal.no_votes;
  const yesPercentage = totalVotes === 0 ? 0 : Math.round((proposal.yes_votes / totalVotes) * 100);
  const noPercentage = totalVotes === 0 ? 0 : Math.round((proposal.no_votes / totalVotes) * 100);

  return (
    <div className="glass-panel rounded-2xl p-6 transition-all hover:border-white/10 hover:shadow-2xl hover:shadow-black/50 flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
          {proposal.creator}
        </span>
        {proposal.status === 'active' ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
            <Clock size={12} /> Active
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            Closed
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {proposal.title}
      </h3>
      <p className="text-slate-400 text-sm mb-8 line-clamp-3 flex-1">
        {proposal.description}
      </p>

      <div className="space-y-6 mt-auto">
        {/* Progress Bar Area */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-success">Yes {yesPercentage}%</span>
            <span className="text-danger">No {noPercentage}%</span>
          </div>
          <div className="h-3 w-full bg-surface rounded-full overflow-hidden flex border border-white/5">
            <div 
              className="h-full bg-success transition-all duration-1000 ease-out" 
              style={{ width: `${yesPercentage}%` }}
            />
            <div 
              className="h-full bg-danger transition-all duration-1000 ease-out" 
              style={{ width: `${noPercentage}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 text-center font-mono">
            {totalVotes.toLocaleString()} total votes
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button 
            disabled={proposal.status !== 'active'}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-success/10 text-success hover:bg-success/20 border border-success/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <Check size={18} /> Vote Yes
          </button>
          <button 
            disabled={proposal.status !== 'active'}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-danger/10 text-danger hover:bg-danger/20 border border-danger/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <X size={18} /> Vote No
          </button>
        </div>
      </div>
    </div>
  );
}
