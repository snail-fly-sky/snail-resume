<template>
  <main
    class="app-shell"
    :class="{
      'sidebar-collapsed': isSidebarCollapsed,
      'preview-mode': isPreviewMode,
      'preview-expanded': isPreviewExpanded
    }"
  >
    <aside class="resume-sidebar">
      <div class="sidebar-head">
        <div class="brand-block">
          <p class="eyebrow">Resume Workbench</p>
          <h1>简历工作台</h1>
        </div>
        <button
          class="sidebar-toggle"
          type="button"
          :title="isSidebarCollapsed ? '展开工作台' : '收起工作台'"
          @click="toggleSidebar"
        >
          <PanelLeftOpen v-if="isSidebarCollapsed" :size="18" />
          <PanelLeftClose v-else :size="18" />
        </button>
      </div>

      <button class="primary-action" type="button" @click="createResume">
        <Plus :size="18" />
        <span>新建简历</span>
      </button>

      <div class="resume-list" aria-label="简历列表">
        <button
          v-for="resume in resumes"
          :key="resume.id"
          class="resume-list-item"
          :class="{ active: resume.id === currentId }"
          type="button"
          @click="selectResume(resume.id)"
        >
          <span>{{ resume.title }}</span>
          <small>{{ resume.basics.name }}</small>
        </button>
      </div>
    </aside>

    <button
      class="sidebar-float-toggle"
      type="button"
      title="灞曞紑宸ヤ綔鍙?"
      @click="toggleSidebar"
    >
      <PanelLeftOpen :size="18" />
    </button>

    <section v-if="currentResume" class="workspace">
      <header class="workspace-toolbar">
        <div>
          <p class="eyebrow">当前编辑</p>
          <h2>{{ currentResume.title }}</h2>
        </div>
        <div class="toolbar-actions">
          <button class="icon-button" type="button" title="复制简历" @click="duplicateResume">
            <Copy :size="18" />
          </button>
          <button class="icon-button danger" type="button" title="删除简历" @click="deleteResume">
            <Trash2 :size="18" />
          </button>
          <button
            class="ghost-action preview-action"
            :class="{ active: isPreviewMode }"
            type="button"
            :title="isPreviewMode ? '返回编辑' : '预览简历'"
            @click="previewResume"
          >
            <Eye :size="18" />
            {{ isPreviewMode ? '编辑' : '预览' }}
          </button>
          <button class="ghost-action" type="button" @click="exportWord">
            <FileText :size="18" />
            Word
          </button>
          <button class="dark-action" type="button" @click="exportPdf">
            <Download :size="18" />
            PDF
          </button>
        </div>
      </header>

      <div class="content-grid">
        <form class="editor-panel" @input="touchResume">
          <section class="editor-section">
            <div class="section-heading">
              <h3>基础信息</h3>
            </div>
            <label>
              简历名称
              <input v-model="currentResume.title" type="text" />
            </label>
            <div class="two-columns">
              <label>
                姓名
                <input v-model="currentResume.basics.name" type="text" />
              </label>
              <label>
                求职方向
                <input v-model="currentResume.basics.role" type="text" />
              </label>
            </div>
            <div class="two-columns">
              <label>
                邮箱
                <input v-model="currentResume.basics.email" type="email" />
              </label>
              <label>
                手机
                <input v-model="currentResume.basics.phone" type="tel" />
              </label>
            </div>
            <label>
              所在城市
              <input v-model="currentResume.basics.city" type="text" />
            </label>
            <label>
              个人摘要
              <textarea v-model="currentResume.basics.summary" rows="4"></textarea>
            </label>
          </section>

          <section class="editor-section">
            <div class="section-heading">
              <h3>技能标签</h3>
            </div>
            <label>
              用逗号分隔
              <textarea v-model="currentResume.skills" rows="3"></textarea>
            </label>
          </section>

          <section class="editor-section">
            <div class="section-heading">
              <h3>工作经历</h3>
            </div>
            <article v-for="(item, index) in currentResume.experiences" :key="item.id" class="entry-editor">
              <button class="entry-remove" type="button" title="删除经历" @click="resumeStore.removeExperience(index)">
                <Trash2 :size="16" />
              </button>
              <div class="two-columns">
                <label>
                  公司
                  <input v-model="item.company" type="text" />
                </label>
                <label>
                  职位
                  <input v-model="item.position" type="text" />
                </label>
              </div>
              <div class="two-columns">
                <label>
                  开始时间
                  <input v-model="item.start" type="text" />
                </label>
                <label>
                  结束时间
                  <input v-model="item.end" type="text" />
                </label>
              </div>
              <label>
                工作内容
                <textarea v-model="item.description" rows="4"></textarea>
              </label>
            </article>
            <button class="entry-add-bottom" type="button" aria-label="Add experience" @click="resumeStore.addExperience">
              <Plus :size="18" />
            </button>
          </section>

          <section class="editor-section">
            <div class="section-heading">
              <h3>项目经历</h3>
            </div>
            <article v-for="(item, index) in currentResume.projects" :key="item.id" class="entry-editor">
              <button class="entry-remove" type="button" title="删除项目" @click="resumeStore.removeProject(index)">
                <Trash2 :size="16" />
              </button>
              <div class="two-columns">
                <label>
                  项目名称
                  <input v-model="item.name" type="text" />
                </label>
                <label>
                  角色
                  <input v-model="item.role" type="text" />
                </label>
              </div>
              <label>
                项目描述
                <textarea v-model="item.description" rows="4"></textarea>
              </label>
            </article>
            <button class="entry-add-bottom" type="button" aria-label="Add project" @click="resumeStore.addProject">
              <Plus :size="18" />
            </button>
          </section>

          <section class="editor-section">
            <div class="section-heading">
              <h3>教育经历</h3>
            </div>
            <article v-for="(item, index) in currentResume.educations" :key="item.id" class="entry-editor">
              <button class="entry-remove" type="button" title="删除教育经历" @click="resumeStore.removeEducation(index)">
                <Trash2 :size="16" />
              </button>
              <div class="two-columns">
                <label>
                  学校
                  <input v-model="item.school" type="text" />
                </label>
                <label>
                  专业
                  <input v-model="item.major" type="text" />
                </label>
              </div>
              <div class="two-columns">
                <label>
                  学历
                  <input v-model="item.degree" type="text" />
                </label>
                <label>
                  时间
                  <input v-model="item.period" type="text" />
                </label>
              </div>
            </article>
            <button class="entry-add-bottom" type="button" aria-label="Add education" @click="resumeStore.addEducation">
              <Plus :size="18" />
            </button>
          </section>
        </form>

        <section ref="previewPanel" class="preview-panel" aria-label="简历预览">
          <div ref="resumePaper" class="resume-paper">
            <header class="paper-header">
              <div class="paper-title-block">
                <span class="paper-kicker">Candidate Profile</span>
                <h2>{{ currentResume.basics.name }}</h2>
                <p>{{ currentResume.basics.role }}</p>
              </div>
              <ul class="paper-contact">
                <li>
                  <Mail :size="14" />
                  <span>{{ currentResume.basics.email }}</span>
                </li>
                <li>
                  <Phone :size="14" />
                  <span>{{ currentResume.basics.phone }}</span>
                </li>
                <li>
                  <MapPin :size="14" />
                  <span>{{ currentResume.basics.city }}</span>
                </li>
              </ul>
            </header>

            <section class="paper-section">
              <h3><span>01</span>个人摘要</h3>
              <p>{{ currentResume.basics.summary }}</p>
            </section>

            <section class="paper-section">
              <h3><span>02</span>核心技能</h3>
              <div class="skill-cloud">
                <span v-for="skill in skillList" :key="skill">{{ skill }}</span>
              </div>
            </section>

            <section class="paper-section">
              <h3><span>03</span>工作经历</h3>
              <article v-for="item in currentResume.experiences" :key="item.id" class="paper-entry">
                <div>
                  <strong>{{ item.company }}</strong>
                  <span>{{ item.start }} - {{ item.end }}</span>
                </div>
                <h4>{{ item.position }}</h4>
                <p>{{ item.description }}</p>
              </article>
            </section>

            <section class="paper-section">
              <h3><span>04</span>项目经历</h3>
              <article v-for="item in currentResume.projects" :key="item.id" class="paper-entry">
                <div>
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.role }}</span>
                </div>
                <p>{{ item.description }}</p>
              </article>
            </section>

            <section class="paper-section">
              <h3><span>05</span>教育经历</h3>
              <article v-for="item in currentResume.educations" :key="item.id" class="paper-entry compact">
                <div>
                  <strong>{{ item.school }}</strong>
                  <span>{{ item.period }}</span>
                </div>
                <p>{{ item.degree }} · {{ item.major }}</p>
              </article>
            </section>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import {
  Copy,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  Plus,
  Trash2
} from 'lucide-vue-next'
import { useResumeStore } from '../stores/resumeStore'

