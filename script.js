function navigateTo(category) {
    window.location.href = `converters.html?category=${category}`;
}

function goBack() {
    window.location.href = 'index.html';
}

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
        document.getElementById('category-title').textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Converters`;
        populateUnits(category);
    }
});

function populateUnits(category) {
    const units = {
        length: ['Meters', 'Feet', 'Kilometers', 'Miles', 'Centimeters', 'Inches', 'Millimeters', 'Yards', 'Nautical Miles'],
        area: ['Square Meters', 'Square Feet', 'Hectares', 'Acres', 'Square Kilometers', 'Square Miles', 'Square Centimeters', 'Square Inches'],
        volume: ['Liters', 'Gallons', 'Milliliters', 'Fluid Ounces', 'Cubic Meters', 'Cubic Feet', 'Cubic Centimeters', 'Cubic Inches', 'Pints', 'Quarts'],
        mass: ['Kilograms', 'Pounds', 'Grams', 'Ounces', 'Metric Tons', 'Tons', 'Milligrams', 'Grains', 'Stones'],
        temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
        time: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years'],
        speed: ['Kilometers per Hour', 'Miles per Hour', 'Meters per Second', 'Feet per Second', 'Knots'],
        pressure: ['Pascals', 'PSI', 'Bar', 'Atmosphere', 'mmHg', 'Torr'],
        energy: ['Joules', 'Calories', 'Kilowatt Hours', 'Megajoules', 'BTU', 'Electronvolts'],
        power: ['Watts', 'Horsepower', 'Kilowatts', 'Megawatts'],
        data: ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Terabytes'],
        frequency: ['Hertz', 'Kilohertz', 'Megahertz', 'Gigahertz'],
        currency: ['USD', 'EUR', 'GBP', 'JPY'],
        cooking: ['Teaspoons', 'Tablespoons', 'Cups', 'Ounces', 'Milliliters'],
        fuel: ['Miles per Gallon', 'Liters per 100 Kilometers', 'Kilometers per Liter']
    };

    const fromSelect = document.getElementById('from-unit');
    const toSelect = document.getElementById('to-unit');
    units[category].forEach(unit => {
        let option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromSelect.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toSelect.appendChild(option2);
    });
}

function convert() {
    const fromUnit = document.getElementById('from-unit').value;
    const toUnit = document.getElementById('to-unit').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    let result = 0;

    if (isNaN(inputValue)) {
        document.getElementById('result').textContent = 'Please enter a valid number';
        document.getElementById('result').style.display = 'block';
        return;
    }

    const conversionFactors = {
        length: {
            Meters: { Feet: 3.28084, Kilometers: 0.001, Miles: 0.000621371, Centimeters: 100, Inches: 39.3701, Millimeters: 1000, Yards: 1.09361, 'Nautical Miles': 0.000539957 },
            Feet: { Meters: 0.3048, Kilometers: 0.0003048, Miles: 0.000189394, Centimeters: 30.48, Inches: 12, Millimeters: 304.8, Yards: 0.333333, 'Nautical Miles': 0.000164579 },
            Kilometers: { Meters: 1000, Feet: 3280.84, Miles: 0.621371, Centimeters: 100000, Inches: 39370.1, Millimeters: 1000000, Yards: 1093.61, 'Nautical Miles': 0.539957 },
            Miles: { Meters: 1609.34, Feet: 5280, Kilometers: 1.60934, Centimeters: 160934, Inches: 63360, Millimeters: 1609340, Yards: 1760, 'Nautical Miles': 0.868976 },
            Centimeters: { Meters: 0.01, Feet: 0.0328084, Kilometers: 0.00001, Miles: 0.0000062137, Inches: 0.393701, Millimeters: 10, Yards: 0.0109361, 'Nautical Miles': 0.00000539957 },
            Inches: { Meters: 0.0254, Feet: 0.0833333, Kilometers: 0.0000254, Miles: 0.0000157828, Centimeters: 2.54, Millimeters: 25.4, Yards: 0.0277778, 'Nautical Miles': 0.0000137149 },
            Millimeters: { Meters: 0.001, Feet: 0.00328084, Kilometers: 0.000001, Miles: 0.000000621371, Centimeters: 0.1, Inches: 0.0393701, Yards: 0.00109361, 'Nautical Miles': 0.000000539957 },
            Yards: { Meters: 0.9144, Feet: 3, Kilometers: 0.0009144, Miles: 0.000568182, Centimeters: 91.44, Inches: 36, Millimeters: 914.4, 'Nautical Miles': 0.000493737 },
            'Nautical Miles': { Meters: 1852, Feet: 6076.12, Kilometers: 1.852, Miles: 1.15078, Centimeters: 185200, Inches: 72913.4, Millimeters: 1852000, Yards: 2025.37 }
        },
        area: {
            'Square Meters': { 'Square Feet': 10.7639, 'Hectares': 0.0001, 'Acres': 0.000247105, 'Square Kilometers': 0.000001, 'Square Miles': 0.000000386102, 'Square Centimeters': 10000, 'Square Inches': 1550 },
            'Square Feet': { 'Square Meters': 0.092903, 'Hectares': 0.0000092903, 'Acres': 0.0000229568, 'Square Kilometers': 0.000000092903, 'Square Miles': 0.0000000358701, 'Square Centimeters': 929.03, 'Square Inches': 144 },
            'Hectares': { 'Square Meters': 10000, 'Square Feet': 107639, 'Acres': 2.47105, 'Square Kilometers': 0.01, 'Square Miles': 0.00386102, 'Square Centimeters': 100000000, 'Square Inches': 15500031 },
            'Acres': { 'Square Meters': 4046.86, 'Square Feet': 43560, 'Hectares': 0.404686, 'Square Kilometers': 0.00404686, 'Square Miles': 0.0015625, 'Square Centimeters': 40468600, 'Square Inches': 6272640 },
            'Square Kilometers': { 'Square Meters': 1000000, 'Square Feet': 10763910, 'Hectares': 100, 'Acres': 247.105, 'Square Miles': 0.386102, 'Square Centimeters': 10000000000, 'Square Inches': 1550000000 },
            'Square Miles': { 'Square Meters': 2589988, 'Square Feet': 27878400, 'Hectares': 258.999, 'Acres': 640, 'Square Kilometers': 2.58999, 'Square Centimeters': 25899881100, 'Square Inches': 4014489600 },
            'Square Centimeters': { 'Square Meters': 0.0001, 'Square Feet': 0.00107639, 'Hectares': 0.00000001, 'Acres': 0.0000000247105, 'Square Kilometers': 0.0000000001, 'Square Miles': 0.0000000000386102, 'Square Inches': 0.155 },
            'Square Inches': { 'Square Meters': 0.00064516, 'Square Feet': 0.00694444, 'Hectares': 0.000000064516, 'Acres': 0.000000159422, 'Square Kilometers': 0.00000000064516, 'Square Miles': 0.000000000249097, 'Square Centimeters': 6.4516 }
        },
        volume: {
            Liters: { Gallons: 0.264172, Milliliters: 1000, 'Fluid Ounces': 33.814, 'Cubic Meters': 0.001, 'Cubic Feet': 0.0353147, 'Cubic Centimeters': 1000, 'Cubic Inches': 61.0237, Pints: 2.11338, Quarts: 1.05669 },
            Gallons: { Liters: 3.78541, Milliliters: 3785.41, 'Fluid Ounces': 128, 'Cubic Meters': 0.00378541, 'Cubic Feet': 0.133681, 'Cubic Centimeters': 3785.41, 'Cubic Inches': 231, Pints: 8, Quarts: 4 },
            Milliliters: { Liters: 0.001, Gallons: 0.000264172, 'Fluid Ounces': 0.033814, 'Cubic Meters': 0.000001, 'Cubic Feet': 0.0000353147, 'Cubic Centimeters': 1, 'Cubic Inches': 0.0610237, Pints: 0.00211338, Quarts: 0.00105669 },
            'Fluid Ounces': { Liters: 0.0295735, Gallons: 0.0078125, Milliliters: 29.5735, 'Cubic Meters': 0.0000295735, 'Cubic Feet': 0.00104438, 'Cubic Centimeters': 29.5735, 'Cubic Inches': 1.80469, Pints: 0.0625, Quarts: 0.03125 },
            'Cubic Meters': { Liters: 1000, Gallons: 264.172, Milliliters: 1000000, 'Fluid Ounces': 33814, 'Cubic Feet': 35.3147, 'Cubic Centimeters': 1000000, 'Cubic Inches': 61023.7, Pints: 2113.38, Quarts: 1056.69 },
            'Cubic Feet': { Liters: 28.3168, Gallons: 7.48052, Milliliters: 28316.8, 'Fluid Ounces': 957.506, 'Cubic Meters': 0.0283168, 'Cubic Centimeters': 28316.8, 'Cubic Inches': 1728, Pints: 59.8442, Quarts: 29.9221 },
            'Cubic Centimeters': { Liters: 0.001, Gallons: 0.000264172, Milliliters: 1, 'Fluid Ounces': 0.033814, 'Cubic Meters': 0.000001, 'Cubic Feet': 0.0000353147, 'Cubic Inches': 0.0610237, Pints: 0.00211338, Quarts: 0.00105669 },
            'Cubic Inches': { Liters: 0.0163871, Gallons: 0.004329, Milliliters: 16.3871, 'Fluid Ounces': 0.554113, 'Cubic Meters': 0.0000163871, 'Cubic Feet': 0.000578704, 'Cubic Centimeters': 16.3871, Pints: 0.034632, Quarts: 0.017316 },
            Pints: { Liters: 0.473176, Gallons: 0.125, Milliliters: 473.176, 'Fluid Ounces': 16, 'Cubic Meters': 0.000473176, 'Cubic Feet': 0.0167101, 'Cubic Centimeters': 473.176, 'Cubic Inches': 28.875, Quarts: 0.5 },
            Quarts: { Liters: 0.946353, Gallons: 0.25, Milliliters: 946.353, 'Fluid Ounces': 32, 'Cubic Meters': 0.000946353, 'Cubic Feet': 0.0334201, 'Cubic Centimeters': 946.353, 'Cubic Inches': 57.75, Pints: 2 }
        },
        mass: {
            Kilograms: { Pounds: 2.20462, Grams: 1000, Ounces: 35.274, 'Metric Tons': 0.001, Tons: 0.00110231, Milligrams: 1000000, Grains: 15432.4, Stones: 0.157473 },
            Pounds: { Kilograms: 0.453592, Grams: 453.592, Ounces: 16, 'Metric Tons': 0.000453592, Tons: 0.0005, Milligrams: 453592, Grains: 7000, Stones: 0.0714286 },
            Grams: { Kilograms: 0.001, Pounds: 0.00220462, Ounces: 0.035274, 'Metric Tons': 0.000001, Tons: 0.00000110231, Milligrams: 1000, Grains: 15.4324, Stones: 0.000157473 },
            Ounces: { Kilograms: 0.0283495, Pounds: 0.0625, Grams: 28.3495, 'Metric Tons': 0.0000283495, Tons: 0.00003125, Milligrams: 28349.5, Grains: 437.5, Stones: 0.00446429 },
            'Metric Tons': { Kilograms: 1000, Pounds: 2204.62, Grams: 1000000, Ounces: 35274, Tons: 1.10231, Milligrams: 1000000000, Grains: 15432358.4, Stones: 157.473 },
            Tons: { Kilograms: 907.185, Pounds: 2000, Grams: 907185, Ounces: 32000, 'Metric Tons': 0.907185, Milligrams: 907185000, Grains: 14000000, Stones: 142.857 },
            Milligrams: { Kilograms: 0.000001, Pounds: 0.00000220462, Grams: 0.001, Ounces: 0.000035274, 'Metric Tons': 0.000000001, Tons: 0.00000000110231, Grains: 0.0154324, Stones: 0.000000157473 },
            Grains: { Kilograms: 0.0000647989, Pounds: 0.000142857, Grams: 0.0647989, Ounces: 0.00228571, 'Metric Tons': 0.0000000647989, Tons: 0.0000000714286, Milligrams: 64.7989, Stones: 0.00000994296 },
            Stones: { Kilograms: 6.35029, Pounds: 14, Grams: 6350.29, Ounces: 224, 'Metric Tons': 0.00635029, Tons: 0.007, Milligrams: 6350290, Grains: 98000 }
        },
        temperature: {
            Celsius: { Fahrenheit: (inputValue) => (inputValue * 9 / 5) + 32, Kelvin: (inputValue) => inputValue + 273.15 },
            Fahrenheit: { Celsius: (inputValue) => (inputValue - 32) * 5 / 9, Kelvin: (inputValue) => (inputValue - 32) * 5 / 9 + 273.15 },
            Kelvin: { Celsius: (inputValue) => inputValue - 273.15, Fahrenheit: (inputValue) => (inputValue - 273.15) * 9 / 5 + 32 }
        },
        time: {
            Seconds: { Minutes: 1 / 60, Hours: 1 / 3600, Days: 1 / 86400, Weeks: 1 / 604800, Months: 1 / 2628000, Years: 1 / 31536000 },
            Minutes: { Seconds: 60, Hours: 1 / 60, Days: 1 / 1440, Weeks: 1 / 10080, Months: 1 / 43800, Years: 1 / 525600 },
            Hours: { Seconds: 3600, Minutes: 60, Days: 1 / 24, Weeks: 1 / 168, Months: 1 / 730, Years: 1 / 8760 },
            Days: { Seconds: 86400, Minutes: 1440, Hours: 24, Weeks: 1 / 7, Months: 1 / 30.417, Years: 1 / 365 },
            Weeks: { Seconds: 604800, Minutes: 10080, Hours: 168, Days: 7, Months: 1 / 4.345, Years: 1 / 52.143 },
            Months: { Seconds: 2628000, Minutes: 43800, Hours: 730, Days: 30.417, Weeks: 4.345, Years: 1 / 12 },
            Years: { Seconds: 31536000, Minutes: 525600, Hours: 8760, Days: 365, Weeks: 52.143, Months: 12 }
        },
        speed: {
            'Kilometers per Hour': { 'Miles per Hour': 0.621371, 'Meters per Second': 0.277778, 'Feet per Second': 0.911344, Knots: 0.539957 },
            'Miles per Hour': { 'Kilometers per Hour': 1.60934, 'Meters per Second': 0.44704, 'Feet per Second': 1.46667, Knots: 0.868976 },
            'Meters per Second': { 'Kilometers per Hour': 3.6, 'Miles per Hour': 2.23694, 'Feet per Second': 3.28084, Knots: 1.94384 },
            'Feet per Second': { 'Kilometers per Hour': 1.09728, 'Miles per Hour': 0.681818, 'Meters per Second': 0.3048, Knots: 0.592484 },
            Knots: { 'Kilometers per Hour': 1.852, 'Miles per Hour': 1.15078, 'Meters per Second': 0.514444, 'Feet per Second': 1.68781 }
        },
        pressure: {
            Pascals: { PSI: 0.000145038, Bar: 0.00001, Atmosphere: 0.00000986923, mmHg: 0.00750062, Torr: 0.00750062 },
            PSI: { Pascals: 6894.76, Bar: 0.0689476, Atmosphere: 0.068046, mmHg: 51.7149, Torr: 51.7149 },
            Bar: { Pascals: 100000, PSI: 14.5038, Atmosphere: 0.986923, mmHg: 750.062, Torr: 750.062 },
            Atmosphere: { Pascals: 101325, PSI: 14.6959, Bar: 1.01325, mmHg: 760, Torr: 760 },
            mmHg: { Pascals: 133.322, PSI: 0.0193368, Bar: 0.00133322, Atmosphere: 0.00131579, Torr: 1 },
            Torr: { Pascals: 133.322, PSI: 0.0193368, Bar: 0.00133322, Atmosphere: 0.00131579, mmHg: 1 }
        },
        energy: {
            Joules: { Calories: 0.239006, 'Kilowatt Hours': 0.000000277778, Megajoules: 0.000001, BTU: 0.000947817, Electronvolts: 6.242e+18 },
            Calories: { Joules: 4.184, 'Kilowatt Hours': 0.00000116222, Megajoules: 0.000004184, BTU: 0.00396567, Electronvolts: 2.611e+19 },
            'Kilowatt Hours': { Joules: 3600000, Calories: 860420, Megajoules: 3.6, BTU: 3412.14, Electronvolts: 2.247e+22 },
            Megajoules: { Joules: 1000000, Calories: 239006, 'Kilowatt Hours': 0.277778, BTU: 947.817, Electronvolts: 6.242e+24 },
            BTU: { Joules: 1055.06, Calories: 252.164, 'Kilowatt Hours': 0.000293071, Megajoules: 0.00105506, Electronvolts: 6.585e+21 },
            Electronvolts: { Joules: 1.60218e-19, Calories: 3.8293e-20, 'Kilowatt Hours': 4.4505e-26, Megajoules: 1.60218e-25, BTU: 1.5186e-22 }
        },
        power: {
            Watts: { Horsepower: 0.00134102, Kilowatts: 0.001, Megawatts: 0.000001 },
            Horsepower: { Watts: 745.7, Kilowatts: 0.7457, Megawatts: 0.0007457 },
            Kilowatts: { Watts: 1000, Horsepower: 1.34102, Megawatts: 0.001 },
            Megawatts: { Watts: 1000000, Horsepower: 1341.02, Kilowatts: 1000 }
        },
        data: {
            Bytes: { Kilobytes: 0.001, Megabytes: 0.000001, Gigabytes: 0.000000001, Terabytes: 0.000000000001 },
            Kilobytes: { Bytes: 1000, Megabytes: 0.001, Gigabytes: 0.000001, Terabytes: 0.000000001 },
            Megabytes: { Bytes: 1000000, Kilobytes: 1000, Gigabytes: 0.001, Terabytes: 0.000001 },
            Gigabytes: { Bytes: 1000000000, Kilobytes: 1000000, Megabytes: 1000, Terabytes: 0.001 },
            Terabytes: { Bytes: 1000000000000, Kilobytes: 1000000000, Megabytes: 1000000, Gigabytes: 1000 }
        },
        frequency: {
            Hertz: { Kilohertz: 0.001, Megahertz: 0.000001, Gigahertz: 0.000000001 },
            Kilohertz: { Hertz: 1000, Megahertz: 0.001, Gigahertz: 0.000001 },
            Megahertz: { Hertz: 1000000, Kilohertz: 1000, Gigahertz: 0.001 },
            Gigahertz: { Hertz: 1000000000, Kilohertz: 1000000, Megahertz: 1000 }
        },
        currency: {
            // Example conversion rates (for real applications, use API to get current rates)
            USD: { EUR: 0.85, GBP: 0.75, JPY: 110 },
            EUR: { USD: 1.18, GBP: 0.88, JPY: 130 },
            GBP: { USD: 1.33, EUR: 1.14, JPY: 150 },
            JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0067 }
        },
        cooking: {
            Teaspoons: { Tablespoons: 0.333333, Cups: 0.0208333, Ounces: 0.166667, Milliliters: 4.92892 },
            Tablespoons: { Teaspoons: 3, Cups: 0.0625, Ounces: 0.5, Milliliters: 14.7868 },
            Cups: { Teaspoons: 48, Tablespoons: 16, Ounces: 8, Milliliters: 236.588 },
            Ounces: { Teaspoons: 6, Tablespoons: 2, Cups: 0.125, Milliliters: 29.5735 },
            Milliliters: { Teaspoons: 0.202884, Tablespoons: 0.067628, Cups: 0.00422675, Ounces: 0.033814 }
        },
        fuel: {
            'Miles per Gallon': { 'Liters per 100 Kilometers': (inputValue) => 235.215 / inputValue, 'Kilometers per Liter': (inputValue) => inputValue / 2.35215 },
            'Liters per 100 Kilometers': { 'Miles per Gallon': (inputValue) => 235.215 / inputValue, 'Kilometers per Liter': (inputValue) => 100 / inputValue },
            'Kilometers per Liter': { 'Miles per Gallon': (inputValue) => inputValue * 2.35215, 'Liters per 100 Kilometers': (inputValue) => 100 / inputValue }
        }
    };

    const category = Object.keys(conversionFactors).find(cat => conversionFactors[cat][fromUnit]);

    if (category) {
        if (typeof conversionFactors[category][fromUnit][toUnit] === 'function') {
            result = conversionFactors[category][fromUnit][toUnit](inputValue);
        } else {
            result = inputValue * conversionFactors[category][fromUnit][toUnit];
        }
    } else {
        result = 'Conversion not supported';
    }

    document.getElementById('result').textContent = `Result: ${result}`;
    document.getElementById('result').style.display = 'block';
}
