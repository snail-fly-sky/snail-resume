import { defineStore } from 'pinia'

const STORAGE_KEY = 'resume-workbench-data'

function makeId() {
  return crypto.randomUUID()
}

function createSeedResume() {
  return {
    id: makeId(),
    title: '前端工程师简历',
    updatedAt: new Date().toISOString(),
    basics: {
      name: '张明',
      role: 'Vue 前端工程师',
      email: 'zhangming@example.com',
      phone: '138 0000 0000',
      city: '上海',
      summary: '5 年前端开发经验，长期负责中后台与数据可视化项目，熟悉 Vue3、组件化设计、性能优化和复杂表单工程。'
    },
    skills: 'Vue3, JavaScript, Vite, Pinia, Element Plus, ECharts, HTML5, CSS3',
    experiences: [
      {
        id: makeId(),
        company: '云舟科技',
        position: '高级前端工程师',
        start: '2022.04',
        end: '至今',
        description: '负责招聘管理平台核心模块，设计可复用表单组件与权限控制方案，将关键页面首屏加载时间降低 35%。'
      },
      {
        id: makeId(),
        company: '星环数据',
        position: '前端工程师',
        start: '2019.07',
        end: '2022.03',
        description: '参与 BI 报表系统建设，封装图表配置器与拖拽布局能力，支持运营人员快速搭建业务看板。'
      }
    ],
    projects: [
      {
        id: makeId(),
        name: '人才库协同平台',
        role: '前端负责人',
        description: '搭建候选人画像、标签检索、面试流转等功能，统一设计系统并沉淀 20 余个业务组件。'
      }
    ],
    educations: [
      {
        id: makeId(),
        school: '华东理工大学',
        major: '软件工程',
        degree: '本科',
        period: '2015.09 - 2019.06'
      }
    ]
  }
}

function createBlankResume() {
  return {
    id: makeId(),
    title: '未命名简历',
    updatedAt: new Date().toISOString(),
    basics: {
      name: '新简历',
      role: '求职方向',
      email: 'email@example.com',
      phone: '手机号码',
      city: '城市',
      summary: '请填写个人摘要。'
    },
    skills: 'Vue3, JavaScript',
    experiences: [],
    projects: [],
    educations: []
  }
}

function loadResumes() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === null) {
    return [createSeedResume()]
  }
  return JSON.parse(saved)
}

export const useResumeStore = defineStore('resume', {
  state: () => {
    const resumes = loadResumes()
    return {
      resumes,
      currentId: resumes[0].id
    }
  },
  getters: {
    currentResume: (state) => {
      return state.resumes.find((resume) => resume.id === state.currentId)
    },
    skillList: (state) => {
      const resume = state.resumes.find((item) => item.id === state.currentId)
      if (resume === undefined) {
        return []
      }
      return resume.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0)
    }
  },
  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.resumes))
    },
    hasResume(id) {
      return this.resumes.some((resume) => resume.id === id)
    },
    setCurrentId(id) {
      if (!this.hasResume(id)) {
        throw new Error('简历不存在。')
      }
      this.currentId = id
    },
    touchCurrentResume() {
      this.currentResume.updatedAt = new Date().toISOString()
    },
    createResume() {
      const resume = createBlankResume()
      this.resumes.unshift(resume)
      this.currentId = resume.id
      return resume.id
    },
    duplicateCurrentResume() {
      const copy = structuredClone(this.currentResume)
      copy.id = makeId()
      copy.title = `${copy.title} 副本`
      copy.updatedAt = new Date().toISOString()
      copy.experiences.forEach((item) => {
        item.id = makeId()
      })
      copy.projects.forEach((item) => {
        item.id = makeId()
      })
      copy.educations.forEach((item) => {
        item.id = makeId()
      })
      this.resumes.unshift(copy)
      this.currentId = copy.id
      return copy.id
    },
    deleteCurrentResume() {
      if (this.resumes.length === 1) {
        throw new Error('至少保留一份简历。')
      }

      const index = this.resumes.findIndex((resume) => resume.id === this.currentId)
      this.resumes.splice(index, 1)
      this.currentId = this.resumes[0].id
      return this.currentId
    },
    addExperience() {
      this.currentResume.experiences.push({
        id: makeId(),
        company: '公司名称',
        position: '职位名称',
        start: '开始时间',
        end: '结束时间',
        description: '请填写工作内容。'
      })
      this.touchCurrentResume()
    },
    removeExperience(index) {
      this.currentResume.experiences.splice(index, 1)
      this.touchCurrentResume()
    },
    addProject() {
      this.currentResume.projects.push({
        id: makeId(),
        name: '项目名称',
        role: '项目角色',
        description: '请填写项目描述。'
      })
      this.touchCurrentResume()
    },
    removeProject(index) {
      this.currentResume.projects.splice(index, 1)
      this.touchCurrentResume()
    },
    addEducation() {
      this.currentResume.educations.push({
        id: makeId(),
        school: '学校名称',
        major: '专业名称',
        degree: '学历',
        period: '时间范围'
      })
      this.touchCurrentResume()
    },
    removeEducation(index) {
      this.currentResume.educations.splice(index, 1)
      this.touchCurrentResume()
    }
  }
})
