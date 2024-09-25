<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :theme="isDark ? darkTheme : undefined"
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
import { usePreferredDark } from '@vueuse/core'
import { darkTheme, dateZhCN, NConfigProvider, NMessageProvider, NModalProvider, zhCN } from 'naive-ui'

const isDark = usePreferredDark()

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ec66d',
  },
}
</script>
