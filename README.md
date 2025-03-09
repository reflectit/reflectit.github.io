# Reflect-It - Web System

**Reflect-It** is a journal web system created for educational purposes as part of a school project. It allows users to sign up, log in, and create, edit, and view journal entries. The project is built to be responsive across various devices, including mobile, tablet, and desktop. It leverages Firebase for user authentication and data storage and utilizes Bootstrap 5 for a clean and modern UI.

## Features

- **User Authentication**: Sign up, login, and password reset functionality.
- **Responsive Design**: The application adjusts to different screen sizes for mobile, tablet, and desktop.
- **Journal Entries**: Users can create, edit, and view journal entries.
- **Multi-page Layout**: The system consists of separate HTML files for each page, including login, sign-up, home, and dashboard.
- **Firebase Backend**: Firebase Authentication for secure login and Firestore for data storage.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Backend**: Firebase (Authentication, Firestore)
- **Deployment**: GitHub Pages

## Web System Overview

This system is designed to manage user accounts and their associated journal entries. The main components of the system include:

1. **Frontend**: 
   - Built using standard web technologies (HTML, CSS, and JavaScript).
   - The design is responsive, ensuring it works on any screen size by using Bootstrap 5.
   - JavaScript is used to handle form submissions, user authentication, and communication with Firebase.

2. **Backend**:
   - **Firebase** is used for both authentication and storing user data.
   - **Firebase Authentication** handles user login, sign-up, and password reset functionality.
   - **Firestore** is used to store journal entries, allowing users to create and edit them.

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/reflectit/reflectit.github.io.git
    cd reflectit.github.io
    ```

2. **Install Dependencies**:
    - This project doesn't require any installation for frontend dependencies as it uses Bootstrap directly from a CDN.

3. **Set Up Firebase**:
    - Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
    - Set up Firebase Authentication and Firestore.
    - Add your Firebase configuration to the `firebase.js` file in the project.

4. **Running the Project**:
    - Open `index.html` in a browser to run the project locally.

## Folder Structure

/project-folder /assets /images /styles style.css /scripts script.js /pages index.html login.html signup.html home.html dashboard.html /data .gitignore README.md index.html

- **/assets**: Contains images, styles, and scripts used across the system.
- **/pages**: Contains the HTML pages for login, sign-up, home, and dashboard.
- **/data**: Reserved for static data (if used) or Firebase data management.
- **.gitignore**: Specifies files to be ignored by Git, such as `node_modules` or environment variables.
- **README.md**: This documentation file.
  
## License

This project is for **educational purposes only** and should not be used commercially. It was developed as part of a school project to demonstrate web system concepts.

## Contact

- **Website**: [Reflect-It](https://reflect-it.xyz)
- **Email**: [reflect0it@gmail.com](mailto:reflect0it@gmail.com)
