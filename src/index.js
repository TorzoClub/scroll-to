import BezierEasing from 'bezier-easing'

const throwError = msg => { throw Error(`[scroll-to] ${msg}`) }

export default function scrollTo(opt) {
  const {
    container = document.body,
    valueProperty = 'scrollTop',
    value = throwError('require value'),
    cubicBezier = [0.25, 0.1, 0.25, 1],
    duration = 1000,
    done
  } = opt

  let needStop = false
  const initValue = container[valueProperty]
  const length = value - initValue

  const easing = BezierEasing(...cubicBezier)

  let initTime = null

  const animateFrame = time => {
    if (initTime === null) {
      initTime = time
    }

    const currentTime = time - initTime

    const percent = easing(currentTime / duration)

    container[valueProperty] = initValue + (percent * length)

    if (currentTime > duration) {
      needStop = true
    }

    if (needStop) {
      done && done()
    } else {
      window.requestAnimationFrame(animateFrame)
    }
  }

  window.requestAnimationFrame(animateFrame)

  return () => {
    needStop = true
  }
}
