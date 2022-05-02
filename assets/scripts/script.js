/*  Fetches the first button in the document it is linked to
    (in this case, index.html)
    with the selector
    (in this case, the id "generate")
    and assigns it an object for use in the script
    */
var generateBtn = document.querySelector("#generate");
/*  Function calling another function we write
    generatePassword() returns a value that is stored in in the password variable
    passwordText gets assigned an object via querySelector similar to above
    passwordText object is a textarea, which has a .value property
    passwordText.value gets assigned our password generated by generatePassword()
    */
    function writePassword() {
        // calls our password generating function and assigns var password the return value, which will be an empty string if user canceled out of prompt
        var password = generatePassword();
        // assigns var passwordText our textarea with id of "password"
        var passwordText = document.querySelector("#password");
        // due to the ! logical operator, if empty string is passed through, nothing happens
        if(!password == "") {
            passwordText.value = password;
            // one-time appending of "Password Generated" text above the box containing generated password
            // I tried for a long time to figure out how to style this text but it seems it requires extra stuff like AJAX
            if(typeof onlyOnce === 'undefined') {
                // append the text "Password Generated" after our .card-header, which means text will show up underneath 'Generate a Password'
                document.querySelector('.card-header').append("Password Generated");
                // this becomes true so we don't keep running this if statement, otherwise every time a user generates a password it will keep appending
                onlyOnce = true;
        }
    }
}
// our password generation function
var generatePassword = function() {
    // Initialize returnedPassword as a primitive type string, allowing += assignment to add both numbers and characters to our string
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
    var options = [];
    // Ensure user selected at least one character type using comparisons to ensure all are false
    // This loop's conditions will not return true if user selects at least one character type
    while (!Array.isArray(options) || options.length === 0) {
        // confirms asking for user input on types of characters to include
        if(confirm("Use lower case letters?")) {options.push("lower")};
        if(confirm("Use upper case letters?")) {options.push("upper")};
        if(confirm("Use special characters?")) {options.push("special")};
        if(confirm("Use numbers?")) {options.push("numbers")};
        // User has not selected at least one character type, so we alert them and go back over character types before moving on
        if(!Array.isArray(options) || options.length === 0) {alert("At least one character type must be selected!")};
    }
    // Final user selection about password length
    var passwordLength = prompt("How many characters, from 8 to 128, would you like your password to be?");
    // If user hits cancel, passwordLength will be null and so we return empty string to cancel out of dialogs
    if (passwordLength === null) {
        return;
    }
    // Ensure user selected valid password length and an actual number, but also not a decimal
    while (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength) || passwordLength.includes(".")) {
        passwordLength = prompt(`Invalid entry. You entered \"${passwordLength}\".\nLength must be an integer from 8 to 128 characters.\nHow many characters, from 8 to 128, would you like your password to be?`);
        // If user hits cancel, passwordLength will be null and so we return empty string to cancel out of dialogs
        if (passwordLength === null) {
            return;
        }
    }
    // Iterates a # of times equal to password length specified by user.
    for (i = 0;i < passwordLength;i++) {
        // Switch case with argument of random option from any index of options, which dynamically scales larger depending on user choice
        // Each case refers to a specific type of character, see confirm()s above
        switch(options[Math.floor(Math.random() * options.length)]) {
            case "lower": returnedPassword += chars.lowerCase.charAt(Math.floor(Math.random() * chars.lowerCase.length)); break;
            case "upper": returnedPassword += chars.upperCase.charAt(Math.floor(Math.random() * chars.upperCase.length)); break;
            case "special": returnedPassword += chars.special.charAt(Math.floor(Math.random() * chars.special.length)); break;
            case "numbers": returnedPassword += chars.numbers.charAt(Math.floor(Math.random() * chars.numbers.length)); break;
        }
    }
    // Return our now-generated password
    return returnedPassword;
};
/*  With our assigned button object, when clicked, execute writePassword()
    writePassword() does its thing, which has several confirms and prompts for our user
    These prompts collect criteria from user which are used to generate the password
    returnedPassword is returned by generatePassword which passes that value to the textarea
    We can confirm this chain of events by commenting out the addEventListener and manually calling writePassword()
    */
generateBtn.addEventListener("click", writePassword);
// writePassword();