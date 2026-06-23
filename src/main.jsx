import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

import logoWhite from '../assets/BANNER 1/Proactiva Blanco Logo.svg'
import heroBg from '../assets/BANNER 1/Fondo Banner.jpg'
import heroMobileBg from '../assets/BANNER 1/Fondo Banner celu.jpg'
import houseDesktop from '../assets/IMAGEN 1/casa.png'
import houseMobile from '../assets/IMAGEN 1/Casa celu.png'
import arrowImage from '../assets/IMAGEN 1/flecha.png'
import planEmpty from '../assets/Plano casa/PLANO SIN NADA.png'
import planInterior from '../assets/Plano casa/PLANO ANILLO 1-2.png'
import planTotal from '../assets/Plano casa/Plano -3-4-5.png'

import ring1 from '../assets/ICONOS ANILLOS/Anillo 1.svg'
import ring2 from '../assets/ICONOS ANILLOS/Anillo 2.svg'
import ring3 from '../assets/ICONOS ANILLOS/Anillo 3.svg'
import ring4 from '../assets/ICONOS ANILLOS/Anillo 4.svg'
import ring5 from '../assets/ICONOS ANILLOS/Anillo 5.svg'
import ringActive1 from '../assets/ICONOS ANILLOS/Anillo Azul 1.svg'
import ringActive2 from '../assets/ICONOS ANILLOS/Anillo azul 2.svg'
import ringActive3 from '../assets/ICONOS ANILLOS/Anillo azul 3.svg'
import ringActive4 from '../assets/ICONOS ANILLOS/Anillo Azul 4.svg'
import ringActive5 from '../assets/ICONOS ANILLOS/Anillo Azul 5.svg'

import cameraIcon from '../assets/ICONOS ELEMENTOS/Cámara.svg'
import remoteIcon from '../assets/ICONOS ELEMENTOS/Control Remoto.svg'
import appIcon from '../assets/ICONOS ELEMENTOS/gestion desde la app.svg'
import recordingIcon from '../assets/ICONOS ELEMENTOS/GRABACIÓN.svg'
import monitoringIcon from '../assets/ICONOS ELEMENTOS/Monitoreo profesional.svg'
import nvrIcon from '../assets/ICONOS ELEMENTOS/NVR.svg'
import motionIcon from '../assets/ICONOS ELEMENTOS/Sensor de movimiento.svg'
import exteriorIcon from '../assets/ICONOS ELEMENTOS/Sensor exterior.svg'
import photoIcon from '../assets/ICONOS ELEMENTOS/Sensor fotodetector.svg'
import magneticIcon from '../assets/ICONOS ELEMENTOS/Sensor magenetico.svg'
import sirenIcon from '../assets/ICONOS ELEMENTOS/Sirena interna.svg'
import videoIcon from '../assets/ICONOS ELEMENTOS/Sistemas de videovigilancia.svg'
import verificationIcon from '../assets/ICONOS ELEMENTOS/Verificación por imagen.svg'

const pdfAsset = (name) => `/pdf-assets/${name}`

const ringIcons = [ring1, ring2, ring3, ring4, ring5]
const ringActiveIcons = [ringActive1, ringActive2, ringActive3, ringActive4, ringActive5]

const rings = [
  {
    id: 1,
    title: 'Proteccion Interior',
    summary: 'Seguridad para el interior del hogar.',
    plan: planInterior,
    bullets: ['Sensor magnetico', 'Sirena interna', 'Sensor de movimiento', 'Control remoto', 'Monitoreo profesional'],
    icons: [magneticIcon, sirenIcon, motionIcon, remoteIcon, monitoringIcon],
    point: { left: '39%', top: '54%' },
  },
  {
    id: 2,
    title: 'Interior con Verificacion',
    summary: 'Validacion visual ante eventos.',
    plan: planInterior,
    bullets: ['Sensor fotodetector', 'Verificacion por imagen', 'Gestion desde la app'],
    icons: [photoIcon, verificationIcon, appIcon],
    point: { left: '48%', top: '43%' },
  },
  {
    id: 3,
    title: 'Proteccion Perimetral',
    summary: 'Deteccion anticipada antes del ingreso.',
    plan: planTotal,
    bullets: ['Sensores exteriores tipo cortina', 'Cobertura perimetral', 'Mayor nivel de prevencion'],
    icons: [exteriorIcon, monitoringIcon, remoteIcon],
    point: { left: '27%', top: '63%' },
  },
  {
    id: 4,
    title: 'Control Visual',
    summary: 'Visualizacion en tiempo real del entorno.',
    plan: planTotal,
    bullets: ['Camaras exteriores', 'Supervision visual', 'Acceso remoto'],
    icons: [cameraIcon, appIcon, monitoringIcon],
    point: { left: '63%', top: '39%' },
  },
  {
    id: 5,
    title: 'Control Total',
    summary: 'Maximo nivel de cobertura y registro.',
    plan: planTotal,
    bullets: ['NVR grabador', 'Grabacion hasta 30 dias', 'Sistema integral de videovigilancia'],
    icons: [nvrIcon, recordingIcon, videoIcon],
    point: { left: '76%', top: '58%' },
  },
]

