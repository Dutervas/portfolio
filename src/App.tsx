import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Database,
  Mail,
  Server,
  Terminal,
} from 'lucide-react'

type Language = 'pt' | 'en'

type Project = {
  number: string
  title: string
  summary: string
  problem: string
  contribution: string[]
  technical: string[]
  stack: string[]
  flow: string[]
}

const skills = [
  'Java', 'Spring Boot', 'React', 'TypeScript', 'JavaScript', 'PostgreSQL', 'MySQL',
  'Docker', 'Docker Compose', 'REST APIs', 'Webhooks', 'JSON', 'Linux CLI', 'Git / GitHub',
  'Nginx', 'SQL',
]

const content = {
  pt: {
    nav: ['Sobre', 'Experiência', 'Projetos', 'Formação', 'Contato'],
    navIds: ['sobre', 'experiencia', 'projetos', 'formacao', 'contato'],
    light: 'Claro', dark: 'Escuro', contactMe: 'Fale comigo',
    eyebrow: 'Software Developer · Full Stack · Integrations',
    heroTitle: 'Construo software que conecta',
    heroAccent: 'produtos, sistemas e pessoas.',
    heroCopy: 'Sou Enzo Dutervil Zoccherato. Desenvolvo aplicações, integrações e automações com foco em confiabilidade, rastreabilidade e evolução contínua.',
    viewProjects: 'Ver projetos', downloadResume: 'Baixar currículo',
    available: 'Disponível para novas oportunidades',
    base: 'Base', focus: 'Foco', interest: 'Interesse', english: 'Inglês',
    focusValue: 'Engenharia de Software', interestValue: 'Tecnologia no setor financeiro', englishValue: 'Intermediário',
    aboutKicker: '01 · Sobre',
    aboutTitle: 'Mais do que escrever código, gosto de entender o problema inteiro.',
    about1: 'Atuo com desenvolvimento full stack, integrações corporativas e automações para ambientes de TI. Minha rotina passa por APIs, banco de dados, autenticação, logs, troubleshooting e sustentação de aplicações.',
    about2: 'Quero construir minha carreira em Engenharia de Software, especialmente em ambientes de alta escala e criticidade. O setor financeiro me interessa pelos desafios de confiabilidade, segurança, desempenho e evolução contínua.',
    signals: ['Produto interno', 'Integrações', 'Produção', 'Automação'],
    stackKicker: 'Stack principal', front: 'Front-end', back: 'Back-end', data: 'Dados', infra: 'Infra & operação',
    expKicker: '02 · Experiência', current: 'MAR 2026 — ATUAL', apprenticeDate: 'ABR 2025 — MAR 2026',
    currentRole: 'Técnico de Suporte I — Desenvolvimento, Integrações e Automações',
    currentDesc: 'Desenvolvimento e sustentação de plataforma interna, integrações corporativas, automações, troubleshooting ponta a ponta, deploys e validações em homologação e produção.',
    apprenticeRole: 'Jovem Aprendiz — Tecnologia e Integrações',
    apprenticeDesc: 'Atuação prática na evolução de soluções internas, scripts, webhooks, documentação técnica, análise de logs, APIs e apoio em correções em ambiente de produção.',
    projectsKicker: '03 · Projetos / cases técnicos',
    projectsTitle: 'Problemas reais. Soluções que precisam continuar funcionando depois do deploy.',
    projectsLead: 'Abra cada case para ver problema, contribuição, fluxo técnico e tecnologias envolvidas.',
    problem: 'Problema', contribution: 'Minha contribuição', technical: 'Pontos técnicos', technologies: 'Tecnologias',
    educationKicker: '04 · Formação & reconhecimento',
    educationTitle: 'Base técnica construída cedo e aplicada em projetos reais.',
    credentials: [
      ['ETEC Takashi Morita', 'Técnico em Automação Industrial · 2023–2025'],
      ['CEAP', 'Técnico em Informática · 2023–2024'],
      ['FECEAP', 'Vencedor com web app de mapa/heatmap usando JavaScript, MongoDB e Google Maps API'],
      ['Aluno Destaque', 'CEAP · 2022'],
    ],
    certificationsTitle: 'Certificações',
    certifications: [
      ['Defesa de Rede', 'Cisco Networking Academy · 2025'],
      ['Exame da Trilha Técnico em Redes', 'Cisco Networking Academy · 2025'],
      ['Segurança em TI', 'Fundação Bradesco · 2025'],
      ['Python: POO e Projetos', 'Fundação Bradesco · 2025'],
      ['Blockchain Fundamentals', 'ISACA · 2024'],
    ],
    contactKicker: '05 · Contato',
    contactTitle: 'Quer conversar sobre software, integrações ou uma oportunidade?',
    contactText: 'Estou interessado em oportunidades de Engenharia de Software e desenvolvimento no setor financeiro.',
    resumeShort: 'Currículo',
    profileLabel: 'Resumo do perfil',
    architectureLabel: 'Fluxo técnico de',
  },
  en: {
    nav: ['About', 'Experience', 'Projects', 'Education', 'Contact'],
    navIds: ['sobre', 'experiencia', 'projetos', 'formacao', 'contato'],
    light: 'Light', dark: 'Dark', contactMe: 'Contact me',
    eyebrow: 'Software Developer · Full Stack · Integrations',
    heroTitle: 'I build software that connects',
    heroAccent: 'products, systems, and people.',
    heroCopy: 'I am Enzo Dutervil Zoccherato. I develop applications, integrations, and automations focused on reliability, traceability, and continuous improvement.',
    viewProjects: 'View projects', downloadResume: 'Download resume',
    available: 'Open to new opportunities',
    base: 'Based in', focus: 'Focus', interest: 'Interest', english: 'English',
    focusValue: 'Software Engineering', interestValue: 'Technology in the financial sector', englishValue: 'Intermediate',
    aboutKicker: '01 · About',
    aboutTitle: 'More than writing code, I like to understand the whole problem.',
    about1: 'I work with full-stack development, corporate integrations, and automation for IT environments. My day-to-day work includes APIs, databases, authentication, logs, troubleshooting, and application support.',
    about2: 'I want to build my career in Software Engineering, especially in high-scale and business-critical environments. The financial sector interests me because of its challenges in reliability, security, performance, and continuous evolution.',
    signals: ['Internal products', 'Integrations', 'Production', 'Automation'],
    stackKicker: 'Core stack', front: 'Front-end', back: 'Back-end', data: 'Data', infra: 'Infrastructure & operations',
    expKicker: '02 · Experience', current: 'MAR 2026 — PRESENT', apprenticeDate: 'APR 2025 — MAR 2026',
    currentRole: 'IT Support Technician I — Software Development, Integrations & Automation',
    currentDesc: 'Development and support of an internal platform, corporate integrations, automation, end-to-end troubleshooting, deployments, and validation in staging and production environments.',
    apprenticeRole: 'Technology & Integrations Apprentice',
    apprenticeDesc: 'Hands-on work evolving internal solutions, scripts, webhooks, technical documentation, log analysis, APIs, and supporting fixes in production environments.',
    projectsKicker: '03 · Projects / technical case studies',
    projectsTitle: 'Real problems. Solutions that need to keep working after deployment.',
    projectsLead: 'Open each case study to see the problem, my contribution, technical flow, and technologies involved.',
    problem: 'Problem', contribution: 'My contribution', technical: 'Technical highlights', technologies: 'Technologies',
    educationKicker: '04 · Education & recognition',
    educationTitle: 'A technical foundation built early and applied to real projects.',
    credentials: [
      ['ETEC Takashi Morita', 'Industrial Automation Technician · 2023–2025'],
      ['CEAP', 'IT Technician · 2023–2024'],
      ['FECEAP', 'Winner with a map/heatmap web app built with JavaScript, MongoDB, and Google Maps API'],
      ['Outstanding Student', 'CEAP · 2022'],
    ],
    certificationsTitle: 'Certifications',
    certifications: [
      ['Network Defense', 'Cisco Networking Academy · 2025'],
      ['Technical Networking Track Exam', 'Cisco Networking Academy · 2025'],
      ['IT Security', 'Fundação Bradesco · 2025'],
      ['Python: OOP and Projects', 'Fundação Bradesco · 2025'],
      ['Blockchain Fundamentals', 'ISACA · 2024'],
    ],
    contactKicker: '05 · Contact',
    contactTitle: 'Want to talk about software, integrations, or an opportunity?',
    contactText: 'I am interested in Software Engineering and development opportunities in the financial sector.',
    resumeShort: 'Resume',
    profileLabel: 'Profile summary',
    architectureLabel: 'Technical flow for',
  },
} as const

