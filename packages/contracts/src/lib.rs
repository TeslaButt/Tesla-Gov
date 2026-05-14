#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Proposal {
    pub id: u64,
    pub creator: Address,
    pub title: String,
    pub description: String,
    pub yes_votes: u32,
    pub no_votes: u32,
    pub deadline: u64, // Stored as ledger sequence
}

#[contracttype]
pub enum DataKey {
    ProposalCount,
    Proposal(u64),
    VoteRecord(u64, Address),
}

#[contract]
pub struct TeslaGov;

#[contractimpl]
impl TeslaGov {
    /// Create a new proposal
    pub fn create_proposal(env: Env, creator: Address, title: String, description: String, duration_ledgers: u64) -> u64 {
        creator.require_auth();

        let mut count: u64 = env.storage().instance().get(&DataKey::ProposalCount).unwrap_or(0);
        count += 1;

        let current_ledger = env.ledger().sequence() as u64;
        let proposal = Proposal {
            id: count,
            creator,
            title,
            description,
            yes_votes: 0,
            no_votes: 0,
            deadline: current_ledger + duration_ledgers,
        };

        env.storage().instance().set(&DataKey::Proposal(count), &proposal);
        env.storage().instance().set(&DataKey::ProposalCount, &count);

        // Emit an event
        env.events().publish((count, symbol_short!("CREATED")), proposal.clone());

        count
    }

    /// Cast a vote (true for yes, false for no)
    pub fn cast_vote(env: Env, voter: Address, proposal_id: u64, support: bool) {
        voter.require_auth();

        // Ensure proposal exists
        let mut proposal: Proposal = env
            .storage()
            .instance()
            .get(&DataKey::Proposal(proposal_id))
            .unwrap_or_else(|| panic!("Proposal does not exist"));

        // Ensure voting is still open
        let current_ledger = env.ledger().sequence() as u64;
        if current_ledger > proposal.deadline {
            panic!("Voting period has ended");
        }

        // Ensure voter hasn't voted yet
        let vote_key = DataKey::VoteRecord(proposal_id, voter.clone());
        if env.storage().instance().has(&vote_key) {
            panic!("Address has already voted on this proposal");
        }

        // Record the vote
        env.storage().instance().set(&vote_key, &support);

        // Update tallies
        if support {
            proposal.yes_votes += 1;
        } else {
            proposal.no_votes += 1;
        }

        env.storage().instance().set(&DataKey::Proposal(proposal_id), &proposal);

        // Emit vote event
        env.events().publish((proposal_id, symbol_short!("VOTED")), (voter, support));
    }

    /// Get current results of a proposal
    pub fn get_results(env: Env, proposal_id: u64) -> Proposal {
        env.storage()
            .instance()
            .get(&DataKey::Proposal(proposal_id))
            .unwrap_or_else(|| panic!("Proposal does not exist"))
    }
}
