// AI ETHICS E-LEARNING - NEW HIRE VERSION
// Professional compliance training for fintech employees

const courseState = {
    currentScreen: 'welcome',
    progress: 0,
    knowledgeChecks: {},
    assessmentAttempts: {},
    assessmentScore: 0,
    totalAssessmentQuestions: 7,
    scenarioDecisions: {},
    employeeId: 'EMP-' + Math.random().toString(36).substr(2, 9).toUpperCase()
};

const screenFlow = {
    'welcome': { next: 'objectives', progress: 0 },
    'objectives': { next: 'instructions', progress: 5 },
    'instructions': { next: 'training-intro', progress: 10 },
    'training-intro': { next: 'knowledge-check-1', progress: 25 },
    'knowledge-check-1': { next: 'scenario-1-intro', progress: 30 },
    'scenario-1-intro': { next: null, progress: 35 },
    'scenario-1-outcome-A': { next: 'scenario-2-intro', progress: 45 },
    'scenario-1-outcome-B': { next: 'scenario-2-intro', progress: 45 },
    'scenario-1-outcome-C': { next: 'scenario-2-intro', progress: 45 },
    'scenario-2-intro': { next: null, progress: 50 },
    'scenario-2-outcome-A': { next: 'scenario-3-intro', progress: 60 },
    'scenario-2-outcome-B': { next: 'scenario-3-intro', progress: 60 },
    'scenario-2-outcome-C': { next: 'scenario-3-intro', progress: 60 },
    'scenario-3-intro': { next: null, progress: 65 },
    'scenario-3-outcome-A': { next: 'knowledge-check-2', progress: 75 },
    'scenario-3-outcome-B': { next: 'knowledge-check-2', progress: 75 },
    'scenario-3-outcome-C': { next: 'knowledge-check-2', progress: 75 },
    'knowledge-check-2': { next: 'assessment', progress: 80 },
    'assessment': { next: 'summary', progress: 90 },
    'summary': { next: null, progress: 100 }
};