const projects: Record<Language, Project[]> = {
  pt: [
    {
      number: '01',
      title: 'Plataforma interna de integrações corporativas',
      summary: 'Plataforma web modular para centralizar integrações, relatórios, automações, templates, agendamentos, aprovações, permissões e histórico operacional.',
      problem: 'Reunir em uma única aplicação fluxos internos que dependiam de múltiplos sistemas, APIs e rotinas operacionais, mantendo rastreabilidade e sustentação no dia a dia.',
      contribution: ['Implementação de funcionalidades full stack e evolução de módulos internos.', 'Integração com APIs corporativas, autenticação, paginação e tratamento de erros.', 'Persistência e validação de dados, além de rastreabilidade por logs.', 'Apoio em homologação, produção, correções emergenciais e melhoria contínua.'],
      technical: ['Relatórios, predefinições e envio automatizado de e-mails', 'Permissões, aprovações, agendamentos e histórico operacional', 'Normalização de dados e observabilidade por logs', 'Front-end React/TypeScript integrado a back-end Spring Boot'],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs'],
      flow: ['React / TypeScript', 'Spring Boot / REST', 'PostgreSQL', 'APIs corporativas'],
    },
    {
      number: '02',
      title: 'Integrações entre plataformas ITSM e sistemas corporativos',
      summary: 'Integrações responsáveis por sincronizar chamados entre plataformas de atendimento corporativo, aplicando regras de negócio e validações de payload.',
      problem: 'Manter informações de atendimento consistentes entre sistemas diferentes, tratando criação, atualização, status, vínculos e campos customizados.',
      contribution: ['Desenvolvimento e manutenção de integrações baseadas em APIs REST e webhooks.', 'Validação de payloads JSON, autenticação e tratamento de falhas.', 'Implementação de regras de deduplicação e sincronização de status.', 'Sustentação em Linux com análise de logs, testes de API e documentação técnica.'],
      technical: ['Criação e atualização de chamados', 'Regras de negócio, vínculos e campos customizados', 'Deduplicação e validação de payloads', 'Troubleshooting de autenticação, API e ambiente'],
      stack: ['REST APIs', 'Webhooks', 'JSON', 'Linux CLI', 'Logs', 'ITSM'],
      flow: ['Sistema A', 'API / Webhook', 'Regras de integração', 'Sistema B'],
    },
    {
      number: '03',
      title: 'Automação de incidentes a partir de monitoramento',
      summary: 'Webhooks e regras condicionais para abertura, atualização e fechamento automático de incidentes a partir de eventos de monitoramento.',
      problem: 'Transformar eventos de monitoramento em incidentes rastreáveis sem sobrescrever o trabalho humano quando um chamado já estivesse em tratativa.',
      contribution: ['Criação de webhooks para abertura, atualização e fechamento de incidentes.', 'Implementação de regras condicionais para preservar atendimentos em andamento.', 'Tratamento de parâmetros obrigatórios, tags, links de evento e respostas HTTP.', 'Análise de logs, exceções de integração e validação ponta a ponta do fluxo.'],
      technical: ['Monitoramento e observabilidade como origem dos eventos', 'Regras condicionais antes de alterar chamados existentes', 'Tratamento de autenticação, exceções e respostas HTTP', 'Rastreabilidade por logs durante troubleshooting'],
      stack: ['Webhooks', 'REST APIs', 'Monitoramento', 'Observabilidade', 'ITSM', 'Logs'],
      flow: ['Evento', 'Webhook', 'Regra condicional', 'Incidente / ITSM'],
    },
  ],
  en: [
    {
      number: '01',
      title: 'Internal corporate integrations platform',
      summary: 'A modular web platform used to centralize integrations, reports, automation, templates, scheduling, approvals, permissions, and operational history.',
      problem: 'Bring internal workflows that depended on multiple systems, APIs, and operational routines into a single application while preserving traceability and day-to-day maintainability.',
      contribution: ['Implemented full-stack features and evolved internal modules.', 'Integrated corporate APIs, including authentication, pagination, and error handling.', 'Worked with data persistence and validation, with traceability through logs.', 'Supported staging, production, emergency fixes, and continuous improvement.'],
      technical: ['Reports, presets, and automated email delivery', 'Permissions, approvals, scheduling, and operational history', 'Data normalization and log-based observability', 'React/TypeScript front end integrated with a Spring Boot back end'],
      stack: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs'],
      flow: ['React / TypeScript', 'Spring Boot / REST', 'PostgreSQL', 'Corporate APIs'],
    },
    {
      number: '02',
      title: 'Integrations between ITSM platforms and corporate systems',
      summary: 'Integrations used to synchronize tickets across corporate service platforms while applying business rules and payload validation.',
      problem: 'Keep service information consistent across different systems, including creation, updates, status, links, and custom fields.',
      contribution: ['Developed and maintained integrations based on REST APIs and webhooks.', 'Validated JSON payloads, authentication, and failure handling.', 'Implemented deduplication rules and status synchronization.', 'Supported Linux environments through log analysis, API tests, and technical documentation.'],
      technical: ['Ticket creation and updates', 'Business rules, links, and custom fields', 'Deduplication and payload validation', 'Authentication, API, and environment troubleshooting'],
      stack: ['REST APIs', 'Webhooks', 'JSON', 'Linux CLI', 'Logs', 'ITSM'],
      flow: ['System A', 'API / Webhook', 'Integration rules', 'System B'],
    },
    {
      number: '03',
      title: 'Monitoring-driven incident automation',
      summary: 'Webhooks and conditional rules for automatically opening, updating, and closing incidents from monitoring events.',
      problem: 'Turn monitoring events into traceable incidents without overwriting human work when a ticket was already being handled.',
      contribution: ['Built webhooks for incident creation, updates, and closure.', 'Implemented conditional rules to preserve ongoing human handling.', 'Handled required parameters, tags, event links, and HTTP responses.', 'Analyzed logs and integration exceptions and validated the flow end to end.'],
      technical: ['Monitoring and observability as event sources', 'Conditional rules before modifying existing tickets', 'Authentication, exception, and HTTP response handling', 'Log-based traceability during troubleshooting'],
      stack: ['Webhooks', 'REST APIs', 'Monitoring', 'Observability', 'ITSM', 'Logs'],
      flow: ['Event', 'Webhook', 'Conditional rule', 'Incident / ITSM'],
    },
  ],
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.588 2 12.253c0 4.532 2.865 8.376 6.839 9.733.5.095.682-.222.682-.493 0-.243-.009-.888-.014-1.743-2.782.618-3.369-1.374-3.369-1.374-.455-1.184-1.11-1.499-1.11-1.499-.908-.636.069-.623.069-.623 1.003.073 1.531 1.056 1.531 1.056.892 1.568 2.341 1.115 2.91.853.091-.664.349-1.115.635-1.371-2.221-.259-4.555-1.14-4.555-5.071 0-1.12.39-2.036 1.029-2.754-.103-.26-.446-1.303.098-2.716 0 0 .84-.276 2.75 1.052A9.32 9.32 0 0 1 12 6.983a9.33 9.33 0 0 1 2.504.346c1.909-1.328 2.748-1.052 2.748-1.052.546 1.413.203 2.456.1 2.716.64.718 1.028 1.634 1.028 2.754 0 3.94-2.338 4.809-4.566 5.063.359.317.679.943.679 1.9 0 1.372-.012 2.478-.012 2.814 0 .274.18.593.688.492C19.137 20.625 22 16.783 22 12.253 22 6.588 17.523 2 12 2Z" /></svg>
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 8.25H3.25V20.5H6.5V8.25ZM4.875 3.5A1.875 1.875 0 1 0 4.875 7.25 1.875 1.875 0 0 0 4.875 3.5ZM20.75 13.47c0-3.68-1.965-5.39-4.585-5.39-2.11 0-3.055 1.16-3.585 1.975V8.25H9.33c.043 1.195 0 12.25 0 12.25h3.25v-6.84c0-.365.025-.73.135-.99.285-.73.935-1.485 2.025-1.485 1.43 0 2.005 1.12 2.005 2.76v6.555H20V13.47h.75Z" /></svg>
}

