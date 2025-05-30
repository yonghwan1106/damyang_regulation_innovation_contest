// 담양 DNA 시스템 데모 JavaScript

// Demo state management
let currentStep = 1;
let selectedBusinessType = '';
let demoData = {};

// Business type configurations
const businessTypes = {
    bamboo: {
        name: '죽제품 제조업',
        icon: '🎋',
        color: 'damyang-green',
        description: '대나무 공예품 및 생활용품 제조업',
        permits: ['사업자등록', '제조업신고', '관광체험업신고', '식품위생업신고'],
        timeline: 7,
        mentor: '김대나무 대표 (죽제품공방 15년 경력)'
    },
    agritourism: {
        name: '농촌체험 관광업',
        icon: '🌾',
        color: 'bamboo',
        description: '농촌생활 체험 및 농업활동 관광 프로그램',
        permits: ['사업자등록', '관광사업등록', '농촌민박업신고', '체험활동신고'],
        timeline: 7,
        mentor: '이농촌 대표 (체험농장 12년 경력)'
    },
    'local-food': {
        name: '농특산물 판매업',
        icon: '🌽',
        color: 'rural-gold',
        description: '담양 지역 특산품 가공 및 판매',
        permits: ['사업자등록', '식품제조가공업신고', '온라인판매업신고', '농산물가공업신고'],
        timeline: 7,
        mentor: '박특산 대표 (농산물가공 10년 경력)'
    }
};

// Demo steps configuration
const demoSteps = [
    {
        title: '기본 정보 입력',
        description: 'AI가 사업 정보를 바탕으로 맞춤형 가이드를 제공합니다',
        progress: 25
    },
    {
        title: '필요 서류 확인',
        description: '업종별 특화된 서류 목록을 자동으로 생성합니다',
        progress: 50
    },
    {
        title: '원클릭 신청',
        description: '모든 관련 부서에 동시에 신청서가 제출됩니다',
        progress: 75
    },
    {
        title: '승인 및 완료',
        description: '실시간 알림으로 처리 과정을 확인할 수 있습니다',
        progress: 100
    }
];

