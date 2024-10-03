// MY CODES START FROM HERE

// press calculate to run this function: this function will take in the data values from GPA_dictionary
// based on the univeristy from user input, this function will return the calcualated GPA
function calculateGPA() {
    target = './GPA_dictionary.json';
    axios.get(target)
        .then(response => {
            // retrieve data from the dictionary for each uni's grade : gpa 
            // console.log(response.data); 
            let inputUni = document.getElementById('university').value;
            let displayMsg = document.getElementById('displayMsg');
            let numSelected = document.getElementById('moduleCount').value;
            if (!numSelected) {
                alert('Please select the number of modules you have taken.');
                return;
            }
            numSelected = parseInt(numSelected);
            let textFieldsList = document.querySelectorAll('#moduleInputs input');


            // for SMU:
            // SMU's cumulative GPA calculation: sum of GPA of all mods divide by number of mods
            if (inputUni == 'smu') {
                let sum = 0;
                var uniDicts = response.data;
                let uniObj = uniDicts[0];
                for (dict of uniDicts) {
                    if (dict.hasOwnProperty(inputUni)) {
                        uniObj = dict[inputUni];
                    }
                }
                // console.log(uniObj)
                let i = 0
                while (i < numSelected) {
                    // ensure user's input is valid first (can be found in the dictionary)
                    let gradeEntered = textFieldsList[i].value.trim().toUpperCase();
                    if (typeof gradeEntered == "string" && uniObj.hasOwnProperty(gradeEntered)) {
                        // console.log(uniObj[gradeEntered]);
                        sum += uniObj[gradeEntered];
                    }
                    else {
                        alert('Please ensure the grade entered for module ' + (parseInt(i) + 1) + " is valid!");
                        return;
                    }

                    i++;
                }

                let cumulativeGPA = sum / numSelected;
                if (cumulativeGPA > 4.0) {
                    cumulativeGPA = 4.0;
                }
                cumulativeGPA = cumulativeGPA.toFixed(2);
                // display the result in the displayMsg div:
                displayMsg = document.getElementById('displayMsg');
                displayMsg.innerText = "Your cumulative GPA is " + cumulativeGPA + " out of 4.00";
                if(cumulativeGPA >= 3.8 ){
                    alert('Your will get Summa Cum Laude! You sir, are a genius!');
                }
                else if(3.79 >= cumulativeGPA && cumulativeGPA >= 3.6){
                    alert('Your will get Magna Cum Laude! Keep up and you will become dean lister!');
                }
                else if(3.59 >= cumulativeGPA && cumulativeGPA >= 3.4){
                    alert('Your will get Cum Laude! Higher employment rate and starting salary awaits you!');
                }
                else if(3.39 >= cumulativeGPA && cumulativeGPA >= 3.2){
                    alert('Your will get High Merit!');
                }
                else if(3.19 >= cumulativeGPA && cumulativeGPA >= 3.0){
                    alert('Your will get Merit!');
                }

            }
            // for other unis
            // other uni's cumulative gpa = sum of (grade point * credit) divide by total credits
            else {
                let totalGPA = 0;
                let totalCredits = 0;
                var uniDicts = response.data;
                let uniObj = uniDicts[0];
                for (dict of uniDicts) {
                    if (dict.hasOwnProperty(inputUni)) {
                        uniObj = dict[inputUni];
                    }
                }
                // console.log(uniObj)
                let i = 0;
                let j = 1;
                let m = 0;
                while (i <= numSelected * 2 && j <= numSelected * 2) {
                    // ensure user's input is valid first (can be found in the dictionary)
                    let gradeEntered = textFieldsList[i].value.trim().toUpperCase();
                    let creditEntered = textFieldsList[j].value;
                    if (typeof gradeEntered == "string" && uniObj.hasOwnProperty(gradeEntered)) {
                        let thisGPA = uniObj[gradeEntered];
                        creditEntered = parseFloat(creditEntered);
                        if (creditEntered < 10 && creditEntered > 0) {
                            totalCredits += creditEntered;
                            totalGPA += creditEntered * thisGPA;
                        }
                        else {
                            alert('Please ensure the credit entered for module ' + (parseInt(m) + 1) + " is valid! Your credit entered for the mod is either too large or too small!");
                            return;
                        }
                    }
                    else {
                        alert('Please ensure the grade entered for module ' + (parseInt(i) + 1) + " is valid!");
                        return;
                    }
                    m ++;
                    i += 2;
                    j += 2;
                }

                let cumulativeGPA = totalGPA / totalCredits;
                cumulativeGPA = cumulativeGPA.toFixed(2);
                // display the result in the displayMsg div:
                displayMsg = document.getElementById('displayMsg');
                displayMsg.innerText = "Your cumulative GPA is " + cumulativeGPA + " out of 5.00";
            }


        })
        .catch(error => {
            console.error(error);
        });
}


// when user select a number k, this function will generate k text fields for user to enter his grades
function generateInputFields() {
    let displayMsg = document.getElementById('displayMsg');
    displayMsg.replaceChildren();
    var schoolSelectd = document.getElementById('university').value;
    var num_mod = document.getElementById('moduleCount').value;
    // just wanna be funny LMAO
    if (num_mod > 6) {
        alert("WOW You are crazy taking so many mods within one SEM?!")
    }
    // end of funny
    var modInputEle = document.getElementById('moduleInputs');
    modInputEle.replaceChildren();

    // for SMU:
    if (schoolSelectd == 'smu') {
        let i = 1;
        while (i <= num_mod) {
            let moduleDiv = document.createElement('div');
            moduleDiv.classList.add('module');

            let label = document.createElement('label');
            label.textContent = 'Enter grade for module ' + i + ': ';

            // SMU only needs to take account for the number of mods and grade of each mod
            let input = document.createElement('input');
            input.type = 'text';
            input.id = 'grade' + i;
            input.style.maxWidth = "25%";
            input.style.display = "inline";
            input.setAttribute('required', true);
            input.classList.add('form-control');
            input.placeholder = 'A+, B, C-, etc.';

            moduleDiv.appendChild(label);
            moduleDiv.appendChild(input);
            modInputEle.appendChild(moduleDiv);
            i++;
        }
    }

    // for other unis:
    else {
        let i = 1;
        while (i <= num_mod) {
            let moduleDiv = document.createElement('div');
            moduleDiv.classList.add('module');

            let label1 = document.createElement('label');
            label1.textContent = 'Enter grade for module ' + i + ': ';

            let input1 = document.createElement('input');
            input1.type = 'text';
            input1.id = 'grade' + i;
            input1.style.maxWidth = "25%";
            input1.style.display = "inline";
            input1.setAttribute('required', true);
            input1.classList.add('form-control');
            input1.placeholder = 'A+, B, C-, etc.';

            // beside the grade of each mod, other unis must take consideration of credit worth of each mod
            let label2 = document.createElement('label');
            label2.textContent = 'Enter credit for module ' + i + ': ';
            let input2 = document.createElement('input');
            input2.type = 'number';
            input2.id = 'credit' + i;
            input2.style.maxWidth = "25%";
            input2.style.display = "inline";
            input2.setAttribute('required', true);
            input2.classList.add('form-control');
            input2.placeholder = '2, 3, 4, etc.';
            

            moduleDiv.appendChild(label1);
            moduleDiv.appendChild(input1);
            moduleDiv.appendChild(document.createElement('br'))
            moduleDiv.appendChild(label2);
            moduleDiv.appendChild(input2);
            modInputEle.appendChild(moduleDiv);

            i++;
        }
    }

}

// generate input fields when loaded
window.onload = generateInputFields;