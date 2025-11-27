/**
 * storage.js
 * Manages persistence of claims using localStorage.
 * Handles seeding of initial demo data.
 */

const STORAGE_KEY = 'antigravity_claims_v1';

const SEED_DATA = [
    {
        claimId: "CLM-2025-0001",
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        claimant: { name: "John Doe", policyNumber: "POL-12345678", contact: "john@example.com" },
        description: "Rear ended at a stop light. Bumper is cracked.",
        location: "Main St & 5th Ave",
        images: [
            { id: "img-1", url: "https://placehold.co/600x400?text=Rear+Bumper+Damage", metadata: { width: 800, height: 600, sizeBytes: 150000 } }
        ],
        aiAnalysis: {
            damageAreas: ["rear_bumper"],
            severityScore: 0.3,
            severityLabel: "Low",
            estimatedPayout: 1200.00,
            fraudProbability: 0.05,
            evidence: ["Impact consistent with rear collision", "License plate visible", "No previous damage detected"],
            explainability: "Damage is localized to the rear bumper with no structural impact detected.",
            imageQuality: { isValid: true, relevanceScore: 0.95, notes: "Clear image" }
        },
        assignedTeam: "Adjuster Team A",
        status: "Pending Review",
        adjusterNotes: "",
        history: [
            { timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), user: "agent", action: "analyzed", details: "Initial AI analysis completed" }
        ]
    },
    {
        claimId: "CLM-2025-0002",
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        claimant: { name: "Jane Smith", policyNumber: "POL-87654321", contact: "jane@example.com" },
        description: "Hit a pole in parking lot. Airbags deployed.",
        location: "Walmart Parking Lot",
        images: [
            { id: "img-2", url: "https://placehold.co/600x400?text=Front+End+Damage", metadata: { width: 1024, height: 768, sizeBytes: 250000 } }
        ],
        aiAnalysis: {
            damageAreas: ["front_bumper", "hood", "windshield"],
            severityScore: 0.85,
            severityLabel: "High",
            estimatedPayout: 6500.00,
            fraudProbability: 0.15,
            evidence: ["Airbag deployment detected", "Significant structural deformation", "Multiple impact points"],
            explainability: "High severity due to airbag deployment and multiple affected areas.",
            imageQuality: { isValid: true, relevanceScore: 0.92, notes: "Clear image" }
        },
        assignedTeam: "SIU Team",
        status: "Escalated",
        adjusterNotes: "High value claim, requires field inspection.",
        history: [
            { timestamp: new Date(Date.now() - 43200000).toISOString(), user: "agent", action: "analyzed", details: "Initial AI analysis completed" },
            { timestamp: new Date(Date.now() - 3600000).toISOString(), user: "system", action: "escalated", details: "Auto-escalated due to high severity" }
        ]
    }
];

const Storage = {
    init() {
        if (!localStorage.getItem(STORAGE_KEY)) {
            console.log("Seeding initial data...");
            localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
        }
    },

    getClaims() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    getClaim(id) {
        const claims = this.getClaims();
        return claims.find(c => c.claimId === id);
    },

    saveClaim(claim) {
        const claims = this.getClaims();
        const existingIndex = claims.findIndex(c => c.claimId === claim.claimId);
        
        if (existingIndex >= 0) {
            claims[existingIndex] = claim;
        } else {
            claims.unshift(claim); // Add to top
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
        return claim;
    },

    reset() {
        localStorage.removeItem(STORAGE_KEY);
        this.init();
    }
};

// Initialize on load
Storage.init();
