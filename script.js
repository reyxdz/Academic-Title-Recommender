let currentTitles = [];
let currentTitleIndex = 0;

document.getElementById('titleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const paperType = document.getElementById('paperType').value;
    const program = document.getElementById('program').value;
    const generateBtn = document.getElementById('generateBtn');
    const resultContainer = document.getElementById('resultContainer');
    const generatedTitle = document.getElementById('generatedTitle');
    
    if (!paperType || !program) {
        alert('Please select both paper type and program');
        return;
    }
    
    generateBtn.disabled = true;
    resultContainer.classList.add('show');
    
    try {
        const titles = generateSimulatedTitles(paperType, program);
        
        // Store titles and show first one
        currentTitles = titles;
        currentTitleIndex = 0;
        displayCurrentTitle();
        
    } catch (error) {
        resultContainer.classList.add('error');
        generatedTitle.innerHTML = `<div class="error">Error generating titles: ${error.message}</div>`;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Title';
    }
});

// Dice button functionality
document.getElementById('diceBtn').addEventListener('click', function() {
    if (currentTitles.length === 0) return;
    
    const diceBtn = this;
    const diceIcon = diceBtn.querySelector('.dice-icon');
    
    // Disable button during animation
    diceBtn.disabled = true;
    diceBtn.classList.add('rolling');
    
    // Simulate rolling animation
    setTimeout(() => {
        // Move to next title (or random if you prefer)
        currentTitleIndex = (currentTitleIndex + 1) % currentTitles.length;
        // For random: currentTitleIndex = Math.floor(Math.random() * currentTitles.length);
        
        displayCurrentTitle();
        
        // Re-enable button
        diceBtn.disabled = false;
        diceBtn.classList.remove('rolling');
    }, 600);
});

function displayCurrentTitle() {
    const generatedTitle = document.getElementById('generatedTitle');
    const titleCounter = document.getElementById('titleCounter');
    const diceBtn = document.getElementById('diceBtn');
    
    if (currentTitles.length > 0) {
        generatedTitle.textContent = currentTitles[currentTitleIndex];
        titleCounter.textContent = `Title ${currentTitleIndex + 1} of ${currentTitles.length}`;
        diceBtn.style.display = 'flex';
    }
}

