const axios = require('axios')
const moment = require('moment')

const alertmanagerUrl = 'http://localhost:9093/api/v2/alerts'

async function sendAlertToAlertmanager(alert) {
  try {
    const response = await axios.post(alertmanagerUrl, alert)
    console.log('Alert sent to Alertmanager:', response.data)
  } catch (error) {
    console.error('Error sending alert to Alertmanager:', error)
  }
}
const startsAt = moment().toISOString(); // Use the current time as the startsAt timestamp

// Example alert format
 const alert = [
  {
    labels: {
      severity: 'critical',
      type: 'nodejs',
      alertname: 'SomethingWentWrong', 
    },
    annotations: {
      summary: 'Something went wrong!',
      description: 'the something went really wrong!.',
    },
    startsAt: startsAt,
    // endsAt: moment().add(1, 'hours').toISOString(),
    status: 'firing',
    
  },
]
const resolvedAlert = [
  {
    labels: { 
      severity: 'critical',
      type: 'nodejs',
      alertname: 'SomethingWentWrong', 
    },
    annotations: { 
      summary: 'Resolved: Something went wrong!',
      description: 'The issue has been resolved.',
    },
    // startsAt: startsAt,
    // endsAt: moment().add(1, 'hours').toISOString(),
    status: 'resolved',
  },
]

// Send the alert
sendAlertToAlertmanager(alert)

// //go to http://localhost:9093/#/alerts and wait 5 sec
// setTimeout(() => {
//   sendAlertToAlertmanager(alert)
// }, 16000)
