<template>
  <div>
    <div>current route: {{ $route.path }}</div>
    <ul>
      <li
        v-for="route in $router.getRoutes()"
        :key="route.path"
      >
        <RouterLink :to="route">
          {{ route.path }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup></script>
