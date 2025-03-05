<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reflect-It | Log In</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="style.css">
  <style>
    .form-container {
      max-width: 400px;
      margin: auto;
      padding: 2rem;
      border-radius: 0.75rem;
      background-color: rgba(17, 24, 39, 1);
      color: rgba(243, 244, 246, 1);
    }
    .title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .input-group {
      position: relative;
      margin-top: 1rem;
    }
    .input-group label {
      position: absolute;
      left: 12px;
      top: 12px; /* Change this value to adjust the initial position of the label */
      transition: 0.2s ease all;
      color: rgba(156, 163, 175, 1);
      pointer-events: none;
      font-size: 1rem; /* Default font size */
    }
    .input-group input {
      width: 100%;
      border-radius: 0.375rem;
      border: 1px solid rgba(55, 65, 81, 1);
      padding: 0.75rem 1rem;
      color: rgba(243, 244, 246, 1);
      background-color: rgba(17, 24, 39, 1);
      font-size: 1rem; /* Ensure the font size is consistent */
    }
    .input-group input:focus {
      border-color: rgba(167, 139, 250);
      outline: none;
    }
    .input-group input:focus + label,
    .input-group input:not(:placeholder-shown) + label {
      top: -18px; /* Change this value to adjust how high the label floats above the input */
      left: 12px;
      font-size: 0.75rem;
      color: rgba(167, 139, 250);
    }
    .sign {
      display: block;
      width: 100%;
      background-color: rgba(167, 139, 250, 1);
      padding: 0.75rem;
      text-align: center;
      color: rgba(17, 24, 39, 1);
      border: none;
      border-radius: 0.375rem;
      font-weight: 600;
      margin-top: 1rem;
    }
    .forgot {
      display: flex;
      justify-content: flex-end;
      font-size: 0.75rem;
      color: rgba(156, 163, 175, 1);
      margin: 8px 0;
    }
    .signup {
      text-align: center;
      font-size: 0.75rem;
      color: rgba(156, 163, 175, 1);
      margin-top: 1rem;
    }
    .show-password {
      position: absolute;
      right: 10px;
      top: 30%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: rgba(167, 139, 250);
      cursor: pointer;
    }
  </style>
</head>
<body>

<div class="content">
  <!-- Navbar Start -->
  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="#">Reflect-It</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Home </a></li>
          <li class="nav-item"><a class="nav-link" href="login.html">Log In</a></li>
          <li class="nav-item"><a class="nav-link" href="signup.html">Sign Up</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="form-container">
    <p class="title">Login</p>
    <form class="form" id="loginForm">
      <div class="input-group">
        <input type="text" name="username" id="username" placeholder=" " required>
        <label for="username">Username</label>
        <div class="invalid-feedback">Username is required and must be 3-20 characters long.</div>
      </div>
      <div class="input-group">
        <input type="password" name="password" id="password" placeholder=" " required>
        <label for="password">Password</label>
        <button type="button" class="show-password" id="togglePassword">Show</button>
        <div class="invalid-feedback">Password is required and must be 6-30 characters long.</div>
        <div class="forgot">
          <a rel="noopener noreferrer" href="#">Forgot Password?</a>
        </div>
      </div>
      <button type="submit" class="sign">Sign In</button>
    </form>
    <p class="signup">Don't have an account?
      <a rel="noopener noreferrer" href="signup.html" class="">Sign up</a>
    </p>
  </div>
</div>

<!-- Footer Start -->
<footer class="text-center py-3">
  <p>&copy; 2023 Reflect-It. All rights reserved.</p>
</footer>

<script>
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Show' : 'Hide';
  });
</script>

</body>
</html>