const route = useRoute()
const router = useRouter()
const resumeStore = useResumeStore()
const { resumes, currentId, currentResume, skillList } = storeToRefs(resumeStore)
const resumePaper = ref(null)
const previewPanel = ref(null)
const isSidebarCollapsed = ref(false)
const isPreviewMode = ref(false)
const isPreviewExpanded = ref(false)
const isPreviewAnimating = ref(false)
let previewTimer = 0
let previewAnimationTimer = 0
const previewAnimationMs = 260

watch(
  () => route.params.resumeId,
  (resumeId) => {
    if (resumeId === undefined) {
      router.replace({ name: 'resume-detail', params: { resumeId: resumeStore.currentId } })
      return
    }

    if (resumeStore.hasResume(resumeId)) {
      resumeStore.setCurrentId(resumeId)
      return
    }

    router.replace({ name: 'resume-detail', params: { resumeId: resumeStore.currentId } })
  },
  { immediate: true }
)

function touchResume() {
  resumeStore.touchCurrentResume()
}

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

function selectResume(id) {
  router.push({ name: 'resume-detail', params: { resumeId: id } })
}

function createResume() {
  const id = resumeStore.createResume()
  router.push({ name: 'resume-detail', params: { resumeId: id } })
}

function duplicateResume() {
  const id = resumeStore.duplicateCurrentResume()
  router.push({ name: 'resume-detail', params: { resumeId: id } })
}