function ProjectCase({ project, language }: { project: Project; language: Language }) {
  const [open, setOpen] = useState(false)
  const t = content[language]
  return (
    <article className={`case-card ${open ? 'is-open' : ''}`}>
      <button className="case-head" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className="case-number">{project.number}</span>
        <span className="case-title-wrap"><strong>{project.title}</strong><small>{project.summary}</small></span>
        <span className="case-action">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="case-body">
          <div className="case-grid">
            <div><p className="case-label">{t.problem}</p><p>{project.problem}</p></div>
            <div><p className="case-label">{t.contribution}</p><ul>{project.contribution.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="architecture" aria-label={`${t.architectureLabel} ${project.title}`}>
            {project.flow.map((item, index) => <div className="architecture-step" key={item}><span>{item}</span>{index < project.flow.length - 1 && <b>→</b>}</div>)}
          </div>
          <div className="case-grid second">
            <div><p className="case-label">{t.technical}</p><ul>{project.technical.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><p className="case-label">{t.technologies}</p><div className="chips compact">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
          </div>
        </div>
      )}
    </article>
  )
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('language') === 'en' ? 'en' : 'pt')
  const t = content[language]

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    localStorage.setItem('language', language)
    document.title = language === 'pt' ? 'Enzo Dutervil Zoccherato | Software Developer' : 'Enzo Dutervil Zoccherato | Software Developer'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', language === 'pt' ? 'Portfólio de Enzo Dutervil Zoccherato, desenvolvedor full stack com foco em integrações, automação e Engenharia de Software.' : 'Portfolio of Enzo Dutervil Zoccherato, a full-stack developer focused on integrations, automation, and Software Engineering.')
  }, [language])

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}>
          <a className="brand" href="#top" aria-label={language === 'pt' ? 'Voltar ao início' : 'Back to top'}>EDZ<span>.</span></a>
          <div className="nav-links">{t.nav.map((item, index) => <a href={`#${t.navIds[index]}`} key={item}>{item}</a>)}</div>
          <div className="nav-tools">
            <div className="language-toggle" aria-label="Language selector">
              <button className={language === 'pt' ? 'active' : ''} onClick={() => setLanguage('pt')}>PT</button>
              <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
            </div>
            <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? t.light : t.dark}</button>
            <a className="nav-cta" href="mailto:enzozoc10@gmail.com">{t.contactMe} <ArrowUpRight size={16} /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container reveal">
          <div className="eyebrow">{t.eyebrow}</div>
          <div className="hero-grid">
            <div>
              <h1>{t.heroTitle} <span>{t.heroAccent}</span></h1>
              <p className="hero-copy">{t.heroCopy}</p>
              <div className="hero-actions">
                <a className="btn primary" href="#projetos">{t.viewProjects} <ArrowDownRight size={18} /></a>
                <a className="btn secondary" href={language === 'pt' ? '/curriculo-enzo-dutervil-zoccherato.pdf' : '/resume-enzo-dutervil-zoccherato-en.pdf'} download>{t.downloadResume} <ArrowDownRight size={18} /></a>
                <a className="btn secondary" href="https://github.com/Dutervas" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
                <a className="btn secondary" href="https://www.linkedin.com/in/enzo-dutervil-zoccherato-990015323" target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a>
              </div>
            </div>
            <aside className="hero-card" aria-label={t.profileLabel}>
              <div className="status"><span /> {t.available}</div>
              <div className="mini-row"><strong>{t.base}</strong><span>São Paulo, SP</span></div>
              <div className="mini-row"><strong>{t.focus}</strong><span>{t.focusValue}</span></div>
              <div className="mini-row"><strong>{t.interest}</strong><span>{t.interestValue}</span></div>
              <div className="mini-row"><strong>{t.english}</strong><span>{t.englishValue}</span></div>
            </aside>
          </div>
        </section>

        <section id="sobre" className="section container two-col reveal">
          <div><p className="section-kicker">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2></div>
          <div className="body-copy"><p>{t.about1}</p><p>{t.about2}</p><div className="signal-row">{t.signals.map((item) => <span key={item}>{item}</span>)}</div></div>
        </section>

        <section className="section container reveal">
          <p className="section-kicker">{t.stackKicker}</p>
          <div className="skill-grid">
            <div className="skill-feature"><Braces /><span>{t.front}</span><strong>React + TypeScript</strong></div>
            <div className="skill-feature"><Server /><span>{t.back}</span><strong>Java + Spring Boot</strong></div>
            <div className="skill-feature"><Database /><span>{t.data}</span><strong>PostgreSQL + SQL</strong></div>
            <div className="skill-feature"><Terminal /><span>{t.infra}</span><strong>Docker + Linux</strong></div>
          </div>
          <div className="chips">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section id="experiencia" className="section container reveal">
          <p className="section-kicker">{t.expKicker}</p>
          <div className="timeline">
            <article className="timeline-item"><div className="timeline-date">{t.current}</div><div><h3>{t.currentRole}</h3><p className="muted">ZivaSec Tecnologia e Soluções · Grupo NTSec</p><p>{t.currentDesc}</p></div></article>
            <article className="timeline-item"><div className="timeline-date">{t.apprenticeDate}</div><div><h3>{t.apprenticeRole}</h3><p className="muted">ZivaSec Tecnologia e Soluções · Grupo NTSec</p><p>{t.apprenticeDesc}</p></div></article>
          </div>
        </section>

        <section id="projetos" className="section container reveal">
          <div className="section-heading-row"><div><p className="section-kicker">{t.projectsKicker}</p><h2>{t.projectsTitle}</h2><p className="section-lead">{t.projectsLead}</p></div></div>
          <div className="cases">{projects[language].map((project) => <ProjectCase project={project} language={language} key={`${language}-${project.number}`} />)}</div>
        </section>

        <section id="formacao" className="section container two-col reveal">
          <div><p className="section-kicker">{t.educationKicker}</p><h2>{t.educationTitle}</h2></div>
          <div>
            <div className="credentials">{t.credentials.map(([name, description]) => <div key={name}><strong>{name}</strong><span>{description}</span></div>)}</div>
            <p className="sub-kicker">{t.certificationsTitle}</p>
            <div className="cert-grid">{t.certifications.map(([name, issuer]) => <div className="cert-card" key={name}><strong>{name}</strong><span>{issuer}</span></div>)}</div>
          </div>
        </section>

        <section id="contato" className="contact-section reveal">
          <div className="container contact-inner">
            <p className="section-kicker">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p>
            <div className="contact-links">
              <a href="mailto:enzozoc10@gmail.com"><Mail size={18} /> enzozoc10@gmail.com</a>
              <a href="https://www.linkedin.com/in/enzo-dutervil-zoccherato-990015323" target="_blank" rel="noreferrer"><LinkedInIcon /> LinkedIn</a>
              <a href="https://github.com/Dutervas" target="_blank" rel="noreferrer"><GitHubIcon /> GitHub</a>
              <a href={language === 'pt' ? '/curriculo-enzo-dutervil-zoccherato.pdf' : '/resume-enzo-dutervil-zoccherato-en.pdf'} download>{t.resumeShort} <ArrowDownRight size={18} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container"><span>© {new Date().getFullYear()} Enzo Dutervil Zoccherato</span><span>React · TypeScript · Vite</span></footer>
    </div>
  )
}

export default App
