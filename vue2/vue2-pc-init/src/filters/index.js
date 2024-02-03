import moment from 'moment'

export default {
  dateFormat: (val) => {
    if(!val){
      return ''
    }
    val = val - 0
    return moment(val).format('YYYY-MM-DD')
  }
}
