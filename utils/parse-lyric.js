//[00:00:00]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString) {
  const lyricStrings = lyricString.split("\n")
  const lyricInfo = []
  for (const lineString of lyricStrings) {
    // [00:12.570]难以忘记初次见你
    const timeResult = timeRegExp.exec(lineString)
    // console.log(timeResult);
    // 跳过 
    if (!timeResult) continue
    // 获取时间
    const min = timeResult[1] * 60 * 1000
    const s = timeResult[2] * 1000
    const ms = timeResult[3].length === 2 ? timeResult[3] * 10 : timeResult[3] * 1

    const time = min + s + ms
    // console.log(time);

    // 获取歌词文本
    // replace 替换文本 替换成空
    const text = lineString.replace(timeRegExp, '')
    // console.log(`time:${time},text:${text}`);

    lyricInfo.push({
      time,
      text
    })

  }
  return lyricInfo
}