function deleteResume() {
  try {
    const id = resumeStore.deleteCurrentResume()
    router.push({ name: 'resume-detail', params: { resumeId: id } })
  } catch (error) {
    alert(error.message)
  }
}

function buildExportName() {
  const cleanName = currentResume.value.basics.name.trim().replace(/[\\/:*?"<>|]/g, '-')
  if (cleanName.length === 0) {
    throw new Error('请先填写姓名后再导出。')
  }
  return `${cleanName}-简历`
}

function downloadBlob(blob, fileName) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
  URL.revokeObjectURL(link.href)
}

function wait(ms) {
  return new Promise((resolve) => {
    previewTimer = window.setTimeout(resolve, ms)
  })
}

async function animatePreviewLayout(updateLayout) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateLayout()
    await nextTick()
    return
  }

  if (previewPanel.value === null) {
    updateLayout()
    await nextTick()
    return
  }

  const panel = previewPanel.value
  const firstRect = panel.getBoundingClientRect()

  updateLayout()
  await nextTick()

  const lastRect = panel.getBoundingClientRect()
  const deltaX = firstRect.left - lastRect.left
  const deltaY = firstRect.top - lastRect.top
  const scaleX = firstRect.width / lastRect.width

  panel.style.transition = 'none'
  panel.style.transformOrigin = 'top left'
  panel.style.transform = `translate(${deltaX}px, ${deltaY}px) scaleX(${scaleX})`

  await new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      panel.style.transition = `transform ${previewAnimationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
      panel.style.transform = ''
      previewAnimationTimer = window.setTimeout(resolve, previewAnimationMs)
    })
  })

  panel.style.transition = ''
  panel.style.transformOrigin = ''
}

async function previewResume() {
  if (isPreviewAnimating.value) {
    return
  }

  isPreviewAnimating.value = true
  window.clearTimeout(previewTimer)
  window.clearTimeout(previewAnimationTimer)

  try {
    if (!isPreviewMode.value) {
      isPreviewMode.value = true
      await wait(110)
      await animatePreviewLayout(() => {
        isPreviewExpanded.value = true
      })
      return
    }

    await animatePreviewLayout(() => {
      isPreviewExpanded.value = false
    })
    await wait(90)
    isPreviewMode.value = false
  } finally {
    isPreviewAnimating.value = false
  }
}

function exportWord() {
  try {
    const fileName = `${buildExportName()}.doc`
    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: "Microsoft YaHei", sans-serif; color: #1b2a2f; line-height: 1.7; }
            h1 { font-size: 28px; margin: 0; }
            h2 { border-bottom: 1px solid #9aa8a9; font-size: 18px; padding-bottom: 6px; }
            .meta { color: #5d6b6e; margin: 8px 0 24px; }
            .item { margin-bottom: 14px; }
            .row { display: flex; justify-content: space-between; font-weight: 700; }
          </style>
        </head>
        <body>${resumePaper.value.innerHTML}</body>
      </html>
    `
    const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' })
    downloadBlob(blob, fileName)
  } catch (error) {
    alert(error.message)
  }
}

async function exportPdf() {
  try {
    await nextTick()
    const fileName = `${buildExportName()}.pdf`
    const canvas = await html2canvas(resumePaper.value, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    })
    const imageData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'pt', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imageHeight = (canvas.height * pageWidth) / canvas.width
    let remainingHeight = imageHeight
    let position = 0

    pdf.addImage(imageData, 'PNG', 0, position, pageWidth, imageHeight)
    remainingHeight -= pageHeight

    while (remainingHeight > 0) {
      position = remainingHeight - imageHeight
      pdf.addPage()
      pdf.addImage(imageData, 'PNG', 0, position, pageWidth, imageHeight)
      remainingHeight -= pageHeight
    }

    pdf.save(fileName)
  } catch (error) {
    alert(error.message)
  }
}
</script>
