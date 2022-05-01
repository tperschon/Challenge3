// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");
    
    passwordText.value = password;

}

var generatePassword = function() {

    // Initialize as a primitive type string, allowing += assignment to add both numbers and characters to our string
    // This value will be returned by function
    var returnedPassword = "";

    // Store all possible characters that could be used in password generation
    var chars = {
        lowerCase: "abcdefghijklmnopqrstuvwxyz",
        upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        special: "`~!@#$%^&*()_+-=[]{};':\\\",.<>/?|",
        numbers: "0123456789"
    }
    // Store answers user gives about whether to use particular criteria
    var useLowerCase = confirm("Use lower case letters?");
    var useUpperCase = confirm("Use upper case letters?");
    var useSpecial = confirm("Use special characters?");
    var useNumbers = confirm("Use numbers?");

    // Ensure user selected at least one character type
    while (!useLowerCase && !useUpperCase && !useSpecial && !useNumbers) {
        alert("At least one character type must be selected!");
        useLowerCase = confirm("Use lower case letters?");
        useUpperCase = confirm("Use upper case letters?");
        useSpecial = confirm("Use special characters?");
        useNumbers = confirm("Use numbers?");
    }

    // Final user selection about password length
    var passwordLength = prompt("How many characters, from 8 to 128, would you like your password to be?");
    
    // Ensure user selected valid password length and an actual number, but also not a decimal
    while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength) || passwordLength.includes(".")) {
        passwordLength = prompt(`Invalid entry. You entered ${passwordLength}.\nLength must be an integer from 8 to 128 characters.\nHow many characters, from 8 to 128, would you like your password tp be?`);
    }

    // Iterates a # of times equal to password length specified by user.
    for (i = 0;i < passwordLength;i++) {

        // Generate # between 1 and 3, which corresponds to the types of characters a person can choose
        var typePicker = Math.floor(Math.random() * 4);

        // Use switch case for randomly generated number. Basically the same as if-else but I like switch.
        switch (typePicker) {

            case 0:
                // Validation for character type.
                // If false, decrement i so we don't shorten string for random cases that aren't valid for chosen character types.
                if(useLowerCase) {
                    var picked = chars.lowerCase.charAt(Math.floor(Math.random() * chars.lowerCase.length));
                    returnedPassword += picked;
                }
                else { 
                    i-- 
                }

                break;

            case 1:
                if(useUpperCase) {
                    var picked = chars.upperCase.charAt(Math.floor(Math.random() * chars.upperCase.length));
                    returnedPassword += picked;
                }
                else {
                    i--
                }
                break;

            case 2:
                if(useSpecial) {
                    var picked = chars.special.charAt(Math.floor(Math.random() * chars.special.length));
                    returnedPassword += picked;
                }
                else {
                    i--
                }

                break;

            case 3:
                if(useNumbers) {
                    var picked = chars.numbers.charAt(Math.floor(Math.random() * chars.numbers.length));
                    returnedPassword += picked;
                }
                else {
                    i-- 
                }
                break;
        };
    }
    // Return 
    return returnedPassword;
};

generateBtn.addEventListener("click", writePassword);