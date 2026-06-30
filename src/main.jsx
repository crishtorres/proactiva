import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const assetModules = import.meta.glob('../assets2/**/*.{svg,jpg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const asset = (path) => assetModules[`../assets2/${path}`]

const logo = asset('Logo-03.svg')
const houseDesktop = asset('IMG CASA/Casa sin Anillos.jpg')
const houseActiveDesktop = asset('IMG CASA/Casa con Anillo 1 y 2.jpg')
const houseMobile = asset('IMG CASA/CELU Casa sin Anillo.jpg')
const houseActiveMobile = asset('IMG CASA/CELU Casa con anillo 1 y 2.jpg')

const emptyCircle = asset('circulo.svg')

const icon = (number) => asset(`ICONOS GRISES/Iconos Grises-${String(number).padStart(2, '0')}.svg`)
const colorIcon = (ring, suffix = '') => asset(`ICONOS ANILLOS/Anillo ${ring}/Iconos anillo ${ring}${suffix}.svg`)

const protections = [
  { label: 'Sensor magnético', grey: icon(4), color: colorIcon(1, '-04'), ring: 1 },
  { label: 'Sirena interna', grey: icon(9), color: colorIcon(1, '-09'), ring: 1 },
  { label: 'Sensor de movimiento', grey: icon(10), color: colorIcon(1, '-10'), ring: 1 },
  { label: 'Control remoto', grey: icon(11), color: colorIcon(1), ring: 1 },
  { label: 'Monitoreo profesional', grey: icon(5), color: colorIcon(1, '-05'), ring: 1 },
  { label: 'Sensor con fotodetector', grey: icon(6), color: colorIcon(2), ring: 2 },
  { label: 'Verificación por imagen', grey: icon(12), color: colorIcon(2, '-12'), ring: 2 },
  { label: 'Gestión desde la app', grey: icon(13), color: colorIcon(2, '-13'), ring: 2 },
  { label: 'Sensores exteriores tipo cortina', grey: icon(14), color: colorIcon(3), ring: 3 },
  { label: 'Cámaras exteriores', grey: icon(7), color: colorIcon(4), ring: 4 },
  { label: 'NVR Grabador', grey: icon(15), color: colorIcon(5, '-15'), ring: 5 },
  { label: 'Grabación hasta 30 días', grey: icon(16), color: colorIcon(5, '-16'), ring: 5 },
  { label: 'Sistema integral de videovigilancia', grey: icon(8), color: colorIcon(5), ring: 5 },
]

const pills = [
  { label: 'Cobertura perimetral', ring: 3 },
  { label: 'Mayor nivel de prevención', ring: 3 },
  { label: 'Monitor', ring: 4 },
  { label: 'Supervisión visual', ring: 4 },
  { label: 'Acceso remoto', ring: 4 },
]

const housePoints = [
  { left: '51.8%', top: '35%', label: 'Protección Interior', direction: 'right' },
  { left: '39.8%', top: '64%', label: 'Interior con Verificación', direction: 'left' },
  { left: '51.1%', top: '86%', label: 'Protección Perimetral', direction: 'right' },
  { left: '67%', top: '71%', label: 'Control Visual', direction: 'left' },
  { left: '75.5%', top: '23%', label: 'Control Total', direction: 'left' },
]

const products = [
  {
    image: asset('PRODUCTOS/sensor-magnetico.png'),
    title: <>Sensor<br />magnético</>,
    text: <>Detecta apertura de<br />puertas/ventanas</>,
  },
  {
    image: asset('PRODUCTOS/sensor-movimiento.png'),
    title: <>Sensor de<br />movimiento</>,
    text: <>Detecta presencia<br />o circulación.</>,
  },
  {
    image: asset('PRODUCTOS/sensor-fotodetector.png'),
    title: <>Sensor<br />fotodetector</>,
    text: <>Además de detectar, permite<br />validación visual por imagen.</>,
  },
]

function Brand({ light = false }) {
  return <img className={`brand ${light ? 'brandLight' : ''}`} src={logo} alt="Proactiva" />
}

function LegendItem({ item, activeRing }) {
  const active = activeRing !== null && item.ring <= activeRing
  return (
    <div className={`legendItem ${active ? 'isActive' : ''}`}>
      <img src={active ? item.color : item.grey} alt="" />
      <span>{item.label}</span>
    </div>
  )
}

function App() {
  const [activeRing, setActiveRing] = useState(null)
  const highlightedHouse = activeRing !== null

  return (
    <main>
      <header className="topbar">
        <Brand />
      </header>

      <section className="hero">
        <div className="heroSignal" aria-hidden="true"></div>
        <div className="heroCopy">
          <h1>Entendemos<br />porque<br />sentimos</h1>
          <p>Somos profesionales que entienden que detrás de una alerta hay un hogar, una familia y un miedo real.</p>
          <Brand light />
        </div>
      </section>

      <section className="houseSection" aria-label="Anillos de seguridad">
        <picture>
          <source media="(max-width: 640px)" srcSet={highlightedHouse ? houseActiveMobile : houseMobile} />
          <img src={highlightedHouse ? houseActiveDesktop : houseDesktop} alt="Casa protegida por cinco anillos de seguridad" />
        </picture>
        <div className="ringsCallout" aria-hidden="true">
          <div className="ringsCalloutText">
            <span className="ringsCalloutIntro">Conocé</span>
            <span className="ringsCalloutLight">Nuestros anillos</span>
            <strong>De seguridad</strong>
          </div>
          <img className="ringsCalloutArrow" src={asset('Flechita.svg')} alt="" />
        </div>
        {housePoints.map((point, index) => (
          <button
            className={`ringPoint ringPoint--${point.direction} ${activeRing === index + 1 ? 'isActive' : ''}`}
            style={{ left: point.left, top: point.top }}
            type="button"
            key={index}
            onClick={() => setActiveRing(index + 1)}
            aria-pressed={activeRing === index + 1}
            aria-label={`Anillo ${index + 1}: ${point.label}`}
          >
            <span className="ringLabel" aria-hidden="true">{point.label}</span>
            <span className="ringVisual" aria-hidden="true">
              <img src={emptyCircle} alt="" />
              <span className="ringNumber">{index + 1}</span>
            </span>
          </button>
        ))}
      </section>

      <section className="legend" aria-label="Elementos de protección">
        <div className="legendGrid">
          <div className={`selectedRing ${activeRing === null ? 'isEmpty' : ''}`} aria-live="polite">
            {activeRing !== null && (
              <>
              <span className="selectedRingTitle">Anillo</span>
              <span className="selectedRingVisual" aria-label={`Anillo ${activeRing}`}>
                <img src={emptyCircle} alt="" />
                <span>{activeRing}</span>
              </span>
              </>
            )}
          </div>
          <div className="legendColumn">
            {protections.slice(0, 4).map((item) => <LegendItem key={item.label} item={item} activeRing={activeRing} />)}
          </div>
          <div className="legendColumn">
            {protections.slice(4, 8).map((item) => <LegendItem key={item.label} item={item} activeRing={activeRing} />)}
          </div>
          <div className="legendColumn">
            {[protections[9], protections[8], protections[10], protections[11]].map((item) => (
              <LegendItem key={item.label} item={item} activeRing={activeRing} />
            ))}
          </div>
          <div className="legendColumn legendLast">
            <LegendItem item={protections[12]} activeRing={activeRing} />
            <div className="pillList">
              {pills.map((item) => (
                <div
                  className={`textPill ${activeRing !== null && item.ring <= activeRing ? 'isActive' : ''}`}
                  key={item.label}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="legendHint">Seleccioná un anillo para ver su cobertura.</p>
      </section>

      <section className="serviceBand">Brindamos un servicio integral</section>

      <section className="services">
        <div className="alarmIntro">
          <img className="kitImage" src={asset('PRODUCTOS/kit-alarmas.png')} alt="Kit de alarmas monitoreadas" />
          <h2>Alarmas<br /><span>monitoreadas</span></h2>
          <p>Sistema conectado a monitoreo profesional.<br />Permite detectar eventos y dar aviso<br />inmediato ante intrusiones o situaciones de riesgo.</p>
        </div>

        <div className="sensorHeading">
          <div className="sensorHeadingIcons">
            <img src={colorIcon(1, '-04')} alt="" />
            <img src={colorIcon(1, '-10')} alt="" />
            <img src={colorIcon(1, '-10')} alt="" />
            {/* {[4, 10, 6].map((number) => <img src={colorIcon(1, '-04')} alt="" key={number} />)} */}
          </div>
          <h2>Sensores interiores</h2>
        </div>
        <p className="sensorLead">Detectan movimientos o aperturas dentro del hogar o propiedad.<br />Son la primera capa de protección interior.</p>

        <div className="products">
          {products.map((product) => (
            <article className="product" key={product.image}>
              <img src={product.image} alt="" />
              <div>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="perimeter">
          <h2>Sensores<br />perimetrales</h2>
          <img src={asset('PRODUCTOS/sensor-movimiento.png')} alt="Sensor exterior perimetral" />
          {/* <img src={asset('PRODUCTOS/sensor-perimetral.png')} alt="Sensor exterior perimetral" /> */}
          <p>Sensores exteriores tipo cortina.<br />Permiten detectar movimientos<br />antes del ingreso a la propiedad,<br />generando una protección anticipada.</p>
        </div>
      </section>

      <footer />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
