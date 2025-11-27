/**
 * app.js
 * Main application logic for FNOL form.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('fnolForm');
    const fileInput = document.getElementById('dropzone-file');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const modal = new Modal(document.getElementById('analysisModal'));

    // Load Lottie Animation
    let lottiePlayer = lottie.loadAnimation({
        container: document.getElementById('lottieContainer'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets9.lottiefiles.com/packages/lf20_q5pk6p1k.json' // AI processing animation
    });

    let uploadedFiles = [];
    let currentAnalysis = null;

    // File Upload Handler
    fileInput.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + uploadedFiles.length > 5) {
            alert("Maximum 5 photos allowed.");
            return;
        }

        for (const file of files) {
            // Validate image
            const validation = await AISimulator.validateImage(file);

            if (!validation.analysis.isValid) {
                // BLOCKING ERROR
                alert(validation.analysis.notes);
                continue; // Skip this file
            }

            uploadedFiles.push(validation);

            // Render Preview Card (Flowbite style)
            const previewCard = document.createElement("div");
            previewCard.className = "relative rounded-xl overflow-hidden shadow hover:shadow-lg transition animate-fade-in";

            previewCard.innerHTML = `
                <img src="${validation.url}" class="object-cover w-full h-32 rounded-xl">

                <span class="absolute top-2 left-2 text-xs px-2 py-1 rounded-full text-white shadow
                    ${validation.analysis.relevanceScore > 0.4 ? 'bg-green-600' : 'bg-yellow-600'}">
                    ${(validation.analysis.relevanceScore * 100).toFixed(0)}% match
                </span>
            `;

            // Lightbox Event
            previewCard.addEventListener("click", () => {
                document.getElementById("lightboxImage").src = validation.url;
                document.getElementById("lightbox").style.display = "flex";
            });

            previewContainer.appendChild(previewCard);
        }
    });

    // Form Submit Handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (uploadedFiles.length === 0) {
            alert("Please upload at least one photo.");
            return;
        }

        // Show Modal
        modal.show();
        document.getElementById('loadingState').classList.remove('hidden');
        document.getElementById('resultsState').classList.add('hidden');
        document.getElementById('confirmClaimBtn').disabled = true;

        // Gather Data
        const claimData = {
            description: document.getElementById('description').value,
            images: uploadedFiles,
            claimant: {
                name: document.getElementById('name').value,
                policyNumber: document.getElementById('policy').value
            }
        };

        // Run Analysis
        currentAnalysis = await AISimulator.analyzeClaim(claimData);

        // Update UI with Results
        document.getElementById('loadingState').classList.add('hidden');
        document.getElementById('resultsState').classList.remove('hidden');
        document.getElementById('confirmClaimBtn').disabled = false;

        // Populate Fields
        document.getElementById('severityLabel').textContent = currentAnalysis.severityLabel;

        // Animate Severity Bar
        const sevTarget = currentAnalysis.severityScore * 100;
        let sevProgress = 0;
        const sevInterval = setInterval(() => {
            sevProgress += 1;
            document.getElementById('severityBar').style.width = sevProgress + "%";
            if (sevProgress >= sevTarget) clearInterval(sevInterval);
        }, 6);

        document.getElementById('payoutAmount').textContent = `$${currentAnalysis.estimatedPayout.toLocaleString()}`;

        document.getElementById('fraudScore').textContent = `${(currentAnalysis.fraudProbability * 100).toFixed(0)}%`;

        // Animate Fraud Bar
        const frTarget = currentAnalysis.fraudProbability * 100;
        let frProgress = 0;
        const frInterval = setInterval(() => {
            frProgress += 1;
            document.getElementById('fraudBar').style.width = frProgress + "%";
            if (frProgress >= frTarget) clearInterval(frInterval);
        }, 6);

        document.getElementById('aiExplanation').textContent = `"${currentAnalysis.explainability}"`;

        const evidenceList = document.getElementById('evidenceList');
        evidenceList.innerHTML = '';
        currentAnalysis.evidence.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            evidenceList.appendChild(li);
        });
    });

    // Confirm Claim Handler
    document.getElementById('confirmClaimBtn').addEventListener('click', () => {
        if (!currentAnalysis) return;

        const newClaim = {
            claimId: `CLM-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            createdAt: new Date().toISOString(),
            claimant: {
                name: document.getElementById('name').value,
                policyNumber: document.getElementById('policy').value,
                contact: "user@example.com"
            },
            description: document.getElementById('description').value,
            location: "Unknown",
            images: uploadedFiles.map(f => ({
                id: f.id,
                url: f.url, // Note: In real app, this would be a server URL. Here we rely on blob URL which is temporary.
                metadata: f.metadata
            })),
            aiAnalysis: currentAnalysis,
            assignedTeam: "Adjuster Team A",
            status: "Pending Review",
            adjusterNotes: "",
            history: [
                { timestamp: new Date().toISOString(), user: "agent", action: "analyzed", details: "Claim submitted and analyzed" }
            ]
        };

        Storage.saveClaim(newClaim);
        modal.hide();

        // Redirect to dashboard (simulating "Send to Adjuster")
        window.location.href = 'dashboard.html';
    });

    // Close Lightbox
    document.getElementById("lightbox").addEventListener("click", () => {
        document.getElementById("lightbox").style.display = "none";
    });
});