// Select business type
function selectBusinessType(type) {
    selectedBusinessType = type;
    demoData = businessTypes[type];
    
    // Update UI
    document.querySelectorAll('.demo-step').forEach(el => {
        el.classList.remove('active');
    });
    event.target.closest('.demo-step').classList.add('active');
    
    // Show demo process
    setTimeout(() => {
        document.getElementById('demo-process').style.display = 'block';
        document.getElementById('ai-assistant').style.display = 'block';
        startDemoProcess();
        
        // Smooth scroll to demo process
        document.getElementById('demo-process').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 500);
}

// Start demo process
function startDemoProcess() {
    currentStep = 1;
    updateProgress();
    loadStepContent();
}

// Update progress bar
function updateProgress() {
    const step = demoSteps[currentStep - 1];
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = step.progress + '%';
    progressText.textContent = `${currentStep}/4 단계`;
}

// Load step content
function loadStepContent() {
    const stepContent = document.getElementById('step-content');
    const step = demoSteps[currentStep - 1];
    
    let content = '';
    
    switch(currentStep) {
        case 1:
            content = generateStep1Content();
            break;
        case 2:
            content = generateStep2Content();
            break;
        case 3:
            content = generateStep3Content();
            break;
        case 4:
            content = generateStep4Content();
            break;
    }
    
    stepContent.innerHTML = content;
    
    // Add auto-progression for demo
    if (currentStep < 4) {
        setTimeout(() => {
            nextStep();
        }, 3000);
    } else {
        // Show results section
        setTimeout(() => {
            document.getElementById('results').style.display = 'block';
            document.getElementById('results').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 2000);
    }
}

// Generate step 1 content
function generateStep1Content() {
    return `
        <div class="text-center mb-8">
            <div class="w-16 h-16 bg-${demoData.color} rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl text-white">${demoData.icon}</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">${demoSteps[0].title}</h3>
            <p class="text-gray-600">${demoSteps[0].description}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <h4 class="font-semibold text-gray-900">사업 정보</h4>
                <div class="space-y-3">
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">사업자명</label>
                        <div class="typing-effect text-gray-900">담양 ${demoData.name}</div>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">사업 분야</label>
                        <div class="text-gray-900">${demoData.description}</div>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-1">사업 위치</label>
                        <div class="text-gray-900">전남 담양군 담양읍 죽향대로 123</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-6">
                <h4 class="font-semibold text-blue-800 mb-4">🤖 AI 분석 결과</h4>
                <div class="space-y-3 text-sm">
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-gray-700">담양 지역특화 업종 확인</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-gray-700">관광시즌 패스트트랙 적용 가능</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-gray-700">멘토링 매칭 대상 확인</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span class="text-gray-700">예상 처리 기간: ${demoData.timeline}일</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate step 2 content
function generateStep2Content() {
    const documents = demoData.permits.map(permit => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm">✓</span>
                </div>
                <span class="font-medium text-gray-900">${permit}</span>
            </div>
            <span class="text-sm text-green-600">자동 생성됨</span>
        </div>
    `).join('');
    
    return `
        <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">${demoSteps[1].title}</h3>
            <p class="text-gray-600">${demoSteps[1].description}</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h4 class="font-semibold text-gray-900 mb-6">필요 서류 목록</h4>
                <div class="space-y-3">
                    ${documents}
                </div>
                
                <div class="mt-6 p-4 bg-green-50 rounded-lg">
                    <h5 class="font-semibold text-green-800 mb-2">🎯 맞춤 가이드</h5>
                    <p class="text-sm text-green-700">
                        ${demoData.name} 특화 서류가 자동으로 준비되었습니다. 
                        담양군 지역특성에 맞는 간소화된 양식을 사용합니다.
                    </p>
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-900 mb-6">서류 준비 현황</h4>
                <div class="space-y-4">
                    ${demoData.permits.map((permit, index) => `
                        <div class="relative">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                    <span class="text-white text-sm">${index + 1}</span>
                                </div>
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-gray-900">${permit}</div>
                                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div class="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                                             style="width: 100%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-6 text-center">
                    <div class="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        모든 서류 준비 완료
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate step 3 content
function generateStep3Content() {
    return `
        <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">${demoSteps[2].title}</h3>
            <p class="text-gray-600">${demoSteps[2].description}</p>
        </div>
        
        <div class="max-w-2xl mx-auto">
            <div class="bg-gradient-to-r from-damyang-green to-bamboo rounded-2xl p-8 text-white text-center mb-8">
                <div class="text-6xl mb-4">🚀</div>
                <h4 class="text-2xl font-bold mb-4">원클릭 신청 진행 중</h4>
                <p class="text-white/90 mb-6">
                    모든 관련 부서에 동시에 신청서가 제출되고 있습니다
                </p>
                
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="bg-white/20 rounded-lg p-3">
                        <div class="font-semibold">관광과</div>
                        <div class="text-green-200">✓ 제출 완료</div>
                    </div>
                    <div class="bg-white/20 rounded-lg p-3">
                        <div class="font-semibold">경제과</div>
                        <div class="text-green-200">✓ 제출 완료</div>
                    </div>
                    <div class="bg-white/20 rounded-lg p-3">
                        <div class="font-semibold">건축과</div>
                        <div class="text-green-200">✓ 제출 완료</div>
                    </div>
                    <div class="bg-white/20 rounded-lg p-3">
                        <div class="font-semibold">보건소</div>
                        <div class="text-green-200">✓ 제출 완료</div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span class="font-medium text-blue-900">신청 번호 생성</span>
                    <span class="text-blue-600">DY-2025-${Math.random().toString().substr(2, 6)}</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span class="font-medium text-green-900">카카오톡 알림 설정</span>
                    <span class="text-green-600">활성화 완료</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span class="font-medium text-yellow-900">예상 완료일</span>
                    <span class="text-yellow-600">2025.06.06</span>
                </div>
            </div>
        </div>
    `;
}

// Generate step 4 content
function generateStep4Content() {
    return `
        <div class="text-center">
            <div class="text-6xl mb-6">🎉</div>
            <h3 class="text-3xl font-bold text-gray-900 mb-4">신청이 완료되었습니다!</h3>
            <p class="text-xl text-gray-600 mb-8">
                담양 DNA 시스템으로 ${demoData.timeline}일 만에 처리 완료
            </p>
            
            <div class="max-w-md mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-2xl p-6 text-white mb-8">
                <h4 class="text-lg font-bold mb-4">처리 결과</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>기존 소요 시간:</span>
                        <span>22일</span>
                    </div>
                    <div class="flex justify-between">
                        <span>DNA 시스템:</span>
                        <span>${demoData.timeline}일</span>
                    </div>
                    <div class="border-t border-green-300 pt-2 flex justify-between font-bold">
                        <span>단축된 시간:</span>
                        <span>${22 - demoData.timeline}일 (68%)</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-50 rounded-lg p-6">
                <h4 class="font-semibold text-blue-900 mb-3">🤝 다음 단계</h4>
                <div class="text-sm text-blue-800 space-y-2">
                    <div>• 멘토링: ${demoData.mentor}</div>
                    <div>• 지역 협회 가입 안내</div>
                    <div>• 관광상품 연계 지원</div>
                    <div>• 디지털 마케팅 교육</div>
                </div>
            </div>
        </div>
    `;
}

// Move to next step
function nextStep() {
    if (currentStep < 4) {
        currentStep++;
        updateProgress();
        loadStepContent();
    }
}

// Start over demo
function startOver() {
    currentStep = 1;
    selectedBusinessType = '';
    document.getElementById('demo-process').style.display = 'none';
    document.getElementById('ai-assistant').style.display = 'none';
    document.getElementById('results').style.display = 'none';
    
    // Reset UI
    document.querySelectorAll('.demo-step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(message);
            addChatMessage(response, 'ai');
        }, 1000);
    }
}