function Logo({ light = false, compact = false }) {
  return (
    <div className={`logo ${light ? 'logoLight' : ''} ${compact ? 'logoCompact' : ''}`}>
      <img src={logoWhite} alt="Proactiva" />
      {!light && <span>INTELIGENCIA PREVENTIVA</span>}
    </div>
  )
}

function RingButton({ ring, active, onClick }) {
  return (
    <button
      className={`ringButton ${active ? 'isActive' : ''}`}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Ver anillo ${ring.id}: ${ring.title}`}
    >
      <img src={active ? ringActiveIcons[ring.id - 1] : ringIcons[ring.id - 1]} alt="" />
    </button>
  )
}

function Feature({ icon, label }) {
  return (
    <li className="feature">
      <img src={icon} alt="" />
      <span>{label}</span>
    </li>
  )
}

function App() {
  const [activeRing, setActiveRing] = useState(1)
  const selected = useMemo(() => rings.find((ring) => ring.id === activeRing) ?? rings[0], [activeRing])
  const sensorCards = [
    {
      image: pdfAsset('p1_img5.png'),
      title: 'SENSOR FOTODETECTOR',
      text: 'Ademas de detectar, permite validacion visual por imagen.',
    },
    {
      image: pdfAsset('p1_img3.png'),
      title: 'SENSOR MAGNETICO',
      text: 'Detecta apertura de puertas/ventanas.',
    },
    {
      image: pdfAsset('p1_img6.png'),
      title: 'SENSOR DE MOVIMIENTO',
      text: 'Detecta presencia o circulacion.',
    },
  ]

  return (
    <main>
      <header className="siteHeader">
        <a className="headerBrand" href="#inicio" aria-label="Ir al inicio">
          <Logo compact />
        </a>
        <nav className="headerNav" aria-label="Navegacion principal">
          <a href="#inicio">Inicio</a>
          <a href="#anillos">Anillos</a>
          <a href="#servicio">Servicio</a>
          <a href="#sensores">Sensores</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      {/* <section id="inicio" className="introLogo">
        <Logo />
      </section> */}

      <section
        className="hero"
        style={{ '--hero-bg': `url("${heroBg}")`, '--hero-mobile-bg': `url("${heroMobileBg}")` }}
      >
        <div className="heroContent">
          <h1>ENTENDEMOS<br />PORQUE SENTIMOS</h1>
          <p>Somos profesionales que entienden que detras de una alerta hay un hogar, una familia y un miedo real.</p>
          <Logo light compact />
        </div>
      </section>

      <section id="anillos" className="rings">
        <div className="w-full ringsIntro text-center">
          <p className="know">Conocé</p>
          <h2 className='text-center '>NUESTROS ANILLOS</h2>
          <h2 className='text-center  w-full '><strong>DE SEGURIDAD</strong></h2>
          {/* <div className="pill">VIGILANCIA <span /> CONTROL <span /> TECNOLOGIA</div> */}
          <img className="arrowCue animate-bounce mt-12! m-auto" src={arrowImage} alt="" />
        </div>

        <div className="houseStage">
          <picture>
            <source srcSet={houseMobile} media="(max-width: 640px)" />
            <img className="houseImage" src={houseDesktop} alt="Casa protegida por anillos de seguridad" />
          </picture>
          <div className="scanArc scanArcOne" aria-hidden="true" />
          <div className="scanArc scanArcTwo" aria-hidden="true" />
          {rings.map((ring) => (
            <button
              key={ring.id}
              className={`housePoint point${ring.id} ${activeRing === ring.id ? 'isActive' : ''}`}
              style={{ left: ring.point.left, top: ring.point.top }}
              type="button"
              onClick={() => setActiveRing(ring.id)}
              aria-label={`Cambiar al anillo ${ring.id}: ${ring.title}`}
            >
              {ring.id}
            </button>
          ))}
        </div>

        <div className="ringNav" aria-label="Anillos de seguridad">
          {rings.map((ring) => (
            <RingButton
              key={ring.id}
              ring={ring}
              active={activeRing === ring.id}
              onClick={() => setActiveRing(ring.id)}
            />
          ))}
        </div>

        <div className="coveragePanel">
          <div className="coverageCopy">
            <span className="ringEyebrow">Anillo {selected.id}</span>
            <h3>{selected.title}</h3>
            <p>{selected.summary}</p>
            <ul className="featureGrid">
              {selected.bullets.map((label, index) => (
                <Feature key={label} icon={selected.icons[index]} label={label} />
              ))}
            </ul>
          </div>
          <div className="planFrame" key={selected.id}>
            <img className="planGhost" src={planEmpty} alt="" />
            <img className="planActive" src={selected.plan} alt={`Plano de cobertura del anillo ${selected.id}`} />
          </div>
        </div>
      </section>

      <section id="servicio" className="integral">BRINDAMOS UN<br />SERVICIO INTEGRAL</section>

      <section id="sensores" className="alarms">
        <Logo compact />
        <img className="kitImage" src={pdfAsset('p1_img2.png')} alt="Kit de alarmas Proactiva" />
        <div className="alarmHeading">
          <h2>ALARMAS<br /><strong>MONITOREADAS</strong></h2>
          <p>Sistema conectado a monitoreo profesional para detectar eventos y dar aviso inmediato ante intrusiones o situaciones de riesgo.</p>
        </div>

        <div className="sensorTitle">
          <span>
            <img src={magneticIcon} alt="" />
            <img src={motionIcon} alt="" />
            <img src={photoIcon} alt="" />
          </span>
          <strong>SENSORES INTERIORES</strong>
        </div>
        <p className="sensorIntro">Detectan movimientos o aperturas dentro del hogar o propiedad. Son la primera capa de proteccion interior.</p>

        <div className="sensorProducts">
          {sensorCards.map((sensor) => (
            <article className="sensorProduct" key={sensor.title}>
              <img src={sensor.image} alt="" />
              <div>
                <h3>{sensor.title}</h3>
                <p>{sensor.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="perimeterBlock">
          <h3>SENSORES<br />PERIMETRALES</h3>
          <img src={pdfAsset('p1_img1.png')} alt="Sensor exterior perimetral" />
          <p>Sensores exteriores tipo cortina. Permiten detectar movimientos antes del ingreso a la propiedad, generando una proteccion anticipada.</p>
        </div>

        <div className="elementStrip">
          {[magneticIcon, sirenIcon, motionIcon, remoteIcon, monitoringIcon, photoIcon, verificationIcon, appIcon, exteriorIcon, cameraIcon, nvrIcon, recordingIcon, videoIcon].map((icon, index) => (
            <span key={icon} className="elementIcon" style={{ '--delay': `${index * 70}ms` }}>
              <img src={icon} alt="" />
            </span>
          ))}
        </div>
      </section>

      <footer id="contacto" className="siteFooter">
        <div className="footerColumn footerBrand">
          <Logo compact />
          <p>Seguridad monitoreada, videovigilancia y respuesta preventiva para hogares y comercios.</p>
        </div>
        <div className="footerColumn">
          <h3>Contacto</h3>
          <p>Av. Siempre Viva 1234</p>
          <p>Buenos Aires, Argentina</p>
          <p>contacto@proactiva.test</p>
        </div>
        <div className="footerColumn">
          <h3>Atencion</h3>
          <p>Lunes a viernes de 9 a 18 hs</p>
          <p>Guardia de monitoreo 24/7</p>
          <p>Informacion de prueba</p>
        </div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
