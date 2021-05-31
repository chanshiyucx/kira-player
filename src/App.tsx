import React, { useState, useEffect, useCallback, useRef, MouseEvent } from 'react'
import './App.css'
import './main.css'
import { Music } from './types'
import { Icons, HeartIcon, LinkIcon, PrevIcon, NextIcon, PauseIcon, PlayIcon } from './Icons'

const tracks: Array<Music> = [
  {
    name: 'Mekanın Sahibi',
    artist: 'Norm Ender',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3',
    url: 'https://www.youtube.com/watch?v=z3wAjJXbYzA',
    favorited: false,
  },
  {
    name: 'Everybody Knows',
    artist: 'Leonard Cohen',
    cover: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg',
    source: 'https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3',
    url: 'https://www.youtube.com/watch?v=Lin-a2lTelg',
    favorited: false,
  },
]

function App() {
  // 当前播放的音乐
  const [audio, setAudio] = useState(new Audio())
  const [currentTrack, setCurrentTrack] = useState(tracks[0])
  const [favorited, setFavorited] = useState(currentTrack.favorited)
  const [isTimerPlaying, setIsTimerPlaying] = useState(false)
  const [barWidth, setBarWidth] = useState(0)
  const [duration, setDuration] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const progressEl = useRef<HTMLDivElement>(null)

  // 播放进度
  const generateTime = useCallback(() => {
    const width = (audio.currentTime / audio.duration) * 100
    setBarWidth(width)
    const durmin = Math.floor(audio.duration / 60) || 0
    const dursec = Math.floor(audio.duration - durmin * 60) || 0
    const curmin = Math.floor(audio.currentTime / 60) || 0
    const cursec = Math.floor(audio.currentTime - curmin * 60) || 0
    setDuration(`${durmin.toString().padStart(2, '0')}:${dursec.toString().padStart(2, '0')}`)
    setCurrentTime(`${curmin.toString().padStart(2, '0')}:${cursec.toString().padStart(2, '0')}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 切换音乐重新监听
  useEffect(() => {
    audio.src = currentTrack.source
    audio.ontimeupdate = generateTime
    audio.onloadedmetadata = generateTime
    audio.onended = () => setIsTimerPlaying(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack])

  // 预加载音乐封面
  useEffect(() => {
    tracks.forEach((track) => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = track.cover
      link.as = 'image'
      document.head.appendChild(link)
    })
  }, [])

  // 播放音乐
  const play = () => {
    if (audio.paused) {
      audio.play()
      setIsTimerPlaying(true)
    } else {
      audio.pause()
      setIsTimerPlaying(false)
    }
  }

  // 重置
  const resetPlayer = () => {
    setBarWidth(0)
    audio.currentTime = 0
    audio.src = currentTrack.source
    setTimeout(() => {
      if (isTimerPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }, 300)
  }

  // 切换歌曲
  const switchTrack = (option = 'prev') => {
    const currentTrackIndex = tracks.findIndex((track) => track.name === currentTrack.name)
    let newTrackIndex
    if (option === 'prev') {
      newTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1
    } else {
      newTrackIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0
    }
    const track = tracks[newTrackIndex]
    setCurrentTrack(track)
    setFavorited(track.favorited)
    resetPlayer()
  }

  // ❤
  const favorite = () => {
    currentTrack.favorited = !currentTrack.favorited
    setFavorited(currentTrack.favorited)
  }

  // 跳转进度
  const clickProgress = (e: MouseEvent<HTMLElement>) => {
    audio.pause()
    setIsTimerPlaying(true)

    const x = e.pageX
    const maxduration = audio.duration
    const progress = progressEl?.current as any
    const position = x - progress.offsetLeft
    let percentage = (100 * position) / progress.offsetWidth
    percentage = Math.max(0, Math.min(100, percentage)) // 0 < percentage < 100
    setBarWidth(percentage)
    audio.currentTime = (maxduration * percentage) / 100
    audio.play()
  }

  return (
    <div>
      <div className="wrapper" id="app">
        <div className="player">
          <div className="player__top">
            <div className="player-cover">
              <div className="player-cover__item" style={{ backgroundImage: `url(${currentTrack.cover})` }}></div>
            </div>
            <div className="player-controls">
              <div className={`player-controls__item -favorite ${favorited ? 'active' : ''}`} onClick={favorite}>
                <HeartIcon />
              </div>
              <a href={currentTrack.url} target="_blank" className="player-controls__item" rel="noopener noreferrer">
                <LinkIcon />
              </a>
              <div className="player-controls__item" onClick={() => switchTrack('prev')}>
                <PrevIcon />
              </div>
              <div className="player-controls__item" onClick={() => switchTrack('next')}>
                <NextIcon />
              </div>
              <div className="player-controls__item -xl js-play" onClick={play}>
                <svg className="icon">{isTimerPlaying ? <PauseIcon /> : <PlayIcon />}</svg>
              </div>
            </div>
          </div>
          <div className="progress" ref={progressEl}>
            <div className="progress__top">
              <div className="album-info" v-if="currentTrack">
                <div className="album-info__name">{currentTrack.artist}</div>
                <div className="album-info__track">{currentTrack.name}</div>
              </div>
              <div className="progress__duration">{duration}</div>
            </div>
            <div className="progress__bar" onClick={clickProgress}>
              <div className="progress__current" style={{ width: `${barWidth}%` }}></div>
            </div>
            <div className="progress__time">{currentTime}</div>
          </div>
        </div>
      </div>
      <Icons />
    </div>
  )
}

export default App
