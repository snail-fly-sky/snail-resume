<template>
  <main class="home-page">
    <section class="home-hero">
      <nav class="home-nav" aria-label="首页导航">
        <div class="home-brand">
          <span class="home-brand-mark">S</span>
          <span>Snail Resume</span>
        </div>
        <el-button class="home-nav-action" type="primary" round @click="goWorkbench">
          进入工作台
        </el-button>
      </nav>

      <div class="home-hero-grid">
        <div class="home-copy">
          <el-tag class="home-kicker" effect="plain" type="info">Resume Workbench</el-tag>
          <h1>Snail Resume</h1>
          <p>
            把简历写成一份清晰的职业说明书。从基础信息、经历结构到实时预览，集中在一个安静的编辑界面里完成。
          </p>
          <div class="home-metric-grid" aria-label="简历工作流概览">
            <span>
              <b>01</b>
              <strong>编辑</strong>
              <small>信息分区整理</small>
            </span>
            <span>
              <b>02</b>
              <strong>预览</strong>
              <small>版式实时同步</small>
            </span>
            <span>
              <b>03</b>
              <strong>交付</strong>
              <small>多格式导出</small>
            </span>
          </div>
          <div class="home-actions">
            <el-button class="home-primary-button" type="primary" size="large" @click="goWorkbench">
              开始制作简历
            </el-button>
            <el-button class="home-secondary-button" size="large" @click="goWorkbench">
              查看当前简历
            </el-button>
          </div>
          <div class="home-signal-strip" aria-label="工作台状态">
            <span><strong>05</strong>简历区块</span>
            <span><strong>Live</strong>实时预览</span>
            <span><strong>DOC/PDF</strong>导出</span>
          </div>
        </div>

        <div class="home-preview" aria-label="简历工作台入口预览">
          <div class="home-preview-toolbar">
            <span></span>
            <span></span>
            <span></span>
            <b>WORKBENCH</b>
          </div>
          <div class="home-live-card">
            <small>Now editing</small>
            <strong>项目经历</strong>
            <span>3 items synced</span>
          </div>
          <div class="home-preview-paper">
            <div class="home-preview-head">
              <strong>张明</strong>
              <small>Vue 前端工程师</small>
            </div>
            <div class="home-preview-line wide"></div>
            <div class="home-preview-line"></div>
            <div class="home-preview-chips">
              <span>Vue3</span>
              <span>Vite</span>
              <span>Pinia</span>
            </div>
            <div class="home-preview-section">
              <b></b>
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="home-preview-rail" aria-hidden="true">
            <span>EDIT</span>
            <span>PREVIEW</span>
            <span>EXPORT</span>
          </div>
        </div>
      </div>
    </section>

    <section class="home-feature-band" aria-label="工作台能力">
      <article>
        <span>01</span>
        <h2>结构化编辑</h2>
        <p>基础信息、工作经历、项目经历和教育经历分区维护，减少来回查找。</p>
      </article>
      <article>
        <span>02</span>
        <h2>实时预览</h2>
        <p>编辑内容同步到右侧简历纸面，桌面端双栏查看，移动端专注编辑。</p>
      </article>
      <article>
        <span>03</span>
        <h2>导出交付</h2>
        <p>支持 Word 与 PDF 导出，方便按不同岗位快速生成投递版本。</p>
      </article>
    </section>

    <section class="home-workflow-band" aria-label="简历制作流程">
      <div class="home-workflow-copy">
        <span>Pipeline</span>
        <h2>一个工作台完成草稿、检查和交付</h2>
      </div>
      <div class="home-flow-list">
        <span>资料录入</span>
        <span>内容打磨</span>
        <span>纸面校对</span>
        <span>导出投递</span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goWorkbench() {
  router.push('/workbench')
}
</script>
