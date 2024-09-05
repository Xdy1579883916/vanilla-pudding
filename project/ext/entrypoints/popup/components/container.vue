<template>
  <div v-if="support" class="container flex flex-col p-2 space-y-2">
    <div class="flex space-x-2 justify-between">
      <NButton
        text
        tag="a"
        :href="msg.openSource"
        target="_blank"
        type="primary"
      >
        <NImage
          src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
          alt="GitHub"
          class="size-6"
          :preview-disabled="true"
        />
      </NButton>
      <NDropdown
        size="small"
        :disabled="uploading"
        :options="js_options"
        @select="handleSelect"
      >
        <NButton :loading="uploading" size="small">
          <template #icon>
            <NIcon :size="22">
              <Javascript16Regular />
            </NIcon>
          </template>
          {{ msg.script_manage }}
        </NButton>
      </NDropdown>
    </div>
    <div class="flex flex-col space-y-2">
      <NInput
        v-model:value="search"
        type="text"
        :placeholder="msg.searchFilter"
        size="small"
        clearable
      />
      <div class="max-h-[320px] overflow-auto border-t">
        <div v-if="!showList.length" class="flex justify-center items-center h-[300px]">
          <NEmpty :description="msg.script_empty">
            <template #extra>
              <NButton size="small" @click="handleNewScript">
                {{ msg.script_create2 }}
              </NButton>
            </template>
          </NEmpty>
        </div>
        <div
          v-for="(item, index) in showList"
          v-else
          :key="index"
          class="flex justify-between items-center border-b border-gray-200 w-full p-1 text-xs"
        >
          <div class="space-x-3 flex justify-between items-center">
            <NSwitch
              size="small"
              :value="item.enabled"
              @update:value="handleTriggerEnabled(item)"
            />
            <NButton
              text
              tag="div"
              :title="item.name"
              style="line-height: unset"
              @click="handleEditScript(item.id)"
            >
              <NEllipsis style="max-width: 200px" :tooltip="false">
                {{ item.name }}
              </NEllipsis>
            </NButton>
          </div>
          <div class="flex">
            <NButton quaternary circle type="error" size="small" @click="handleDel(item)">
              <template #icon>
                <NIcon size="20">
                  <Delete16Regular />
                </NIcon>
              </template>
            </NButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center text-[#f87171]" style="height: 100vh;">
    {{ msg.noSupportTip }}
  </div>
</template>

<script setup lang="ts">
import {
  NButton,
  NDropdown,
  NEllipsis,
  NEmpty,
  NIcon,
  NImage,
  NInput,
  NSwitch,
  useMessage,
  useModal,
} from 'naive-ui'
import type { Component } from 'vue'
import { computed, h, onMounted, ref } from 'vue'
import {
  AddCircle20Regular,
  CalendarArrowDown20Regular,
  CalendarArrowRight24Regular,
  CalendarSync16Regular,
  Delete16Regular,
  Javascript16Regular,
} from '@vicons/fluent'
import { getBackgroundScriptService } from '@/lib/rpc/backgroundScriptRPC.ts'
import { i18n } from '@/lib/i18n.ts'

const msg = {
  openSource: i18n.t('openSource'),
  noSupportTip: i18n.t('noSupportTip'),
  script_manage: i18n.t('script_manage'),
  script_create: i18n.t('script_create'),
  script_create2: i18n.t('script_create2'),
  script_update: i18n.t('script_update'),
  export: i18n.t('script_export'),
  import: i18n.t('script_import'),
  script_empty: i18n.t('script_empty'),
  searchFilter: i18n.t('searchFilter'),
  delete_title: i18n.t('delete_title'),
  delete_content: i18n.t('delete_content'),
  delete_negative: i18n.t('delete_negative'),
  delete_positive: i18n.t('delete_positive'),
  delete_success: i18n.t('delete_success'),
  export_tip: i18n.t('export_tip'),
  export_file: i18n.t('export_file'),
}

function renderIcon(icon: Component) {
  return () => {
    return h(
      NIcon,
      {
        size: 23,
      },
      {
        default: () => h(icon),
      },
    )
  }
}

const message = useMessage()
const modal = useModal()

const backgroundScriptService = getBackgroundScriptService()

const list = ref([])
const support = ref(false)
const search = ref('')
const showList = computed(() => {
  return list.value.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const js_options = ref([
  {
    label: msg.script_create,
    key: 'create',
    icon: renderIcon(AddCircle20Regular),
  },
  {
    label: msg.script_update,
    key: 'update',
    icon: renderIcon(CalendarSync16Regular),
  },
  {
    label: msg.import,
    key: 'import',
    icon: renderIcon(CalendarArrowDown20Regular),
  },
  {
    label: msg.export,
    key: 'export',
    icon: renderIcon(CalendarArrowRight24Regular),
  },
])
function handleSelect(key: string | number) {
  switch (key) {
    case 'create':
      handleNewScript()
      break
    case 'update':
      handleUpdate()
      break
    case 'export':
      handleExport()
      break
    case 'import':
      handleImport()
      break
    case 'clean':
      handleImport()
      break
  }
}

async function query() {
  if (!support.value) {
    message.error(msg.noSupportTip)
    return
  }
  list.value = await backgroundScriptService.getAllUserScripts()
}

onMounted(async () => {
  support.value = await backgroundScriptService.isSupportAPI()
  await query()
})

async function handleTriggerEnabled(item) {
  await backgroundScriptService.setUserScriptEnabled(item.id, !item.enabled)
  await query()
}

async function handleDel(item) {
  const m = modal.create({
    title: msg.delete_title,
    type: 'warning',
    preset: 'dialog',
    content: msg.delete_content,
    positiveText: msg.delete_positive,
    onPositiveClick() {
      doDel()
    },
    negativeText: msg.delete_negative,
    onNegativeClick() {
      m.destroy()
    },
  })

  async function doDel() {
    await backgroundScriptService.removeUserScript(item.id)
    await query()
    message.success(msg.delete_success)
  }
}

function getEditorURL(userScriptId: string): string {
  return chrome.runtime.getURL(`editor.html?id=${userScriptId}`)
}

async function handleNewScript() {
  const id = await backgroundScriptService.generateUserScriptId()
  await handleEditScript(id)
}

const uploading = ref(false)

async function handleUpdate() {
  try {
    uploading.value = true
    await query()
    const ids = list.value.map(v => v.id)

    for (const id of ids) {
      await backgroundScriptService.upgradeUserScriptToLatest(id)
    }
  }
  catch (e) {
    message.error(e.message)
  }
  finally {
    uploading.value = false
  }
}

async function handleExport() {
  try {
    await query()
    console.log(list.value)
    downloadJsonFile(list.value, `${msg.export_file}-${Date.now()}.json`)
  }
  catch (e) {
    message.error(e.message)
  }
}

function downloadJsonFile(jsonObject, fileName) {
  const jsonString = JSON.stringify(jsonObject, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  document.body.appendChild(a)
  a.href = url
  a.download = fileName
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function readJsonFile(callback) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.style.display = 'none'
  document.body.appendChild(input)
  input.addEventListener('change', (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function (e: any) {
        try {
          const jsonObject = JSON.parse(e.target.result)
          callback(jsonObject)
        }
        catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }
      reader.readAsText(file)
    }
    document.body.removeChild(input)
  })
  input.click()
}

async function handleImport() {
  try {
    await query()
    readJsonFile(async (scripts) => {
      for (const script of scripts) {
        const sc = list.value.find(v => v.name === script.name)
        let id = sc?.id || null
        if (!id) {
          id = await backgroundScriptService.generateUserScriptId()
        }
        await backgroundScriptService.upgradeAndRegisterUserScript(id, script.code)
      }
      await query()
    })
  }
  catch (e) {
    message.error(e.message)
  }
}

async function handleEditScript(id) {
  const url = getEditorURL(id)
  chrome.tabs.create({ url })
}
</script>
