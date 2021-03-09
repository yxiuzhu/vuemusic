import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

// 热门搜索词 jsonp
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

// 抓取搜索页的推荐数据（suggest.vue） == 反向代理
export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    g_tk: 5381,
    new_json: 1,
    remoteplace: 'txt.yqq.center',
    t: 0,
    aggr: 1,
    cr: 1,
    flag_qc: 0,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    qqmusic_ver: 1298,
  })

  return jsonp(url, data, options)
}
