module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Planter and Pestle</title>
          <link rel="icon" href="/images/PlanterAndPestle-Favicon.ico">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
          <link href="/css/main.css" rel="stylesheet">
          
          
        </head>
  
        <body>
          <header>
            <nav class="navbar navbar-top">
              <div class="container navbar-container">
                <div>
                  <ul class="social">
                    <li>
                    <a class="logo" href=""><img src="/images/Planter.png" /></a>
                  </ul>
                </div>
                <div>
                  <ul class="social">
                    <li>
                      <a href=""><i class="fa fa-phone"></i>+1 123 456 7890</a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-envelope"></i> shop@myshop.com</a>
                    </li>
                  
                  </ul>
                </div>
              </div>
            </nav>
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container">
                <div>
                 
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/"><i class="fa fa-star"></i> Products</a>
                    </div>
                    <div class="navbar-item">
                      <a href="/shopping-cart"><i class="fa fa-shopping-cart"></i> Cart</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
  
          ${content}
          
          <footer>
            <ul class="social">
                <li><a href=""><i class="fab fa-facebook"></i></a></li>
                <li><a href=""><i class="fab fa-twitter"></i></a></li>
                <li><a href=""><i class="fab fa-linkedin"></i></a></li>
                <li><a href=""><i class="fab fa-dribbble"></i></a></li>
                <li><a href=""><i class="fab fa-google-plus"></i></a></li>
            </ul>
            <p>&copy; Copyright 2022 Planter & Pestle</p>
        </footer>
        </body>
      </html>
    `;
  };
  