// Language strings for different languages
const languageStrings = {
    en: {
        title: "Age Calculator",
        languageLabel: "Select Language:",
        dobLabel: "Date of Birth:",
        toDateLabel: "To Date (optional):",
        calculateBtn: "Calculate Age",
    },
    fr: {
        title: "Calculateur d'Âge",
        languageLabel: "Sélectionner la langue:",
        dobLabel: "Date de naissance:",
        toDateLabel: "À ce jour (facultatif):",
        calculateBtn: "Calculer l'âge",
    },
    sw: {
        title: "Kikokotoo cha Umri",
        languageLabel: "Chagua Lugha:",
        dobLabel: "Tarehe ya Kuzaliwa:",
        toDateLabel: "Kwa Tarehe (hiari):",
        calculateBtn: "Kokotoa Umri",
    }
};

// Function to change the language of the page
function changeLanguage(language) {
    const strings = languageStrings[language];
    document.getElementById("title").textContent = strings.title;
    document.getElementById("languageLabel").textContent = strings.languageLabel;
    document.getElementById("dobLabel").textContent = strings.dobLabel;
    document.getElementById("toDateLabel").textContent = strings.toDateLabel;
    document.getElementById("calculateBtn").textContent = strings.calculateBtn;
}

// Event listener for language selection
document.getElementById("language").addEventListener("change", function () {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
});

// Populate dropdowns for date selections
function populateDropdowns() {
    const dayDropdown = document.getElementById('day');
    const monthDropdown = document.getElementById('month');
    const yearDropdown = document.getElementById('year');

    const toDayDropdown = document.getElementById('toDay');
    const toMonthDropdown = document.getElementById('toMonth');
    const toYearDropdown = document.getElementById('toYear');

    for (let i = 1; i <= 31; i++) {
        const dayOption = new Option(i, i);
        dayDropdown.add(dayOption.cloneNode(true));
        toDayDropdown.add(dayOption.cloneNode(true));
    }

    for (let i = 0; i < 12; i++) {
        const monthName = new Date(0, i).toLocaleString('default', { month: 'long' });
        const monthOption = new Option(monthName, i + 1);
        monthDropdown.add(monthOption.cloneNode(true));
        toMonthDropdown.add(monthOption.cloneNode(true));
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
        const yearOption = new Option(i, i);
        yearDropdown.add(yearOption.cloneNode(true));
        toYearDropdown.add(yearOption.cloneNode(true));
    }
}

document.getElementById('ageForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    if (!day || !month || !year) {
        alert('Please fill in all date fields.');
        return;
    }

    const dob = new Date(year, month - 1, day);

    // Age Calculation
    const today = new Date();
    const age = calculateAge(dob, today);

    // Zodiac
    const zodiac = getZodiacSign(dob);

    const ageOutput = `Your age: ${age.years} years, ${age.months} months, ${age.days} days.`;
    const zodiacOutput = `Zodiac: ${zodiac.name} - ${zodiac.meaning}`;

    document.getElementById('output').textContent = ageOutput;
    document.getElementById('zodiac').textContent = zodiacOutput;

    document.getElementById('output').classList.remove('hidden');
    document.getElementById('zodiac').classList.remove('hidden');
    document.querySelector('.share-section').classList.remove('hidden');
    
    // Store the age and zodiac output for copying later
    document.getElementById('copyResult').setAttribute('data-clipboard-text', `${ageOutput}\n${zodiacOutput}`);
});

function calculateAge(dob, toDate = new Date()) {
    const birthDate = new Date(dob);
    const diff = new Date(toDate - birthDate);

    const years = diff.getUTCFullYear() - 1970;
    const months = diff.getUTCMonth();
    const days = diff.getUTCDate() - 1;

    return { years, months, days };
}

function getZodiacSign(dob) {
    const birthDate = new Date(dob);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;

    const zodiacSigns = [
        { name: 'Capricorn', start: [12, 22], end: [1, 19], meaning: 'Ambitious and disciplined.' },
        { name: 'Aquarius', start: [1, 20], end: [2, 18], meaning: 'Independent and innovative.' },
        { name: 'Pisces', start: [2, 19], end: [3, 20], meaning: 'Empathetic and intuitive.' },
        { name: 'Aries', start: [3, 21], end: [4, 19], meaning: 'Bold and determined.' },
        { name: 'Taurus', start: [4, 20], end: [5, 20], meaning: 'Reliable and practical.' },
        { name: 'Gemini', start: [5, 21], end: [6, 20], meaning: 'Adaptable and curious.' },
        { name: 'Cancer', start: [6, 21], end: [7, 22], meaning: 'Nurturing and emotional.' },
        { name: 'Leo', start: [7, 23], end: [8, 22], meaning: 'Confident and charismatic.' },
        { name: 'Virgo', start: [8, 23], end: [9, 22], meaning: 'Analytical and kind.' },
        { name: 'Libra', start: [9, 23], end: [10, 22], meaning: 'Balanced and diplomatic.' },
        { name: 'Scorpio', start: [10, 23], end: [11, 21], meaning: 'Passionate and resourceful.' },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21], meaning: 'Adventurous and optimistic.' },
    ];

    for (let sign of zodiacSigns) {
        if ((month === sign.start[0] && day >= sign.start[1]) || (month === sign.end[0] && day <= sign.end[1])) {
            return sign;
        }
    }
}

// Copy the result to clipboard
document.getElementById('copyResult').addEventListener('click', function () {
    const resultText = `${document.getElementById('output').textContent}\n${document.getElementById('zodiac').textContent}`;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Result copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
});

populateDropdowns();

// Initialize the page with the default language (English)
changeLanguage('en');