const assessmentQuestions = [
    {
        id: 1,
        question: "Under ECOA Regulation B, what level of explanation is required when denying a credit application?",
        options: [
            { letter: 'A', text: 'General notice that the application was denied', correct: false },
            { letter: 'B', text: 'Specific reasons for the adverse action that are meaningful to the applicant', correct: true },
            { letter: 'C', text: 'Explanation only if the applicant requests it within 60 days', correct: false },
            { letter: 'D', text: 'No explanation required if an AI system made the decision', correct: false }
        ],
        feedback: {
            correct: "Correct. Regulation B requires creditors to provide specific reasons for adverse actions. These reasons must be specific enough to be meaningful to the applicant and allow them to understand what factors led to the denial. Generic statements like 'insufficient score' or 'the AI decided' do not meet this standard. The complexity or proprietary nature of the algorithm does not excuse this requirement.",
            incorrect: "Incorrect. ECOA Regulation B requires specific, meaningful reasons for all adverse credit actions, regardless of whether AI was involved. The reasons must be provided within 30 days and must be specific enough for the applicant to understand what factors led to the denial. 'Our model declined you' or 'insufficient score' are legally insufficient. Review the Transparency principle of the FAT framework."
        }
    },
    {
        id: 2,
        question: "What disparate impact ratio triggers mandatory investigation under CFPB guidelines?",
        options: [
            { letter: 'A', text: '1.1:1 (10% difference)', correct: false },
            { letter: 'B', text: '1.25:1 (25% difference)', correct: true },
            { letter: 'C', text: '1.5:1 (50% difference)', correct: false },
            { letter: 'D', text: '2:1 (100% difference)', correct: false }
        ],
        feedback: {
            correct: "Correct. The CFPB uses the 'four-fifths rule' (also called the 80% rule), which means if one group's approval rate is less than 80% of another group's rate, this creates a disparate impact ratio of 1.25:1 or higher and triggers scrutiny. While this threshold doesn't automatically prove discrimination, it establishes prima facie evidence requiring investigation and potential justification of business necessity.",
            incorrect: "Incorrect. The CFPB applies the 'four-fifths rule': if one group's approval rate is less than 80% of another group's, this ratio (1.25:1 or higher) triggers mandatory investigation. A 2:1 ratio is well beyond this threshold and represents severe disparate impact. Remember: once disparate impact is identified, the burden shifts to the company to demonstrate business necessity and absence of less discriminatory alternatives."
        }
    },
    {
        id: 3,
        question: "Your team discovers an AI system showing disparate impact. The CEO wants to continue operation while investigating. What is the most appropriate action?",
        options: [
            { letter: 'A', text: 'Follow CEO directive and monitor during investigation', correct: false },
            { letter: 'B', text: 'Escalate to Compliance and recommend immediate suspension', correct: true },
            { letter: 'C', text: 'Make minor adjustments and continue operating', correct: false },
            { letter: 'D', text: 'Wait for customer complaints before taking action', correct: false }
        ],
        feedback: {
            correct: "Correct. Once disparate impact is identified, continued operation constitutes knowing discrimination, creating significant legal liability. Accountability principle requires immediate escalation and suspension recommendation. The escalation path is: your manager → Ethics Committee → Legal/Compliance. Deferring to executive pressure when you have knowledge of compliance violations can result in personal liability. Document your recommendation and the response.",
            incorrect: "Incorrect. Once you have knowledge of disparate impact, continued operation may constitute knowing discrimination. The Accountability principle requires you to escalate immediately to Compliance/Legal and recommend suspension, regardless of executive pressure. Continuing operation 'while investigating' has resulted in the largest ECOA enforcement penalties. Review your escalation responsibilities and Whistleblower Policy protections."
        }
    },
    {
        id: 4,
        question: "Under the EU AI Act, financial services AI systems are classified as:",
        options: [
            { letter: 'A', text: 'Minimal risk, requiring only transparency', correct: false },
            { letter: 'B', text: 'Limited risk, requiring some documentation', correct: false },
            { letter: 'C', text: 'High-risk, requiring comprehensive safeguards', correct: true },
            { letter: 'D', text: 'Prohibited from use in the EU', correct: false }
        ],
        feedback: {
            correct: "Correct. The EU AI Act classifies AI systems used for creditworthiness assessment and credit scoring as 'high-risk' because they can significantly affect people's access to financial resources. High-risk systems require: risk management systems, high-quality training data, extensive documentation, transparency obligations, human oversight, and conformity assessments. Penalties for non-compliance can reach €35M or 7% of global revenue, whichever is higher.",
            incorrect: "Incorrect. Financial services AI is classified as 'high-risk' under the EU AI Act due to its significant impact on people's access to credit and financial services. This classification requires comprehensive safeguards including risk management, data governance, documentation, explainability, and human oversight. The Act applies if you serve EU customers or use EU data. Maximum penalties are €35M or 7% of global annual revenue."
        }
    },
    {
        id: 5,
        question: "A data science team deploys a highly accurate neural network that cannot explain individual decisions. From a compliance perspective, this is:",
        options: [
            { letter: 'A', text: 'Acceptable because accuracy is the primary goal', correct: false },
            { letter: 'B', text: 'Acceptable if disclosed in the terms of service', correct: false },
            { letter: 'C', text: 'Problematic because it violates transparency requirements', correct: true },
            { letter: 'D', text: 'Acceptable for internal use but not customer-facing decisions', correct: false }
        ],
        feedback: {
            correct: "Correct. Transparency is a non-negotiable requirement for high-stakes financial decisions. ECOA requires specific, meaningful reasons for adverse actions. The EU AI Act requires explainability for high-risk systems. 'The model is too complex to explain' is explicitly rejected by regulators. Accuracy does not excuse unexplainability. This is why explainability tools (SHAP, LIME) or interpretable models are required from the outset—retrofitting explainability is often impossible.",
            incorrect: "Incorrect. Transparency requirements are mandatory regardless of model accuracy. ECOA Regulation B and the EU AI Act require explainable decisions for credit-related AI. The CFPB has explicitly stated that algorithmic complexity does not excuse the requirement to provide specific reasons. Black-box models cannot be used for adverse credit actions. Review the Transparency principle and consider why explainability must be built in from day one."
        }
    },
    {
        id: 6,
        question: "Why is training AI on historical lending data potentially problematic from a fairness perspective?",
        options: [
            { letter: 'A', text: 'Historical data is always too small for modern ML', correct: false },
            { letter: 'B', text: 'The AI may learn and perpetuate past discriminatory patterns', correct: true },
            { letter: 'C', text: 'Older data formats are incompatible with new systems', correct: false },
            { letter: 'D', text: 'Historical data only reflects different fraud techniques', correct: false }
        ],
        feedback: {
            correct: "Correct. Historical lending data often reflects past discriminatory practices such as redlining, which was legal until 1968 but whose effects persist in credit data. AI trained on this data learns these biased patterns as 'ground truth' and perpetuates them. This is why disparate impact analysis, fairness constraints, and bias testing are critical. 'That's what the data shows' is not a legal defense when the data itself encoded discrimination. You must actively work to break these cycles, not amplify them with AI.",
            incorrect: "Incorrect. The key issue is that historical lending data reflects decades of discriminatory practices like redlining. AI systems trained on biased historical data learn and perpetuate these discriminatory patterns. The model treats past bias as valid signal. This is why data curation, fairness constraints during training, and ongoing bias monitoring are essential. Remember: using historical data reflecting discrimination to justify current discrimination is illegal under ECOA."
        }
    },
    {
        id: 7,
        question: "What does 'Accountability' mean in the FAT framework?",
        options: [
            { letter: 'A', text: 'AI systems must maintain detailed logs', correct: false },
            { letter: 'B', text: 'Humans retain ultimate responsibility for AI decisions', correct: true },
            { letter: 'C', text: 'Companies must publish annual AI reports', correct: false },
            { letter: 'D', text: 'Customers are accountable for providing accurate information', correct: false }
        ],
        feedback: {
            correct: "Correct. Accountability means human oversight and responsibility for AI outcomes. You cannot defer to 'the algorithm decided.' There must be designated individuals who can review, explain, override, and take responsibility for AI decisions. This includes clear escalation paths, documentation of decision-making, and individual accountability when failures occur. Accountability is how we ensure that AI serves human values and legal requirements rather than optimizing for metrics that may conflict with ethics and compliance.",
            incorrect: "Incorrect. Accountability in the FAT framework means humans—not algorithms—bear ultimate responsibility for AI decisions and outcomes. You must have designated owners who can review, explain, and override AI decisions. 'The model decided' is never an acceptable answer to customers, regulators, or in litigation. Accountability includes your personal responsibility to escalate concerns and document decisions. Review your escalation obligations and the case studies showing executive liability for AI failures."
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeCourse();
    setupKeyboardNavigation();
    updateProgress();
    
    const today = new Date();
    const expiration = new Date(today);
    expiration.setFullYear(today.getFullYear() + 1);
    
    document.getElementById('completion-date').textContent = today.toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    document.getElementById('expiration-date').textContent = expiration.toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
    document.getElementById('cert-id').textContent = courseState.employeeId;
});

function initializeCourse() {
    showScreen('welcome');
    loadAssessmentQuestions();
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        courseState.currentScreen = screenId;
        
        if (screenFlow[screenId]) {
            courseState.progress = screenFlow[screenId].progress;
            updateProgress();
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const heading = targetScreen.querySelector('h1, h2');
        if (heading) heading.focus();
    }
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${courseState.progress}%`;
        progressBar.setAttribute('aria-valuenow', courseState.progress);
    }
    
    if (progressText) {
        progressText.textContent = `${courseState.progress}% Complete`;
    }
}

function checkKnowledge(checkNumber, selectedOption, isCorrect) {
    const feedbackBox = document.getElementById(`kc${checkNumber}-feedback`);
    const optionButtons = document.querySelectorAll(`#knowledge-check-${checkNumber} .option-btn`);
    
    optionButtons.forEach(btn => btn.disabled = true);
    
    const selectedButton = Array.from(optionButtons).find(btn => 
        btn.textContent.includes(selectedOption)
    );
    
    if (selectedButton) {
        if (isCorrect) {
            selectedButton.classList.add('correct');
            feedbackBox.className = 'feedback-box correct';
            feedbackBox.innerHTML = `
                <strong>✓ Correct</strong>
                <p>${getKnowledgeCheckFeedback(checkNumber, true)}</p>
            `;
            courseState.knowledgeChecks[checkNumber] = true;
            setTimeout(() => showContinueButton(checkNumber), 1500);
        } else {
            selectedButton.classList.add('incorrect');
            feedbackBox.className = 'feedback-box incorrect';
            feedbackBox.innerHTML = `
                <strong>✗ Incorrect</strong>
                <p>${getKnowledgeCheckFeedback(checkNumber, false)}</p>
            `;
            courseState.knowledgeChecks[checkNumber] = false;
            setTimeout(() => showContinueButton(checkNumber), 2000);
        }
    }
    
    feedbackBox.focus();
}

function getKnowledgeCheckFeedback(checkNumber, isCorrect) {
    const feedback = {
        1: {
            correct: "Correct. Transparency requires providing specific, meaningful reasons for adverse credit actions under Regulation B. The inability to explain AI decisions violates both legal requirements and the Transparency principle. This must be addressed before deployment.",
            incorrect: "Incorrect. The correct answer is Transparency. While Fairness addresses equitable outcomes and Accountability establishes responsibility, Transparency specifically requires explainable decisions. ECOA mandates specific reasons for denials—'AI model decision' is legally insufficient. This is a compliance violation that could result in enforcement action."
        },
        2: {
            correct: "Correct. Under the Accountability principle, you have a personal responsibility to escalate compliance concerns immediately through proper channels: manager → Ethics Committee → Compliance. You must document your observation and recommendation. Continued operation after discovering disparate impact creates liability for knowing discrimination.",
            incorrect: "Incorrect. The correct answer is to escalate immediately and recommend suspension. Accountability means taking personal responsibility when you identify compliance risks. Deferring to others, waiting for complaints, or continuing operation after discovering disparate impact creates legal liability for knowing discrimination. Review your escalation obligations and Whistleblower Policy protections."
        }
    };
    
    return feedback[checkNumber]?.[isCorrect ? 'correct' : 'incorrect'] || '';
}

function showContinueButton(checkNumber) {
    const feedbackBox = document.getElementById(`kc${checkNumber}-feedback`);
    const nextScreen = checkNumber === 1 ? 'scenario-1-intro' : 'assessment';
    
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn btn-primary';
    continueBtn.style.marginTop = 'var(--spacing-md)';
    continueBtn.innerHTML = `Continue <span class="btn-arrow">→</span>`;
    continueBtn.onclick = () => showScreen(nextScreen);
    
    feedbackBox.appendChild(continueBtn);
    continueBtn.focus();
}

function showScenarioOutcome(scenarioNumber, choice) {
    const outcomeId = `scenario-${scenarioNumber}-outcome-${choice}`;
    courseState.scenarioDecisions[scenarioNumber] = choice;
    showScreen(outcomeId);
}

function loadAssessmentQuestions() {
    const container = document.getElementById('assessment-container');
    if (!container) return;
    
    assessmentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'assessment-question';
        questionDiv.id = `assessment-q${q.id}`;
        
        questionDiv.innerHTML = `
            <div class="question-number">Question ${index + 1} of ${assessmentQuestions.length}</div>
            <p class="question-text"><strong>${q.question}</strong></p>
            <div class="options-container" role="radiogroup">
                ${q.options.map(opt => `
                    <button class="option-btn" 
                            onclick="checkAssessment(${q.id}, '${opt.letter}', ${opt.correct})"
                            role="radio">
                        <span class="option-letter">${opt.letter}</span>
                        <span class="option-text">${opt.text}</span>
                    </button>
                `).join('')}
            </div>
            <div id="assessment-feedback-${q.id}" class="feedback-box" role="alert"></div>
        `;
        
        container.appendChild(questionDiv);
    });
}

