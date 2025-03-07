<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reflect-It | Home</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="content">
  <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="#">Reflect-It</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="./home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="./login">Log In</a></li>
          <li class="nav-item"><a class="nav-link" href="./signup">Sign Up</a></li>
        </ul>
        <div class="theme-switch">
            <label class="switch">
              <input id="checkbox" type="checkbox" />
              <span class="slider">
                <div class="star star_1"></div>
                <div class="star star_2"></div>
                <div class="star star_3"></div>
                <svg viewBox="0 0 16 16" class="cloud_1 cloud">
                  <path transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                    fill="#fff"
                    d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
      </div>
    </div>
  </nav>

  <header class="text-center py-5">
    <div class="container">
      <h1>Welcome to Reflect-It</h1>
      <p>Your personal journaling space.</p>
      <a href="./signup" class="btn btn-primary btn-lg">Get Started</a>
    </div>
  </header>

  <section class="container my-5 text-center">
    <h2>Why Choose Reflect-It?</h2>
    <div class="row mt-4">
      <div class="col-md-4">
        <div class="card p-3 shadow-sm">
          <h4>Secure & Private</h4>
          <p>Your journal is safe with us.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 shadow-sm">
          <h4>Easy to Use</h4>
          <p>Simple, clean, and intuitive interface.</p>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card p-3 shadow-sm">
          <h4>Access Anywhere</h4>
          <p>Write anytime, on any device.</p>
        </div>
      </div>
    </div>
  </section>
</div>

<footer class="text-center py-3">
  <p>&copy; 2025 Reflect-It. All Rights Reserved.</p>
</footer>

<script src="script.js"></script>

</body>
</html>