// Ask predefined question
function askQuestion(question) {
    addChatMessage(question, 'user');
    
    setTimeout(() => {
        const response = generateAIResponse(question);
        addChatMessage(response, 'ai');
    }, 1000);
}

// Add chat message
function addChatMessage(message, sender) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3 chat-bubble';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <span class="text-white text-sm">👤</span>
            </div>
            <div class="bg-gray-100 rounded-lg p-4 max-w-md">
                <p class="text-gray-800">${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 bg-damyang-green rounded-full flex items-center justify-center">
                <span class="text-white text-sm">🤖</span>
            </div>
            <div class="bg-white rounded-lg p-4 max-w-md border border-gray-200">
                <p class="text-gray-800">${message}</p>
            </div>
        `;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// Generate AI response
function generateAIResponse(question) {
    const responses = {
        '필요한 서류가 무엇인가요?': `${selectedBusinessType ? businessTypes[selectedBusinessType].name : '선택하신 업종'}의 경우 ${businessTypes[selectedBusinessType]?.permits.join(', ') || '사업자등록, 관련 업종 신고서'} 등이 필요합니다. 담양 특화 간소화 양식을 사용하여 기존보다 50% 적은 서류로 가능합니다.`,
        
        '처리 기간은 얼마나 걸리나요?': `담양 DNA 시스템을 통해 ${selectedBusinessType ? businessTypes[selectedBusinessType].timeline : 7}일 내에 처리됩니다. 기존 22일 대비 68% 단축된 기간입니다. 관광시즌에는 24시간 내 우선 처리도 가능합니다.`,
        
        '수수료는 얼마인가요?': '기본 수수료는 기존과 동일하지만, 담양 특화 업종의 경우 50% 감면 혜택이 있습니다. 또한 원클릭 시스템으로 인한 교통비, 시간비용 절약 효과가 있습니다.',
        
        default: '안녕하세요! 담양 DNA 시스템에 대해 더 자세한 정보가 필요하시면 언제든 문의해주세요. 업종별 맞춤 안내를 제공해드릴 수 있습니다.'
    };
    
    return responses[question] || responses.default;
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Initialize scroll reveals
    if (typeof window.DamyangDNA !== 'undefined') {
        // Use main script's scroll reveal functionality
    }
});

// Export functions for global access
window.selectBusinessType = selectBusinessType;
window.startOver = startOver;
window.sendMessage = sendMessage;
window.askQuestion = askQuestion;