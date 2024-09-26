<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :theme="theme"
    abstract
    :locale="zhCN"
    :date-locale="dateZhCN"
    inline-theme-disabled
  >
    <NModalProvider>
      <NMessageProvider>
        <slot />
      </NMessageProvider>
    </NModalProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, dateZhCN, NConfigProvider, NMessageProvider, NModalProvider, useOsTheme, zhCN } from 'naive-ui'
import { computed } from 'vue'

const osThemeRef = useOsTheme()

const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ec66d',
  },
}
</script>
