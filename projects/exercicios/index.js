// Função para converter números arábicos em números romanos
function arabicToRoman(arabicNumber) {
    const romanMap = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    let romanNumber = '';
    for (let key in romanMap) {
        while (arabicNumber >= romanMap[key]) {
            romanNumber += key;
            arabicNumber -= romanMap[key];
        }
    }
    return romanNumber;
}

// Função para converter números romanos em números arábicos
function romanToArabic(romanNumber) {
    const romanMap = {
        M: 1000,
        D: 500,
        C: 100,
        L: 50,
        X: 10,
        V: 5,
        I: 1
    };

    let arabicNumber = 0;
    for (let i = 0; i < romanNumber.length; i++) {
        const currentChar = romanNumber[i];
        const currentValue = romanMap[currentChar];
        const nextChar = romanNumber[i + 1];
        const nextValue = romanMap[nextChar];

        if (nextValue && currentValue < nextValue) {
            arabicNumber -= currentValue;
        } else {
            arabicNumber += currentValue;
        }
    }
    return arabicNumber;
}

// Função para processar a conversão quando o formulário for enviado
function convertNumber() {
    const numberInput = document.getElementById('number-input').value;
    const conversionType = document.getElementById('conversion-type').value;
    let convertedNumber = '';

    if (conversionType === 'arabic-to-roman') {
        convertedNumber = arabicToRoman(parseInt(numberInput));
    } else if (conversionType === 'roman-to-arabic') {
        convertedNumber = romanToArabic(numberInput);
    }

    document.getElementById('result').innerHTML = `Resultado: ${convertedNumber}`;
}








