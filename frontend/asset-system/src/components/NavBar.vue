<script>


</script>
<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <RouterLink :to="{ name: 'home' }" class="navbar-brand me-5 ms-5" href="#"><img src="../assets/Boerner-Insulation-Logo-2.png" width="180px"></RouterLink>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav  mb-lg-0">
        <li class="nav-item me-3">
          <RouterLink :to="{ name: 'asset-list' }" class="nav-link active" aria-current="page" href="#">Sprzęt IT</RouterLink>
        </li>
        <li class="nav-item me-3">
            <RouterLink :to="{ name: 'phone-list' }" class="nav-link" href="#">Telefony</RouterLink>
        </li>

        <li class="nav-item dropdown me-3">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Protokoły przekazania
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Raporty
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>

      </ul>
    </div>
  </div>
</nav>


</template>