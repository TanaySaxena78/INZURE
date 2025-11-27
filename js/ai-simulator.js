/**
 * aiSimulator.js
 * Simulates AI agent behavior using deterministic heuristics.
 * Handles image validation, damage analysis, severity scoring, and fraud detection.
 */

const AISimulator = {
    /**
     * Simulates image validation and classification.
     * In a real app, this would call a Vision API.
     */
    async validateImage(file) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                const filename = file.name.toLowerCase();
                let relevanceScore = 0.8; // Default to good
                let isValid = true;
                let notes = "Image accepted.";
                let damageDetected = true;

                // Heuristic: Check for "irrelevant" keywords in filename for demo
                if (filename.includes('cat') || filename.includes('dog') || filename.includes('pet')) {
                    relevanceScore = 0.05;
                    isValid = false; // Strictly invalid
                    notes = "This looks like a pet photo 🐶. Please upload a vehicle damage image.";
                    damageDetected = false;
                } else if (filename.includes('selfie') || filename.includes('face')) {
                    relevanceScore = 0.1;
                    isValid = false;
                    notes = "Error: Image detected as a person. Please upload a vehicle photo.";
                    damageDetected = false;
                } else if (filename.includes('blur')) {
                    relevanceScore = 0.4;
                    notes = "Image is blurry. Recommendation: Retake.";
                }

                resolve({
                    id: `img-${Date.now()}`,
                    file: file, // Keep reference for preview
                    url: URL.createObjectURL(file),
                    metadata: {
                        width: 1920, // Simulated
                        height: 1080,
                        sizeBytes: file.size,
                        type: file.type
                    },
                    analysis: {
                        relevanceScore,
                        isValid,
                        notes,
                        damageDetected
                    }
                });
            }, 800);
        });
    },

    /**
     * Analyzes the full claim (text + images) to generate scores and recommendations.
     */
    async analyzeClaim(claimData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const desc = claimData.description.toLowerCase();
                const images = claimData.images || [];

                // 1. Determine Damage Areas based on description keywords
                const damageAreas = [];
                if (desc.includes('rear') || desc.includes('back') || desc.includes('bumper')) damageAreas.push('rear_bumper');
                if (desc.includes('front') || desc.includes('headlight') || desc.includes('hood')) damageAreas.push('front_bumper');
                if (desc.includes('side') || desc.includes('door')) damageAreas.push('left_door');
                if (desc.includes('glass') || desc.includes('windshield')) damageAreas.push('windshield');

                // Default if nothing found
                if (damageAreas.length === 0) damageAreas.push('unknown_area');

                // 2. Calculate Severity
                let severityScore = 0.1 + (images.length * 0.12);
                severityScore += Math.random() * 0.35; // more variation
                if (desc.includes('airbag')) severityScore += 0.4;
                if (desc.includes('dent')) severityScore += 0.15;
                if (desc.includes('scratch')) severityScore -= 0.05;
                if (damageAreas.length > 2) severityScore += 0.22;
                severityScore = Math.min(Math.max(severityScore, 0.12), 0.98);

                let severityLabel = 'Low';
                if (severityScore < 0.2) severityLabel = 'Minor';
                else if (severityScore < 0.5) severityLabel = 'Low';
                else if (severityScore < 0.75) severityLabel = 'Medium';
                else severityLabel = 'High';

                // 3. Estimate Payout
                const baseRates = {
                    'rear_bumper': 1000,
                    'front_bumper': 1200,
                    'left_door': 900,
                    'windshield': 500,
                    'unknown_area': 500
                };

                let baseTotal = 0;
                damageAreas.forEach(area => baseTotal += (baseRates[area] || 500));

                const severityMultiplier = severityScore * 2; // Simple multiplier
                const estimatedPayout = Math.round(baseTotal * (0.8 + severityMultiplier));

                // 4. Fraud Detection
                let fraudProbability = 0.02 + Math.random() * 0.18;

                if (images.length === 0) {
                    fraudProbability += 0.3;
                    fraudFlags.push("No images provided");
                }

                if (desc.includes('staged') || desc.includes('fake')) {
                    fraudProbability = 0.95;
                    fraudFlags.push("Suspicious keywords detected in description");
                }
                if (desc.includes('friend') || desc.includes('cash')) {
                    fraudProbability += 0.3;
                    fraudFlags.push("Social network reference in description");
                }
                if (images.length === 0) {
                    fraudProbability += 0.2;
                    fraudFlags.push("No images provided");
                }

                fraudProbability = Math.min(fraudProbability, 0.99);

                // 5. Generate Evidence & Explainability
                const evidence = [
                    `Damage detected in ${damageAreas.join(', ').replace('_', ' ')}`,
                    `Severity calculated based on ${damageAreas.length} impact areas`,
                    fraudProbability > 0.5 ? "Risk factors identified in claim details" : "Claim details consistent with standard patterns"
                ];

                const explainability = `AI assesses this as a ${severityLabel} severity claim involving the ${damageAreas.join(' and ')}. Recommended for ${fraudProbability > 0.5 ? 'SIU Review' : 'Standard Processing'}.`;

                resolve({
                    damageAreas,
                    severityScore,
                    severityLabel,
                    estimatedPayout,
                    fraudProbability,
                    evidence,
                    explainability,
                    imageQuality: { isValid: true, relevanceScore: 0.9, notes: "Analysis complete" }
                });
            }, 1500); // Simulate processing time
        });
    }
};