function checkAssessment(questionId, selectedOption, isCorrect) {
    const feedbackBox = document.getElementById(`assessment-feedback-${questionId}`);
    const questionDiv = document.getElementById(`assessment-q${questionId}`);
    const optionButtons = questionDiv.querySelectorAll('.option-btn');
    const question = assessmentQuestions.find(q => q.id === questionId);
    
    if (!courseState.assessmentAttempts[questionId]) {
        courseState.assessmentAttempts[questionId] = 0;
    }
    
    courseState.assessmentAttempts[questionId]++;
    const currentAttempt = courseState.assessmentAttempts[questionId];
    
    optionButtons.forEach(btn => btn.disabled = true);
    
    const selectedButton = Array.from(optionButtons).find(btn => 
        btn.querySelector('.option-text').textContent === 
        question.options.find(o => o.letter === selectedOption).text
    );
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedbackBox.className = 'feedback-box correct';
        feedbackBox.innerHTML = `<strong>✓ Correct</strong><p>${question.feedback.correct}</p>`;
        
        courseState.assessmentScore += (currentAttempt === 1) ? 1 : 0.5;
        checkAssessmentCompletion();
    } else {
        selectedButton.classList.add('incorrect');
        feedbackBox.className = 'feedback-box incorrect';
        
        if (currentAttempt === 1) {
            feedbackBox.innerHTML = `
                <strong>✗ Incorrect</strong>
                <p>${question.feedback.incorrect}</p>
                <p style="margin-top: 1rem;"><em>You have one more attempt.</em></p>
            `;
            
            setTimeout(() => {
                optionButtons.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('incorrect');
                });
                feedbackBox.innerHTML = '';
                
                const questionNumber = questionDiv.querySelector('.question-number');
                if (questionNumber) {
                    const retrySpan = document.createElement('span');
                    retrySpan.className = 'retry-indicator';
                    retrySpan.textContent = '(Retry)';
                    questionNumber.appendChild(retrySpan);
                }
            }, 3000);
        } else {
            const correctOption = question.options.find(o => o.correct);
            const correctButton = Array.from(optionButtons).find(btn => 
                btn.querySelector('.option-text').textContent === correctOption.text
            );
            
            if (correctButton) correctButton.classList.add('correct');
            
            feedbackBox.innerHTML = `
                <strong>✗ Incorrect</strong>
                <p>${question.feedback.incorrect}</p>
                <p style="margin-top: 1rem;"><strong>Correct answer: ${correctOption.letter}</strong> - ${correctOption.text}</p>
            `;
            
            checkAssessmentCompletion();
        }
    }
    
    feedbackBox.focus();
}

