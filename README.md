# 🎓 SG GPA Calculator

A simple yet effective GPA calculator web application for Singapore students. This project was my first web development project, built to apply and test my JavaScript and Bootstrap knowledge from the Web App Development II course.

![SG GPA Calculator Preview](https://github.com/user-attachments/assets/b80e7238-5fc5-49c4-8d6c-44a35b474558)


## 📝 Project Overview

The SG GPA Calculator helps students calculate their Grade Point Average (GPA) based on Singapore's educational grading system. It provides a user-friendly interface to input courses, credits, and grades, then calculates the overall GPA instantly.

## ✨ Features

- **Easy Grade Input**: Simple form to add course details including name, credits, and grade
- **Mobile Responsive**: Works on all devices thanks to Bootstrap's responsive design
- **Clean UI**: Intuitive interface designed for ease of use

## 🛠️ Technologies Used

- **HTML**: Structure and content
- **CSS**: Custom styling and visual enhancements
- **JavaScript**: Core functionality and calculations
- **Bootstrap**: Responsive design framework for UI components

## 🖥️ Demo

[View the live demo](https://wolfparktaerim.github.io/GPA_Calculator_SGUni/GPA_calculator.html)

## 📋 Getting Started

Since this is a simple frontend application with no build process, you can run it locally by following these steps:

1. Clone the repository:
```sh
git clone https://github.com/wolfparktaerim/GPA_Calculator_SGUni.git
cd GPA_Calculator_SGUni
```

2. Open the `index.html` file in your web browser:
```sh
# On Mac
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```


## 💡 How It Works

1. Select your university 
2. Choose the number of modules you’re taking this semester
3. (Optional) Enter your cumulative GPA from previous semesters to calculate your overall GPA instead of just the semester GPA
4. If you entered a cumulative GPA, input the total number of modules completed before this semester
5. Enter the grades for each of your current modules
6. Click the "Calculate GPA" button to view your results 

## 🧮 GPA Calculation Formula

The GPA is calculated using the standard formula:

```
GPA = Sum of (Grade Points × Credit Hours) / Sum of Credit Hours
```

Where grade points follow the Singapore standard grading system: (using example of SMU grading system)
- A+ = 4.3
- A = 4.0
- A- = 3.7
- B+ = 3.3
- B = 3.0
- B- = 2.7
- C+ = 2.3
- C = 2.0
- C- = 1.7
- D+ = 1.3
- D = 1.0
- F = 0.0

## 📱 Responsive Design

The application is fully responsive and provides an optimized experience on devices of all sizes:
- Desktop: Full-featured interface with ample spacing
- Tablet: Adjusted layout for medium screens
- Mobile: Compact design for small screens without sacrificing functionality

