'use client';

import { useEffect, useState } from 'react';
import ProposalCard from '@/components/ProposalCard';
import { Plus } from 'lucide-react';

export default function Home() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In dev, fetch from our local backend. If backend isn't up, use mock data fallback
    fetch('http://localhost:3001/api/proposals')
      .then(res => res.json())
      .then(data => {
        setProposals(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend not reachable, falling back to mock UI data', err);
        setProposals([
          {
            id: '1',
            creator: 'GBX...ABCD',
            title: 'Allocate 50,000 XLM for Marketing',
            description: 'This proposal requests 50,000 XLM from the treasury to fund the Q3 marketing campaign.',
            yes_votes: 125,
            no_votes: 12,
            deadline: 1720000000,
            status: 'active'
          } as never
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-stellar">
            Governance Explorer
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Shape the future of the Tesla-Gov ecosystem. Review active proposals, cast your on-chain votes, and track community consensus.
          </p>
        </div>
        <button className="group px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-background font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Create Proposal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full h-64 flex items-center justify-center text-slate-500">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              <p>Loading proposals...</p>
            </div>
          </div>
        ) : (
          proposals.map((proposal: any) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))
        )}
      </div>
    </div>
  );
}
