import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import * as dataEn from './data'
import * as dataVi from './data.vi'
const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Phone = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6.6 3.5 9 8.1 6.9 9.8c1.2 2.6 3.3 4.7 5.9 5.9l1.7-2.1 4.6 2.4c.5.3.8.8.7 1.4l-.4 2.7c-.1.7-.7 1.2-1.4 1.2C9.7 21.3 2.7 14.3 2.7 6c0-.7.5-1.3 1.2-1.4l2.7-.4c.4-.1.8.1 1 .5Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
const Mail = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MapPin = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const Github = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15.7 21v-3.9c.04-1-.35-1.96-1.1-2.65 3.68-.41 7.55-1.8 7.55-8.15A6.36 6.36 0 0 0 20.46 1.9 5.92 5.92 0 0 0 20.3-2s-1.33-.43-4.36 1.68a15.15 15.15 0 0 0-7.94 0C4.97-2.43 3.64-2 3.64-2a5.92 5.92 0 0 0-.16 3.9A6.36 6.36 0 0 0 1.8 6.3c0 6.33 3.85 7.74 7.53 8.16a4.66 4.66 0 0 0-1.08 2.63V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 2)" />
  </svg>
)

const LinkedIn = ({ size = 18 }) => (
  <span
    style={{
      width: size,
      height: size,
      border: '1.6px solid currentColor',
      borderRadius: '3px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${size * 0.55}px`,
      fontWeight: 800,
      lineHeight: 1,
      background: 'transparent',
      color: 'currentColor',
      boxSizing: 'border-box',
    }}
    aria-hidden="true"
  >
    in
  </span>
)

const Menu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const X = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)


