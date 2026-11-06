// All copy comes from konten.md section 3. `**text**` renders as emphasis.

import relaDesign from '../assets/rela/volunteer-home-design.webp'
import relaFoundationHome from '../assets/rela/foundation-home.webp'
import relaFoundationVolunteers from '../assets/rela/foundation-volunteers.webp'
import relaVolunteerProfile from '../assets/rela/foundation-volunteer-profile.webp'

import ufestVideo from '../assets/umnfest/events.mp4'
import ufestPoster from '../assets/umnfest/events-poster.webp'

import snakeVideo from '../assets/wemen/snake.mp4'
import snakePoster from '../assets/wemen/snake-poster.webp'
import gameplayVideo from '../assets/wemen/gameplay.mp4'
import gameplayPoster from '../assets/wemen/gameplay-poster.webp'
import wemenTitle from '../assets/wemen/title-screen.webp'

import moodHero from '../assets/mood/hero.webp'
import moodSliders from '../assets/mood/sliders.webp'

const PHONE = { width: 640, height: 1386 }
const VIDEO = { width: 1280, height: 548 }

export const projects = [
  {
    id: 'rela',
    title: 'ReLa',
    subtitle: 'Volunteer care for elderly people living alone',
    type: 'Hackathon project, Android app, team of 4',
    event: 'Hackathon JOINTS UGM 2026, Healthcare track',
    oneLiner:
      'Connects families who live far away with community volunteers through foundations, so elderly people living alone get regular visits and families stay informed.',
    roleShort: 'Foundation & Volunteer UI',
    role: 'Designed the UI for the **Foundation** and **Volunteer** roles in Figma, then turned the designs into the app with AI-assisted coding.',
    cardTags: ['Figma', 'UI design', 'AI-assisted development'],
    tech: [
      { label: 'Project tech', items: ['Flutter', 'Supabase', 'Google Gemini', 'Firebase Cloud Messaging'] },
      { label: 'My tools', items: ['Figma', 'UI design', 'AI-assisted development'] },
    ],
    howItWorks: [
      {
        title: 'Family',
        text: "Registers the elder, accepts a suggested volunteer, follows the elder's condition through charts and history, approves visit schedules.",
      },
      {
        title: 'Volunteer',
        text: 'Sees schedules per elder and a home timeline, tells the story of each visit by typing or voice; AI pulls out key points which the volunteer checks before saving; emergency button that alerts family and foundation.',
      },
      {
        title: 'Foundation',
        text: 'Verifies volunteers, matches them with elders, follows up on reports.',
      },
    ],
    highlights: [
      '3 user roles, each with its own interface',
      '145 Flutter tests + 52 server unit tests',
      'Volunteer suggestions based on skills, distance, and workload',
    ],
    links: [
      {
        label: 'View design in Figma',
        href: 'https://www.figma.com/design/x5Vf2BRLgWW5eUmgErV1ul/TemanSenja-%E2%80%94-Prototype?node-id=1-5',
      },
      { label: 'Release / APK', href: 'https://github.com/AltoDevv/rela-submission/releases/tag/v1.0.1' },
      { label: 'Repository', href: 'https://github.com/AltoDevv/rela-submission' },
    ],
    cover: {
      kind: 'phone',
      src: relaDesign,
      width: 312,
      height: 715,
      alt: 'ReLa volunteer home screen, Figma design',
    },
    gallery: {
      kind: 'phones',
      items: [
        { src: relaDesign, width: 312, height: 715, caption: 'Volunteer home screen, Figma design' },
        { src: relaFoundationHome, ...PHONE, caption: 'Foundation dashboard, real app' },
        { src: relaFoundationVolunteers, ...PHONE, caption: 'Foundation volunteer list, real app' },
        { src: relaVolunteerProfile, ...PHONE, caption: 'Volunteer profile seen by foundation' },
      ],
    },
  },
  {
    id: 'umnfest',
    title: 'UMN Festival 2026',
    subtitle: 'Official festival website',
    type: 'Live public website, team project',
    oneLiner:
      "Official website of UMN's biggest annual festival: concerts, sports and esports competitions, exhibitions, and social events.",
    roleShort: 'Built the Events page',
    role: 'Built the **Events** page, which shows all the events happening at UFEST: Unveiling (opening), Ulympic and E-Ulympic (competitions), U-Care (social activities), and Unify (the closing peak event).',
    cardTags: ['JavaScript', 'CSS', 'HTML'],
    tech: [{ label: 'Tech', items: ['JavaScript', 'CSS', 'HTML'] }],
    highlights: ['Public, live website used by the campus community'],
    links: [
      { label: 'Events page', href: 'https://umnfestival.com/event' },
      { label: 'Website', href: 'https://umnfestival.com/' },
    ],
    cover: {
      kind: 'video',
      src: ufestVideo,
      poster: ufestPoster,
      width: 1280,
      height: 720,
      alt: 'Scrolling through the UMN Festival Events page',
    },
    gallery: {
      kind: 'viewer',
      items: [
        {
          type: 'video',
          src: ufestVideo,
          poster: ufestPoster,
          width: 1280,
          height: 720,
          caption: 'Scrolling through the Events page',
        },
      ],
    },
  },
  {
    id: 'wemen',
    title: 'WEMEN',
    subtitle: 'Cozy pixel life-sim game',
    type: 'Browser game, team final project',
    oneLiner: 'A cozy 2D pixel life-sim game with a snake mini game.',
    roleShort: 'Snake game, UI, logic',
    role: 'Built the snake mini game, designed the UI, and implemented parts of the game logic.',
    cardTags: ['React', 'JavaScript', 'CSS', 'Vite'],
    tech: [{ label: 'Tech', items: ['React', 'JavaScript', 'CSS', 'Vite', 'GitHub Pages'] }],
    highlights: ['Playable directly in the browser, no install'],
    links: [
      { label: 'Play', href: 'https://mikaelgeraldius.github.io/UAS-WEMEN/' },
      { label: 'Repository', href: 'https://github.com/mikaelgeraldius/UAS-WEMEN' },
    ],
    cover: {
      kind: 'video',
      src: snakeVideo,
      poster: snakePoster,
      ...VIDEO,
      alt: 'Snake mini game in WEMEN',
    },
    gallery: {
      kind: 'viewer',
      items: [
        { type: 'video', src: snakeVideo, poster: snakePoster, ...VIDEO, caption: 'Snake mini game (my part)' },
        { type: 'video', src: gameplayVideo, poster: gameplayPoster, ...VIDEO, caption: 'Walking around the game world' },
        { type: 'image', src: wemenTitle, width: 1600, height: 701, caption: 'Title / character select screen' },
      ],
    },
  },
  {
    id: 'mood',
    title: 'Song Mood Classifier',
    subtitle: 'AI project',
    type: 'University final project, group of 5, UMN',
    oneLiner:
      "An AI model that predicts a song's mood (sad, happy, energetic, or calm) from its audio features, like energy and tempo.",
    roleShort: 'Built the AI model',
    role: 'Built and trained the AI model.',
    roleNote: 'Web demo built by a teammate (Mikael Geraldius Gunawan).',
    cardTags: ['Python'],
    tech: [{ label: 'Tech', items: ['Python'] }],
    dataset: {
      text: 'Almost 278,000 songs',
      label: '278k Emotion Labeled Spotify Songs (Moodify)',
      href: 'https://baselight.app/u/kaggle/dataset/abdullahorzan_moodify_dataset',
    },
    highlights: [
      '92% accuracy on songs the model had never seen',
      'Interactive live demo, try it in the browser',
    ],
    links: [
      { label: 'Live demo', href: 'https://mikaelgeraldius.github.io/mood-classifier/' },
      { label: 'Repository', href: 'https://github.com/mikaelgeraldius/mood-classifier' },
    ],
    cover: {
      kind: 'image',
      src: moodHero,
      width: 1600,
      height: 632,
      alt: 'Song Mood Classifier demo page showing a mood prediction',
    },
    gallery: {
      kind: 'viewer',
      items: [
        { type: 'image', src: moodHero, width: 1600, height: 632, caption: 'Demo page with a mood prediction' },
        { type: 'image', src: moodSliders, width: 1600, height: 688, caption: 'Feature sliders and prediction' },
      ],
    },
  },
]
