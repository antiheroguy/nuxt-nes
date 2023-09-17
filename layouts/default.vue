<template>
  <div class="layout-wrapper layout-theme-dark layout-overlay layout-overlay-active">
    <div class="layout-topbar">
      <router-link
        to="/"
        class="layout-topbar-logo outline-none shadow-none"
      >
        <img
          src="/logo.png"
          alt="NES Game"
        />
        <span>NES Game</span>
      </router-link>
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>
      <div class="layout-footer">
        <span class="font-medium ml-2">&copy; 2023 Hero</span>
      </div>
    </div>
    <AppConfig></AppConfig>
    <div class="layout-mask"></div>
  </div>
</template>