function getExperienceLogo(item) {
  if (item?.logo) return item.logo

  const searchableText = [
    item?.company,
    item?.organization,
    item?.role,
    item?.title,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  if (
    searchableText.includes('university of science') ||
    searchableText.includes('vnu-hcm') ||
    searchableText.includes('khoa học tự nhiên') ||
    searchableText.includes('đhqg-hcm') ||
    searchableText.includes('hcmus')
  ) {
    return '/assets/HCMUS.png'
  }

  if (
    searchableText.includes('pha distribution') ||
    searchableText.includes('pha việt nam') ||
    searchableText.includes('pha vietnam') ||
    searchableText.includes(' pha ')
  ) {
    return '/assets/PHA.png'
  }

  if (
    searchableText.includes('golabs') ||
    searchableText.includes('go labs')
  ) {
    return '/assets/golabs.png'
  }

  if (
    searchableText.includes('vsf') ||
    searchableText.includes('vin smart future') ||
    searchableText.includes('vinsmart future')
  ) {
    return '/assets/VSF.png'
  }

  return null
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('portfolio-language') || 'en',
  )

  const currentData = language === 'vi' ? dataVi : dataEn

  // Merge UI with English as a safe base so a missing key in data.vi.js
  // never crashes the whole React tree.
  const baseUi = dataEn.ui ?? {}
  const langUi = currentData.ui ?? {}

  const deploymentSectionFallback =
    language === 'vi'
      ? {
          eyebrow: '05 / TRIỂN KHAI THỰC TẾ',
          title: 'Dự án trong vận hành thực tế',
          description:
            'Một số bài viết công khai ghi nhận các dự án, hệ thống và dịch vụ đã được đưa vào vận hành thực tế.',
          openLabel: 'Xem bài viết',
        }
      : {
          eyebrow: '05 / DEPLOYED LINKS',
          title: 'Projects in real-world operation',
          description:
            'Selected public references highlighting systems and services that have been deployed in practice.',
          openLabel: 'Read article',
        }

  const ui = {
    ...baseUi,
    ...langUi,
    sectionAbout: {
      ...(baseUi.sectionAbout ?? {}),
      ...(langUi.sectionAbout ?? {}),
    },
    sectionSkills: {
      ...(baseUi.sectionSkills ?? {}),
      ...(langUi.sectionSkills ?? {}),
    },
    sectionProjects: {
      ...(baseUi.sectionProjects ?? {}),
      ...(langUi.sectionProjects ?? {}),
    },
    sectionExperience: {
      ...(baseUi.sectionExperience ?? {}),
      ...(langUi.sectionExperience ?? {}),
    },
    sectionContact: {
      ...(baseUi.sectionContact ?? {}),
      ...(langUi.sectionContact ?? {}),
    },
    sectionDeploymentLinks: {
      ...deploymentSectionFallback,
      ...(langUi.sectionDeploymentLinks ?? {}),
    },
    contactForm: {
      ...(baseUi.contactForm ?? {}),
      ...(langUi.contactForm ?? {}),
    },
    skillLevels: {
      ...(baseUi.skillLevels ?? {}),
      ...(langUi.skillLevels ?? {}),
    },
    heroBadges:
      Array.isArray(langUi.heroBadges) && langUi.heroBadges.length > 0
        ? langUi.heroBadges
        : baseUi.heroBadges ?? [],
  }

  const profile = {
    ...(dataEn.profile ?? {}),
    ...(currentData.profile ?? {}),
  }

  const projects = Array.isArray(currentData.projects)
    ? currentData.projects
    : dataEn.projects ?? []

  const skills = Array.isArray(currentData.skills)
    ? currentData.skills
    : dataEn.skills ?? []

  const experience = Array.isArray(currentData.experience)
    ? currentData.experience
    : dataEn.experience ?? []

  // Prefer the selected language's links. If they are missing, fall back to EN
  // instead of rendering a blank page.
  const deploymentLinks =
    Array.isArray(currentData.deploymentLinks) &&
    currentData.deploymentLinks.length > 0
      ? currentData.deploymentLinks
      : Array.isArray(dataEn.deploymentLinks)
        ? dataEn.deploymentLinks
        : []

  // Keep Links/Liên kết immediately before Contact/Liên hệ.
  const baseNav = (ui.nav ?? []).filter(
    ([id]) => id !== 'deployment-links' && id !== 'contact',
  )

  const nav = [
    ...baseNav,
    ['deployment-links', language === 'vi' ? 'Liên kết' : 'Links'],
    ['contact', language === 'vi' ? 'Liên hệ' : 'Contact'],
  ]

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  const [contactOpen, setContactOpen] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [contactError, setContactError] = useState('')
  const [contactForm, setContactForm] = useState({
    email: '',
    subject: '',
    message: '',
  })

  const modalScrollRef = useRef(null)
  const modalScrollbarTrackRef = useRef(null)
  const [scrollThumb, setScrollThumb] = useState({
    top: 0,
    height: 56,
    visible: false,
  })

  const updateModalScrollbar = () => {
    const scrollElement = modalScrollRef.current
    const trackElement = modalScrollbarTrackRef.current

    if (!scrollElement || !trackElement) return

    const { scrollTop, scrollHeight, clientHeight } = scrollElement
    const trackHeight = trackElement.clientHeight
    const hasOverflow = scrollHeight > clientHeight + 1

    if (!hasOverflow || trackHeight <= 0) {
      setScrollThumb({ top: 0, height: 0, visible: false })
      return
    }

    const visibleRatio = clientHeight / scrollHeight

    // Keep the thumb slightly shorter than the native proportional size
    // so the custom scrollbar looks compact inside the modal.
    const thumbHeight = Math.max(
      40,
      visibleRatio * trackHeight
    )

    const maxScrollTop = scrollHeight - clientHeight
    const maxThumbTop = Math.max(trackHeight - thumbHeight, 0)
    const thumbTop = maxScrollTop > 0
      ? (scrollTop / maxScrollTop) * maxThumbTop
      : 0

    setScrollThumb({
      top: thumbTop,
      height: thumbHeight,
      visible: true,
    })
  }
  const handleThumbPointerDown = (event) => {
    event.preventDefault()

    const scrollElement = modalScrollRef.current
    const trackElement = modalScrollbarTrackRef.current

    if (!scrollElement || !trackElement) return

    const startY = event.clientY
    const startScrollTop = scrollElement.scrollTop

    const maxScrollTop =
      scrollElement.scrollHeight - scrollElement.clientHeight

    const maxThumbTop =
      trackElement.clientHeight - scrollThumb.height

    const handlePointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY

      if (maxThumbTop <= 0) return

      const scrollDelta =
        (deltaY / maxThumbTop) * maxScrollTop

      scrollElement.scrollTop =
        startScrollTop + scrollDelta
    }

    const handlePointerUp = () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )

      window.removeEventListener(
        'pointerup',
        handlePointerUp
      )
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove
    )

    window.addEventListener(
      'pointerup',
      handlePointerUp
    )
  }
  const handleNavClick = (event, id) => {
    event.preventDefault()

    const target = document.getElementById(id)

    setMenuOpen(false)
    setActiveSection(id)

    if (!target) return

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    window.history.replaceState(null, '', `#${id}`)
  }

  const toggleLanguage = () => {
    const nextLanguage = language === 'en' ? 'vi' : 'en'

    setLanguage(nextLanguage)
    localStorage.setItem('portfolio-language', nextLanguage)

    // Close translated overlays so they reopen with the selected language.
    setSelectedProject(null)
    setContactError('')
    setMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const handleContactChange = (event) => {
    const { name, value } = event.target

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }))

    if (contactError) setContactError('')
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()

    const email = contactForm.email.trim()
    const subject = contactForm.subject.trim()
    const message = contactForm.message.trim()

    if (!email || !subject || !message) {
      setContactError(ui.contactForm.requiredError)
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setContactError(ui.contactForm.notConfiguredError)
      return
    }

    try {
      setSendingEmail(true)
      setContactError('')

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: email,
          reply_to: email,
          subject,
          message,
          to_email: 'trannhattanftp@gmail.com',
        },
        {
          publicKey,
        },
      )

      setContactForm({
        email: '',
        subject: '',
        message: '',
      })

      setContactOpen(false)
      setContactSuccess(true)
    } catch (error) {
      console.error('Email send failed:', error)
      setContactError(ui.contactForm.sendError)
    } finally {
      setSendingEmail(false)
    }
  }

  useEffect(() => {
    if (!contactOpen && !contactSuccess) return undefined

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
    }
  }, [contactOpen, contactSuccess])

  useEffect(() => {
    if (!selectedProject) return undefined

    const scrollElement = modalScrollRef.current

    if (scrollElement) {
      scrollElement.scrollTop = 0
    }

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frame = requestAnimationFrame(updateModalScrollbar)
    window.addEventListener('resize', updateModalScrollbar)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', updateModalScrollbar)
      document.body.style.overflow = previousBodyOverflow
    }
  }, [selectedProject])

  useEffect(() => {
    const sectionIds = [
      'about',
      'skills',
      'projects',
      'experience',
      'deployment-links',
      'contact',
    ]

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return undefined

    // Scroll-spy only: this observer updates the active menu item.
    // It does NOT add any animation classes, avoiding duplicate effects.
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        threshold: [0.12, 0.25, 0.45],
        rootMargin: '-18% 0px -48% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [language])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Replay the EXISTING .reveal transition whenever the element
          // fully leaves the viewport and later comes back.
          //
          // Add only after a meaningful amount is visible so the animation
          // does not feel too eager while scrolling.
          if (entry.intersectionRatio >= 0.14) {
            entry.target.classList.add('visible')
          } else if (!entry.isIntersecting) {
            // Reset only after it is completely outside the viewport.
            // This prevents flicker / repeated animation near the threshold.
            entry.target.classList.remove('visible')
          }
        })
      },
      {
        threshold: [0, 0.14],
        rootMargin: '0px 0px -6% 0px',
      },
    )

    const frame = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((element) => {
        observer.observe(element)
      })
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [language])

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label={ui.homeLabel}>
          <span className="brand-text">{ui.brand}</span>
        </a>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'active' : ''}
              aria-current={activeSection === id ? 'page' : undefined}
              onClick={(event) => handleNavClick(event, id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            type="button"
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Chuyển sang tiếng Việt' : 'Switch to English'}
            title={language === 'en' ? 'Tiếng Việt' : 'English'}
          >
            <span className={language === 'en' ? 'active' : ''}>EN</span>
            <span className="language-toggle-divider">/</span>
            <span className={language === 'vi' ? 'active' : ''}>VI</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={ui.toggleMenuLabel}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label={ui.closeProjectLabel}
            >
              <X />
            </button>

            <div
                className="project-modal-scroll"
                ref={modalScrollRef}
                onScroll={updateModalScrollbar}
              >

             <div className="project-modal-header">
            <span className="project-modal-category">
              {selectedProject.category}
            </span>

            <h2>{selectedProject.title}</h2>

            <p className="project-modal-description">
              {selectedProject.description}
            </p>

            {selectedProject.roleSummary && (
              <div className="project-role-summary">
                <span className="project-role-summary-label">
                  {ui.projectRoleLabel}
                </span>

                <p>
                  {selectedProject.roleSummary}
                </p>
              </div>
            )}

            <div className="project-modal-tags">
              {(selectedProject.tags ?? []).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

              <div className="project-timeline">
                {(selectedProject.timeline ?? []).map((item, index) => (
                  <div
                    className="project-timeline-item"
                    key={`${selectedProject.id}-${index}`}
                  >
                    <div className="project-timeline-marker">
                      <span>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="project-timeline-content">
                      <div className="project-timeline-meta">
                        <span className="project-timeline-period">
                          {item.period}
                        </span>

                        {item.organization && (
                          <span className="project-timeline-organization">
                            {item.organization}
                          </span>
                        )}
                      </div>

                      <h3>{item.title}</h3>

                      {item.focusRole && (
                        <div className="project-focus-role">
                          <span>{ui.roleFocusLabel}</span>
                          <strong>{item.focusRole}</strong>
                        </div>
                      )}

                      {item.description && (
                        <p className="project-timeline-description">
                          {item.description}
                        </p>
                      )}

                      {item.responsibilities?.length > 0 && (
                        <div className="project-responsibilities">
                          <span className="project-detail-label">
                            {ui.keyResponsibilitiesLabel}
                          </span>

                          <ul>
                            {item.responsibilities.map((responsibility, responsibilityIndex) => (
                              <li key={responsibilityIndex}>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.outcome && (
                        <div className="project-outcome">
                          <span className="project-detail-label">
                            {ui.outcomeLabel}
                          </span>

                          <p>{item.outcome}</p>
                        </div>
                      )}

                      {item.links?.length > 0 && (
                        <div className="project-links">
                          {item.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {link.label}
                              <ArrowUpRight size={15} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div
              className={`project-custom-scrollbar ${scrollThumb.visible ? 'is-visible' : ''}`}
              ref={modalScrollbarTrackRef}
              aria-hidden="true"
            >
            <div
              className="project-custom-scrollbar-thumb"
              onPointerDown={handleThumbPointerDown}
              style={{
                height: `${scrollThumb.height}px`,
                transform: `translateY(${scrollThumb.top}px)`,
              }}
            />
            </div>
          </div>
        </div>
      )}
      <main>
        <section id="home" className="hero container">
          <div className="hero-copy reveal">
            <div className="status-pill"><span /> {ui.status}</div>
            <p className="hero-kicker">{ui.heroKicker}</p>
            <h1 className="hero-title">{profile.name}</h1>
            <h2>{profile.role}</h2>
            <p className="hero-description">{profile.tagline}</p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">{ui.ctaProjects} <ArrowUpRight /></a>
              <a
                className="button ghost"
                href="https://zalo.me/0896696704"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${ui.contactMe} via Zalo`}
              >
                <Phone />
                {ui.contactMe}
              </a>
            </div>

            <div className="hero-meta">
              <span><MapPin /> {profile.location}</span>
            </div>

            <div className="about-pillars reveal">
              {(profile.stats2 ?? []).map((item) => (
                <div className="about-pillar-card" key={item.label}>
                  <span className="about-pillar-title">
                    {item.label}
                  </span>

                  <span className="about-pillar-description">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="portrait-card">
              <div className="portrait-grid" />
              <div className="portrait-glow" />

              <div className="avatar-shell">
                <img src={profile.avatar} alt={profile.name} className="avatar-photo" />
              </div>

              <div className="floating-code code-a">{ui.heroBadges[0]}</div>
              <div className="floating-code code-b">{ui.heroBadges[1]}</div>
              <div className="floating-code code-c">{ui.heroBadges[2]}</div>

              <div className="hero-quick-panel">
                <span className="panel-label">{ui.focusLabel}</span>
                <div className="hero-quick-list">
                  {profile.focusAreas.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section container section-motion">
          <SectionTitle
            eyebrow={ui.sectionAbout.eyebrow}
            title={ui.sectionAbout.title}
          />

          <div className="about-grid">
            <div className="about-text reveal">
              {profile.summary.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="stats-grid reveal">
              {profile.stats.map((item) => (
                <div className="stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section container section-motion">
          <SectionTitle
            eyebrow={ui.sectionSkills.eyebrow}
            title={ui.sectionSkills.title}
            description={ui.sectionSkills.description}
          />
          <div className="skills-wrap reveal">
            {skills.map((skill, index) => (
              <div className={`skill-chip skill-${skill.level.toLowerCase()}`} key={skill.name}>
                <b>{String(index + 1).padStart(2, '0')}</b>

                <span className="skill-name">
                  {skill.name}
                </span>

                <span className="skill-level">
                  {ui.skillLevels?.[skill.level] || skill.level}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section container section-motion">
          <SectionTitle
            eyebrow={ui.sectionProjects.eyebrow}
            title={ui.sectionProjects.title}
            description={ui.sectionProjects.description}
          />
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card reveal" key={project.title}>
                <div className="project-index">0{index + 1}</div>
                <div>
                  <span className="project-category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="project-footer">
                  <div className="tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <button
                        className="project-open"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`View ${project.title}`}
                      >
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section container section-motion">
          <SectionTitle eyebrow={ui.sectionExperience.eyebrow} title={ui.sectionExperience.title} />
          <div className="timeline">
            {experience.map((item) => {
              const experienceRole = item.role ?? item.title ?? ''
              const experienceCompany = item.company ?? item.organization ?? ''
              const organizationLogo = getExperienceLogo(item)

              return (
                <article
                  className="timeline-item reveal"
                  key={`${item.period}-${experienceRole}-${experienceCompany}`}
                >
                  <div className="timeline-period">{item.period}</div>

                  <div
                    className={`timeline-logo-node ${organizationLogo ? 'has-logo' : ''}`}
                    aria-hidden="true"
                  >
                    {organizationLogo ? (
                      <img
                        src={organizationLogo}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <span />
                    )}
                  </div>

                  <div className="timeline-content">
                    <h3>{experienceRole}</h3>
                    <span>{experienceCompany}</span>
                    <p>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="deployment-links" className="section container deployment-links-section section-motion">
          <SectionTitle
            eyebrow={ui.sectionDeploymentLinks.eyebrow}
            title={ui.sectionDeploymentLinks.title}
            description={ui.sectionDeploymentLinks.description}
          />

          <div className="deployment-links-grid">
            {deploymentLinks.length > 0 ? (
              deploymentLinks.map((item, index) => (
                <a
                  className="deployment-link-card reveal"
                  key={item.id ?? item.url ?? index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="deployment-link-top">
                    <span className="deployment-link-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="deployment-link-source">
                      {item.source}
                    </span>
                  </div>

                  <div className="deployment-link-body">
                    <span className="deployment-link-project">
                      {item.project}
                    </span>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </div>

                  <div className="deployment-link-footer">
                    <span>{ui.sectionDeploymentLinks.openLabel}</span>
                    <ArrowUpRight size={18} />
                  </div>
                </a>
              ))
            ) : (
              <div className="deployment-link-card reveal">
                <div className="deployment-link-body">
                  <span className="deployment-link-project">
                    {language === 'vi' ? 'DỰ ÁN ĐÃ TRIỂN KHAI' : 'DEPLOYED PROJECTS'}
                  </span>
                  <h3>
                    {language === 'vi'
                      ? 'Chưa có dữ liệu liên kết.'
                      : 'No deployment links available yet.'}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="section container contact-section section-motion">
          <div className="contact-card reveal">
            <span className="eyebrow">{ui.sectionContact.eyebrow}</span>
            <h2>{ui.sectionContact.title}<br />{ui.sectionContact.subtitle}</h2>
            <p>{ui.sectionContact.description}</p>
            <div className="contact-actions">
              <button
                type="button"
                className="button primary contact-email-trigger"
                onClick={() => {
                  setContactError('')
                  setContactOpen(true)
                }}
              >
                <Mail />
                {profile.email}
              </button>

              <a
                className="button ghost contact-linkedin"
                href="https://www.linkedin.com/in/tntan3012"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedIn />
                LinkedIn
              </a>

              <a
                className="text-link"
                href="/assets/Tran-Nhat-Tan-CV.pdf"
                download="Tran-Nhat-Tan-CV.pdf"
              >
                {ui.downloadCV}
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

      </main>

      {contactOpen && (
        <div
          className="contact-modal-backdrop"
          onClick={() => {
            if (!sendingEmail) setContactOpen(false)
          }}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="contact-modal-close"
              onClick={() => setContactOpen(false)}
              aria-label={ui.contactForm.closeLabel}
              disabled={sendingEmail}
            >
              <X />
            </button>

            <div className="contact-modal-heading">
              <span className="eyebrow">{ui.contactForm.eyebrow}</span>
              <h2 id="contact-modal-title">{ui.contactForm.title}</h2>
              <p>
                {ui.contactForm.description}{' '}
                <strong>trannhattanftp@gmail.com</strong>.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                <span>{ui.contactForm.emailLabel}</span>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder={ui.contactForm.emailPlaceholder}
                  autoComplete="email"
                  required
                  disabled={sendingEmail}
                />
              </label>

              <label>
                <span>{ui.contactForm.subjectLabel}</span>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  placeholder={ui.contactForm.subjectPlaceholder}
                  required
                  disabled={sendingEmail}
                />
              </label>

              <label>
                <span>{ui.contactForm.messageLabel}</span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder={ui.contactForm.messagePlaceholder}
                  rows="6"
                  required
                  disabled={sendingEmail}
                />
              </label>

              {contactError && (
                <p className="contact-form-error" role="alert">
                  {contactError}
                </p>
              )}

              <button
                type="submit"
                className="button primary contact-submit"
                disabled={sendingEmail}
              >
                <Mail />
                {sendingEmail ? ui.contactForm.sending : ui.contactForm.send}
              </button>
            </form>
          </div>
        </div>
      )}

      {contactSuccess && (
        <div
          className="contact-modal-backdrop"
          onClick={() => setContactSuccess(false)}
        >
          <div
            className="contact-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-success-icon" aria-hidden="true">
              ✓
            </div>

            <span className="eyebrow">{ui.contactForm.successEyebrow}</span>

            <h2 id="contact-success-title">
              {ui.contactForm.successTitle}
            </h2>

            <p>
              {ui.contactForm.successText}
            </p>

            <button
              type="button"
              className="button primary"
              onClick={() => setContactSuccess(false)}
            >
              {ui.contactForm.done}
            </button>
          </div>
        </div>
      )}

      <footer className="footer container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </footer>
    </div>
  )
}

export default App