function checkAssessmentCompletion() {
    const totalQuestions = assessmentQuestions.length;
    const answeredQuestions = Object.keys(courseState.assessmentAttempts).length;
    
    if (answeredQuestions === totalQuestions) {
        setTimeout(() => showAssessmentResults(), 2000);
    }
}

function showAssessmentResults() {
    const resultsBox = document.getElementById('assessment-results');
    const resultsContent = document.getElementById('results-content');
    const resultsButton = document.getElementById('results-button');
    const resultsTitle = document.getElementById('results-title');
    
    const percentage = Math.round((courseState.assessmentScore / assessmentQuestions.length) * 100);
    const passed = percentage >= 80;
    
    resultsTitle.textContent = passed ? 'Certification Achieved' : 'Additional Study Required';
    
    resultsContent.innerHTML = `
        <div class="score-display">${percentage}%</div>
        <p><strong>Score: ${courseState.assessmentScore.toFixed(1)} / ${assessmentQuestions.length}</strong></p>
        <p>${passed ? 
            'You have successfully demonstrated competency in AI Ethics & Compliance. Your certification is valid for one year.' : 
            'You did not achieve the required 80% passing score. Please review the training material and retake the assessment. Contact your manager or the Ethics Committee if you have questions.'
        }</p>
    `;
    
    resultsBox.style.display = 'block';
    
    if (passed) {
        resultsButton.style.display = 'inline-flex';
        courseState.progress = 95;
        updateProgress();
    } else {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn-secondary';
        retryBtn.textContent = 'Review Training Material';
        retryBtn.onclick = () => showScreen('training-intro');
        resultsContent.appendChild(retryBtn);
    }
    
    resultsBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('option-btn') || e.target.classList.contains('decision-btn')) {
            const buttons = Array.from(e.target.parentElement.querySelectorAll('button'));
            const currentIndex = buttons.indexOf(e.target);
            
            if (e.key === 'ArrowDown' && currentIndex < buttons.length - 1) {
                e.preventDefault();
                buttons[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                buttons[currentIndex - 1].focus();
            }
        }
    });
}

function submitCompletion() {
    alert('In a production environment, this would submit your completion record to the HR/LMS system.\n\nCertification ID: ' + courseState.employeeId + '\nScore: ' + courseState.assessmentScore.toFixed(1) + '/' + assessmentQuestions.length);
}

window.showScreen = showScreen;
window.checkKnowledge = checkKnowledge;
window.showScenarioOutcome = showScenarioOutcome;
window.checkAssessment = checkAssessment;
window.submitCompletion = submitCompletion;

console.log('%cAI Ethics & Compliance Training', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cEmployee ID: ' + courseState.employeeId, 'color: #14b8a6;');
