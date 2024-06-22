# Big Booster Learning App

## Overview

Big Booster Learning App is a web application designed for 12th-grade students to access and download study materials in PDF format. The application also provides teachers an interface to upload and manage PDF files. The project is built using React.

## Features

### Student Interface

- **Home Page**: Welcome page with a "Start" button redirecting to the student page.
- **Student Page**: View all available PDF files with options to sort and filter by:
  - Date
  - File name
  - Tag names
  - Duration of course
  - Subjects
- **Download PDFs**: Students can download the PDFs.

### Teacher Interface

- **Upload Page**: Teachers can upload PDF files with details:
  - Name
  - Subject
  - Marks
  - Duration
  - Tags
  - Description
- **Manage PDFs Page**: Teachers can view all uploaded PDF files with options to:
  - View
  - Download
  - Delete

## Project Structure

The project is organized into the following structure:

```
big-booster-learning-app/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── navbar.jsx
│   │   ├── sidebar.jsx
│   │   ├── style.css
│   │   ├── teacherNavbar.jsx
│   │   ├── teacherpdfitem.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── home/
│   │   |   ├── index.jsx
│   │   |   ├── style.css
|   |   |   
|   |   ├── student/
|   |   |   └── ...
|   |   ├── teacherFiles/
|   |   |   └── ...
|   |   ├── teacherUpload/
|   |   |   └── ...
|   |   └── ...
│   │
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Getting Started

### Prerequisites

- Node.js (>= v20.13.1)
- npm (>= 10.5.2)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zishanverse/learning_material_client
   cd learning_material_client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server, run:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Home Page

- Click the "Start" button to navigate to the Student Page.

### Student Page

- View all available PDFs.
- Use sorting and filtering options to find the desired PDFs.
- Click on a PDF to download it.

### Teacher Upload Page

- Fill in the details and upload a PDF file for students.

### Teacher Manage Page

- View all uploaded PDFs.
- Use options to view, download, or delete any PDF.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance.

Happy learning!
