<script lang="ts" setup>
import {dateZhCN, NConfigProvider, NMessageProvider, NModalProvider, zhCN, GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides  = {
  common: {
    primaryColor: "#1ec66d",
    errorColor: "#ff0000",
  },
}
</script>

<template>
  <n-config-provider
      :themeOverrides="themeOverrides"
      abstract
      :locale="zhCN"
      :date-locale="dateZhCN"
      inline-theme-disabled
  >
    <n-modal-provider>
      <n-message-provider>
        <slot />
      </n-message-provider>
    </n-modal-provider>
  </n-config-provider>
</template>
