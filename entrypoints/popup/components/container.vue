<template>
  <div v-if="support" class="container flex flex-col p-2 space-y-2">
    <div class="flex space-x-2">
      <n-button size="small" @click="handleNewScript">新增</n-button>
      <n-button size="small" :loading="upLoaded" @click="handleUpdate()">更新</n-button>
      <n-button size="small" @click="handleExport()">导出</n-button>
      <n-button size="small" @click="handleImport()">导入</n-button>
    </div>
    <div class="flex flex-col space-y-2">
      <n-input
          v-model:value="search"
          type="text"
          placeholder="筛选"
          size="small"
          clearable
      />
      <div class="max-h-[320px] overflow-auto border-t">
        <div
            v-for="(item, index) in showList"
            :key="index"
            class="flex justify-between items-center border-b border-gray-200 w-full p-1 text-xs"
        >
          <div class="space-x-3 flex justify-between items-center">
            <n-switch
                size="small"
                :value="item.enabled"
                @update:value="handleTriggerEnabled(item)"
            />
            <n-button
                text
                tag="div"
                :title="item.name"
                @click="handleEditScript(item.id)"
            >
              <n-ellipsis style="max-width: 200px" :tooltip="false">
                {{ item.name }}
              </n-ellipsis>
            </n-button>
          </div>
          <div class="flex">
            <n-button quaternary circle type="error" size="small" @click="handleDel(item)">
              <template #icon>
                <n-icon size="20">
                  <delete16-regular/>
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center text-[#f87171]" style="height: 100vh;">
    请启用插件开发者模式
  </div>
</template>

<script setup lang="ts">
import {NButton, NEllipsis, NIcon, NInput, NSwitch, useMessage, useModal} from "naive-ui";
import {getBackgroundService} from "@/lib/rpc/bg_service.ts";
import {computed, onMounted, ref} from "vue";
import {Delete16Regular} from "@vicons/fluent"

const message = useMessage()
const modal = useModal()

const backgroundService = getBackgroundService()

const list = ref([])
const support = ref(false)
const search = ref("")
const showList = computed(() => {
  return list.value.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

async function query() {
  if (!support.value) {
    message.error("请启用插件开发者模式")
    return
  }
  list.value = await backgroundService.getAllUserScripts()
}

onMounted(async () => {
  support.value = await backgroundService.isSupportAPI()
  await query()
})

async function handleTriggerEnabled(item) {
  await backgroundService.setUserScriptEnabled(item.id, !item.enabled);
  await query()
}

async function handleDel(item) {
  const m = modal.create({
    title: '确认删除吗',
    type: "warning",
    preset: 'dialog',
    content: '备份了吗? 删了可就没了',
    positiveText: "确认",
    onPositiveClick() {
      doDel()
    },
    negativeText: "算了",
    onNegativeClick() {
      m.destroy()
    }
  })

  async function doDel() {
    await backgroundService.deleteUserScript(item.id);
    await query()
    message.success("脚本已删除")
  }
}

function getEditorURL(userScriptId: string): string {
  return chrome.runtime.getURL(`editor.html?id=${userScriptId}`)
}

async function handleNewScript() {
  const id = await backgroundService.generateUserScriptId()
  handleEditScript(id)
}

const upLoaded = ref(false);

async function handleUpdate() {
  try {
    upLoaded.value = true
    await query()
    const ids = list.value.map(v => v.id)

    for (const id of ids) {
      await backgroundService.upgradeUserScriptToLatest(id)
    }

  } catch (e) {
    message.error(e.message)
  } finally {
    upLoaded.value = false
  }
}

async function handleExport() {
  try {
    await query()
    console.log(list.value);
    downloadJsonFile(list.value, `香草布丁用户脚本导出-${Date.now()}.json`)
  } catch (e) {
    message.error(e.message)
  }
}

function downloadJsonFile(jsonObject, fileName) {
  const jsonString = JSON.stringify(jsonObject, null, 2);
  const blob = new Blob([jsonString], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName;
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function readJsonFile(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.style.display = 'none';
  document.body.appendChild(input);
  input.addEventListener('change', function (event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        try {
          const jsonObject = JSON.parse(e.target.result);
          callback(jsonObject);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
    document.body.removeChild(input);
  });
  input.click();
}

async function handleImport() {
  try {
    await query()
    readJsonFile(async (scripts) => {
      for (const script of scripts) {
        const sc = list.value.find(v => v.name === script.name)
        let id = sc?.id || null
        if (!id) {
          id = await backgroundService.generateUserScriptId()
        }
        await backgroundService.upgradeAndRegisterUserScript(id, script.code)
      }
      await query()
    })
  } catch (e) {
    message.error(e.message)
  }
}

async function handleEditScript(id) {
  const url = getEditorURL(id)
  chrome.tabs.create({url})
}

</script>
