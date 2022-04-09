module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin | Planter and Pestle</title>
          <link rel="icon" href="/images/PlanterAndPestle-Favicon.ico">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
          <link href="/css/main.css" rel="stylesheet">
        </head>
  
        <body class="admin">
          <header>
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container">
                <div>
                  <a href="/admin/products">
                    <h3 class="title">Admin Panel</h3>
                  </a>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/admin/products"><i class="fa fa-star"></i> Products</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div class="container">
            ${content}
          </div>
          <footer>
            <p>&copy; Copyright 2022 Planter & Pestle</p>
          </footer>
        </body>
      </html>
    `;
  };