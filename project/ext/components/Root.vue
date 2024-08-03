<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
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
import { NConfigProvider, NMessageProvider, NModalProvider, dateZhCN, zhCN } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ec66d',
    errorColor: '#ff0000',
  },
}
</script>