// Local title generation function
function generateSimulatedTitles(paperType, program) {
    // Title templates organized by program and paper type
    const titleTemplates = {
        'Mechanical Engineering (BSME)': {
            'thesis': [
                'Advanced Materials for Sustainable Engineering Applications',
                'Optimization of Thermal Systems in Renewable Energy',
                'Finite Element Analysis of Structural Components',
                'Robotics and Automation in Manufacturing Processes',
                'Computational Fluid Dynamics in Aerodynamics'
            ],
            'capstone': [
                'Design and Fabrication of a Solar-Powered Vehicle',
                'Development of a Smart HVAC System for Energy Efficiency',
                '3D Printing Innovations in Mechanical Design',
                'Automated Quality Control System for Manufacturing',
                'Robotic Arm for Precision Assembly Tasks'
            ],
            'research paper': [
                'Impact of Additive Manufacturing on Mechanical Design',
                'Advancements in Composite Materials for Aerospace Applications',
                'Thermal Management Techniques in Electronic Devices',
                'Innovations in Mechatronics Systems Design',
                'Sustainable Practices in Mechanical Engineering'
            ]
        },

        'Business Administration (BSBA)': {
            'thesis': [
                'Impact of Digital Marketing Strategies on Consumer Behavior',
                'Sustainable Business Practices in Emerging Markets',
                'Financial Risk Management in Global Corporations',
                'Leadership Styles and Employee Performance in Organizations',
                'Innovation Management in Technology Startups'
            ],
            'capstone': [
                'Development of a Business Plan for a Startup Company',
                'Market Analysis and Strategic Planning for Small Businesses',
                'E-commerce Platform Development for Local Artisans',
                'Customer Relationship Management System Implementation',
                'Supply Chain Optimization for Retail Businesses'
            ],
            'research paper': [
                'Analysis of Consumer Trends in the Digital Age',
                'Corporate Social Responsibility and Brand Loyalty',
                'Financial Performance Metrics in Publicly Traded Companies',
                'Impact of Globalization on Local Businesses',
                'Entrepreneurship Education and Its Influence on Startup Success'
            ]
        },

        'Information Technology (BSIT)': {
            'thesis': [
                'Cybersecurity Frameworks for Cloud Computing Environments',
                'Big Data Analytics in Business Intelligence Applications',
                'Development of Secure Mobile Applications',
                'Artificial Intelligence in Predictive Analytics',
                'Blockchain Technology for Supply Chain Management'
            ],
            'capstone': [
                'Web Application Development for E-learning Platforms',
                'IoT-Based Smart City Solutions',
                'Data Visualization Dashboard for Business Analytics',
                'Virtual Reality Application for Educational Purposes',
                'Automated Testing Framework for Software Quality Assurance'
            ],
            'research paper': [
                'Trends in Cybersecurity Threats and Mitigation Strategies',
                'Impact of Artificial Intelligence on IT Industry Practices',
                'Cloud Computing Adoption Challenges in Small Enterprises',
                'Ethical Considerations in Data Privacy and Protection',
                'Future Directions in Information Technology Research'
            ]
        },

        'Electrical Engineering (BSEE)': {
            'thesis': [
                'Renewable Energy Systems: Design and Optimization',
                'Smart Grid Technologies for Efficient Power Distribution',
                'Signal Processing Techniques in Communication Systems',
                'Embedded Systems Design for IoT Applications',
                'Power Electronics in Electric Vehicle Charging Systems'
            ],
            'capstone': [
                'Development of a Smart Home Energy Management System',
                'Wireless Sensor Network for Environmental Monitoring',
                'Automated Control System for Industrial Processes',
                'Design of a Low-Power Embedded Device',
                'Real-time Data Acquisition System for Laboratory Experiments'
            ],
            'research paper': [
                'Advancements in Photovoltaic Technology for Solar Energy',
                'Impact of Electric Vehicles on Power Grid Stability',
                'Wireless Communication Protocols for IoT Devices',
                'Energy Storage Solutions for Renewable Energy Systems',
                'Challenges in High Voltage Power Transmission'
            ]
        },

        'Architecture (BS Architecture)': {
            'thesis': [
                'Sustainable Urban Design: Integrating Green Architecture',
                'Adaptive Reuse of Historical Buildings in Modern Cities',
                'Impact of Climate Change on Architectural Design Practices',
                'Smart Building Technologies for Energy Efficiency',
                'Cultural Influences on Contemporary Architectural Styles'
            ],
            'capstone': [
                'Design of a Community Center with Sustainable Features',
                'Urban Park Development for Enhanced Public Spaces',
                'Architectural Visualization of a Mixed-Use Development',
                'Smart Housing Solutions for Low-Income Communities',
                'Innovative Facade Design for High-Rise Buildings'
            ],
            'research paper': [
                'Trends in Sustainable Architecture and Design',
                'Impact of Urbanization on Architectural Heritage',
                'Role of Technology in Modern Architectural Practices',
                'Analysis of Public Spaces in Urban Environments',
                'Future Directions in Architectural Education'
            ]
        },

        'Psychology (BS Psychology)': {
            'thesis': [
                'Cognitive Behavioral Therapy Effectiveness in Treating Anxiety Disorders',
                'Impact of Social Media on Adolescent Mental Health',
                'Neuroscience of Decision Making: A Psychological Perspective',
                'Psychological Resilience in Disaster-Affected Communities',
                'Cross-Cultural Differences in Emotional Expression'
            ],
            'capstone': [
                'Development of a Mental Health Awareness Campaign',
                'Implementation of Mindfulness Programs in Schools',
                'Community-Based Support Systems for Mental Health',
                'Evaluation of Therapy Techniques for PTSD Patients',
                'Designing Interactive Workshops for Stress Management'
            ],
            'research paper': [
                'Trends in Positive Psychology and Well-being',
                'Impact of Parenting Styles on Child Development',
                'Psychological Impacts of Remote Work During Pandemics',
                'Role of Psychology in Enhancing Workplace Productivity',
                'Ethical Considerations in Psychological Research'
            ]
        },

        'Computer Science (BSCS)': {
            'thesis': [
                'Deep Learning Architectures for Image Recognition: A Comprehensive Analysis',
                'Blockchain-Based Secure Voting Systems: Design and Implementation',
                'Machine Learning Approaches to Cybersecurity Threat Detection',
                'Distributed Computing Solutions for Big Data Processing',
                'Natural Language Processing Applications in Educational Technology'
            ],
            'capstone': [
                'Smart Home Automation System Using IoT Technology',
                'Mobile Learning Platform for Computer Science Students',
                'E-commerce Website with Advanced Security Features',
                'Real-time Chat Application with End-to-End Encryption',
                'AI-Powered Code Review and Bug Detection Tool'
            ],
            'research paper': [
                'Comparative Analysis of Web Development Frameworks',
                'Impact of Artificial Intelligence on Software Development Practices',
                'Security Vulnerabilities in Modern Web Applications',
                'Performance Evaluation of Database Management Systems',
                'User Experience Design Principles in Mobile Applications'
            ]
        },
        'Civil Engineering (BSCE)': {
            'thesis': [
                'Seismic Performance Analysis of Steel Frame Structures',
                'Sustainable Concrete Mix Design Using Recycled Materials',
                'Optimization of Highway Pavement Design for Heavy Traffic',
                'Flood Risk Assessment and Management in Urban Areas',
                'Structural Health Monitoring of Bridge Infrastructure'
            ],
            'capstone': [
                'Design of Earthquake-Resistant School Building',
                'Smart Traffic Management System for Urban Intersections',
                'Sustainable Water Treatment Facility Design',
                'Green Building Design with LEED Certification',
                'Pedestrian Bridge Design for Campus Connectivity'
            ],
            'research paper': [
                'Environmental Impact of Construction Materials in Infrastructure',
                'Cost-Benefit Analysis of Green Building Technologies',
                'Climate Change Effects on Civil Engineering Infrastructure',
                'Innovation in Construction Project Management Methodologies',
                'Safety Management Systems in Large-Scale Construction Projects'
            ]
        },
        'Education (BSED)': {
            'thesis': [
                'Technology Integration Effects on Elementary Mathematics Achievement',
                'Inclusive Education Practices for Students with Learning Disabilities',
                'Teacher Professional Development in Digital Literacy',
                'Assessment Methods in Competency-Based Learning Environments',
                'Parent Involvement Impact on Student Academic Performance'
            ],
            'capstone': [
                'Interactive Digital Learning Modules for Science Education',
                'Classroom Management Strategies for Diverse Learning Needs',
                'Community-Based Learning Program for Social Studies',
                'Peer Tutoring System Implementation in Mathematics',
                'Arts Integration Curriculum for Elementary Education'
            ],
            'research paper': [
                'Online Learning Effectiveness During Remote Education',
                'Cultural Responsiveness in Curriculum Development',
                'Student Engagement Strategies in Virtual Classrooms',
                'Educational Technology Tools for Special Needs Students',
                'Teacher Burnout and Job Satisfaction in Public Schools'
            ]
        },

        'Nursing (BSN)': {
            'thesis': [
                'Impact of Telehealth on Patient Outcomes in Rural Areas',
                'Nursing Interventions for Chronic Pain Management',
                'Patient Education Strategies for Diabetes Management',
                'Cultural Competence in Nursing Practice',
                'Mental Health Nursing: Approaches to Crisis Intervention'
            ],
            'capstone': [
                'Development of a Patient-Centered Care Model',
                'Implementation of Evidence-Based Practices in Nursing',
                'Community Health Program for Preventive Care',
                'Simulation-Based Training for Emergency Response',
                'Quality Improvement Project in Hospital Infection Control'
            ],
            'research paper': [
                'Trends in Nursing Education and Professional Development',
                'Impact of Work Environment on Nurse Retention',
                'Patient Safety Culture in Healthcare Organizations',
                'Ethical Dilemmas in Nursing Practice',
                'Advancements in Nursing Informatics'
            ]
        }
    };

    // Get titles for the specific program and paper type
    const programTitles = titleTemplates[program];
    if (programTitles && programTitles[paperType]) {
        return programTitles[paperType];
    }
}