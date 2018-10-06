import Vue from 'vue'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const dateFilter = value => {
  return formatDate(value)
}

function formatDate(inputDate) {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const formattedDate = day + '. ' + months[month] + ' ' + year
  return formattedDate
}

Vue.filter('date', dateFilter)

// 使用 Fileter, 在你们模板里, 例如：
// <p> Last updated on {{ updateDate | date }} </p>
