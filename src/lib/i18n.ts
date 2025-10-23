/**
 * Internationalization (i18n) utilities and translations
 */

export type Locale = 'en' | 'zh'

export interface Translations {
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    save: string
    delete: string
    edit: string
    close: string
    back: string
    next: string
    previous: string
    submit: string
    reset: string
    copy: string
    share: string
    print: string
    download: string
    upload: string
    search: string
    filter: string
    sort: string
    export: string
    import: string
  }
  navigation: {
    home: string
    dashboard: string
    calculator: string
    reports: string
  }
  calculator: {
    title: string
    subtitle: string
    propertyDetails: string
    financing: string
    purchasePrice: string
    downPayment: string
    monthlyRent: string
    interestRate: string
    loanYears: string
    propertyTax: string
    insurance: string
    hoa: string
    management: string
    maintenance: string
    vacancy: string
    results: string
    monthlyCashFlow: string
    annualCashFlow: string
    capRate: string
    roi: string
    dscr: string
    breakEvenRent: string
    downPaymentAmount: string
    loanAmount: string
    monthlyPI: string
    totalMonthlyExpenses: string
    errors: {
      required: string
      invalidNumber: string
      minValue: string
      maxValue: string
    }
  }
  reports: {
    title: string
    subtitle: string
    modules: string
    selectModules: string
    propertyAnalysis: string
    cashFlow: string
    expenseBreakdown: string
    marketComparison: string
    executiveSummary: string
    financialMetrics: string
    expenseAnalysis: string
    marketInsights: string
    reportGenerated: string
    importCSV: string
    exportCSV: string
    csvTemplate: string
    selectFile: string
    noFileSelected: string
    invalidFile: string
    processingFile: string
    fileProcessed: string
    errors: {
      fileRequired: string
      invalidFormat: string
      parseError: string
    }
  }
  dashboard: {
    title: string
    subtitle: string
    totalProperties: string
    totalCashFlow: string
    averageROI: string
    portfolioPerformance: string
    propertyRankings: string
    sortedByCashFlow: string
    noProperties: string
    addFirstProperty: string
  }
}

const translations: Record<Locale, Translations> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
      copy: 'Copy',
      share: 'Share',
      print: 'Print',
      download: 'Download',
      upload: 'Upload',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
    },
    navigation: {
      home: 'Home',
      dashboard: 'Dashboard',
      calculator: 'ROI Calculator',
      reports: 'Reports',
    },
    calculator: {
      title: 'ROI Calculator',
      subtitle: 'Comprehensive real estate investment analysis',
      propertyDetails: 'Property Details & Financing',
      financing: 'Enter the property and loan information',
      purchasePrice: 'Purchase Price',
      downPayment: 'Down Payment %',
      monthlyRent: 'Monthly Rent',
      interestRate: 'Interest Rate %',
      loanYears: 'Loan Term (Years)',
      propertyTax: 'Property Tax % (Annual)',
      insurance: 'Monthly Insurance',
      hoa: 'Monthly HOA',
      management: 'Management Fee %',
      maintenance: 'Maintenance %',
      vacancy: 'Vacancy %',
      results: 'Investment Analysis',
      monthlyCashFlow: 'Monthly Cash Flow',
      annualCashFlow: 'Annual Cash Flow',
      capRate: 'Cap Rate',
      roi: 'Cash-on-Cash Return',
      dscr: 'DSCR',
      breakEvenRent: 'Break-Even Rent',
      downPaymentAmount: 'Down Payment',
      loanAmount: 'Loan Amount',
      monthlyPI: 'Monthly P&I',
      totalMonthlyExpenses: 'Total Monthly Expenses',
      errors: {
        required: 'This field is required',
        invalidNumber: 'Please enter a valid number',
        minValue: 'Value must be greater than {min}',
        maxValue: 'Value must be less than {max}',
      },
    },
    reports: {
      title: 'Investment Reports',
      subtitle: 'Generate and download detailed property analysis reports',
      modules: 'Report Modules',
      selectModules: 'Select which sections to include in your report',
      propertyAnalysis: 'Property Analysis',
      cashFlow: 'Cash Flow',
      expenseBreakdown: 'Expense Breakdown',
      marketComparison: 'Market Comparison',
      executiveSummary: 'Executive Summary',
      financialMetrics: 'Financial Metrics',
      expenseAnalysis: 'Expense Analysis',
      marketInsights: 'Market Comparison',
      reportGenerated: 'Report generated on {date} • BridgeStay Analytics',
      importCSV: 'Import CSV',
      exportCSV: 'Export CSV',
      csvTemplate: 'Download Template',
      selectFile: 'Select CSV File',
      noFileSelected: 'No file selected',
      invalidFile: 'Invalid file format',
      processingFile: 'Processing file...',
      fileProcessed: 'File processed successfully',
      errors: {
        fileRequired: 'Please select a file',
        invalidFormat: 'Invalid CSV format',
        parseError: 'Error parsing CSV file',
      },
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your property investments',
      totalProperties: 'Total Properties',
      totalCashFlow: 'Total Cash Flow',
      averageROI: 'Average ROI',
      portfolioPerformance: 'Portfolio Performance',
      propertyRankings: 'Property Rankings',
      sortedByCashFlow: 'Properties sorted by monthly cash flow',
      noProperties: 'No properties found',
      addFirstProperty: 'Add Your First Property',
    },
  },
  zh: {
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      submit: '提交',
      reset: '重置',
      copy: '复制',
      share: '分享',
      print: '打印',
      download: '下载',
      upload: '上传',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      export: '导出',
      import: '导入',
    },
    navigation: {
      home: '首页',
      dashboard: '仪表板',
      calculator: '投资回报计算器',
      reports: '报告',
    },
    calculator: {
      title: '投资回报计算器',
      subtitle: '全面的房地产投资分析',
      propertyDetails: '房产详情和融资',
      financing: '输入房产和贷款信息',
      purchasePrice: '购买价格',
      downPayment: '首付比例 %',
      monthlyRent: '月租金',
      interestRate: '利率 %',
      loanYears: '贷款年限',
      propertyTax: '房产税 % (年)',
      insurance: '月保险费',
      hoa: '月物业费',
      management: '管理费 %',
      maintenance: '维护费 %',
      vacancy: '空置率 %',
      results: '投资分析',
      monthlyCashFlow: '月现金流',
      annualCashFlow: '年现金流',
      capRate: '资本化率',
      roi: '现金回报率',
      dscr: '债务覆盖率',
      breakEvenRent: '盈亏平衡租金',
      downPaymentAmount: '首付金额',
      loanAmount: '贷款金额',
      monthlyPI: '月供本息',
      totalMonthlyExpenses: '月总支出',
      errors: {
        required: '此字段为必填项',
        invalidNumber: '请输入有效数字',
        minValue: '值必须大于 {min}',
        maxValue: '值必须小于 {max}',
      },
    },
    reports: {
      title: '投资报告',
      subtitle: '生成和下载详细的房产分析报告',
      modules: '报告模块',
      selectModules: '选择要在报告中包含的部分',
      propertyAnalysis: '房产分析',
      cashFlow: '现金流',
      expenseBreakdown: '支出明细',
      marketComparison: '市场对比',
      executiveSummary: '执行摘要',
      financialMetrics: '财务指标',
      expenseAnalysis: '支出分析',
      marketInsights: '市场对比',
      reportGenerated: '报告生成于 {date} • BridgeStay Analytics',
      importCSV: '导入 CSV',
      exportCSV: '导出 CSV',
      csvTemplate: '下载模板',
      selectFile: '选择 CSV 文件',
      noFileSelected: '未选择文件',
      invalidFile: '无效的文件格式',
      processingFile: '处理文件中...',
      fileProcessed: '文件处理成功',
      errors: {
        fileRequired: '请选择文件',
        invalidFormat: '无效的 CSV 格式',
        parseError: '解析 CSV 文件时出错',
      },
    },
    dashboard: {
      title: '仪表板',
      subtitle: '您的房产投资概览',
      totalProperties: '总房产数',
      totalCashFlow: '总现金流',
      averageROI: '平均投资回报率',
      portfolioPerformance: '投资组合表现',
      propertyRankings: '房产排名',
      sortedByCashFlow: '按月现金流排序的房产',
      noProperties: '未找到房产',
      addFirstProperty: '添加您的第一个房产',
    },
  },
}

// Current locale state
let currentLocale: Locale = 'en'

// Translation function
export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.')
  let value: any = translations[currentLocale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation missing for key: ${key}`)
    return key
  }
  
  // Replace parameters
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return String(params[paramKey] || match)
    })
  }
  
  return value
}

// Set locale
export function setLocale(locale: Locale): void {
  currentLocale = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

// Get current locale
export function getLocale(): Locale {
  return currentLocale
}

// Initialize locale from localStorage or browser
export function initializeLocale(): void {
  const savedLocale = localStorage.getItem('locale') as Locale
  const browserLocale = navigator.language.startsWith('zh') ? 'zh' : 'en'
  const locale = savedLocale || browserLocale
  
  setLocale(locale)
}

// Hook for using translations in React components
export function useTranslation() {
  return {
    t,
    locale: currentLocale,
    setLocale,
  }
}
