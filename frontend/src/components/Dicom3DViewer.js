import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const MAX_TEXTURE_SIZE = 512
const MAX_POINTS = 70000

const VIEW_PRESETS = [
  { name: 'Hueso / CT', threshold: 0.62, density: 3 },
  { name: 'Tejido suave', threshold: 0.38, density: 5 },
  { name: 'MRI', threshold: 0.46, density: 4 },
  { name: 'Alto contraste', threshold: 0.72, density: 2 },
]

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: '#050b17',
    color: '#dcefff',
  },
  header: {
    minHeight: 48,
    borderBottom: '1px solid rgba(145, 231, 255, 0.16)',
    backgroundColor: 'rgba(7, 21, 39, 0.92)',
  },
  title: {
    flexGrow: 1,
    minWidth: 0,
  },
  subtitle: {
    color: '#8fb3c8',
    fontSize: 12,
    lineHeight: 1.35,
  },
  stage: {
    position: 'relative',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    background: 'radial-gradient(circle at 50% 20%, rgba(0, 212, 255, 0.12), transparent 32%), #030711',
  },
  canvasLayer: {
    position: 'absolute',
    inset: 0,
  },
  overlay: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    right: 14,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    gap: theme.spacing(2),
    alignItems: 'center',
    padding: '12px 14px',
    border: '1px solid rgba(145, 231, 255, 0.14)',
    backgroundColor: 'rgba(5, 11, 23, 0.78)',
    backdropFilter: 'blur(12px)',
  },
  statusPanel: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(108px, 1fr))',
    gap: theme.spacing(1),
    padding: '10px 12px',
    border: '1px solid rgba(145, 231, 255, 0.14)',
    backgroundColor: 'rgba(5, 11, 23, 0.7)',
    backdropFilter: 'blur(12px)',
  },
  statusItem: {
    minWidth: 0,
  },
  statusValue: {
    color: '#eef9ff',
    fontSize: 13,
    fontWeight: 700,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  presetRow: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  controlLabel: {
    color: '#8fb3c8',
    fontSize: 11,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  empty: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#a8c5d5',
  },
}))

function getTagString(image, tag) {
  if (!image || !image.data || !image.data.string) return ''
  const value = image.data.string(tag)
  return value ? value.trim() : ''
}

function getPixelRange(images) {
  let min = Infinity
  let max = -Infinity

  images.forEach((image) => {
    if (!image || !image.getPixelData) return
    const pixels = image.getPixelData()
    if (!pixels || pixels.length === 0) return
    const step = Math.max(1, Math.floor(pixels.length / 6000))
    for (let i = 0; i < pixels.length; i += step) {
      const value = pixels[i]
      if (!Number.isFinite(value)) continue
      if (value < min) min = value
      if (value > max) max = value
    }
  })

  if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
    return { min: 0, max: 255 }
  }

  return { min, max }
}

function normalizePixel(value, range) {
  const normalized = (value - range.min) / (range.max - range.min)
  if (!Number.isFinite(normalized)) return 0
  return Math.max(0, Math.min(1, normalized))
}

function getPixelAt(image, pixels, x, y, range) {
  const rows = image.rows || image.height || 1
  const columns = image.columns || image.width || 1
  const index = y * columns + x

  if (pixels.length >= rows * columns * 4) {
    const offset = index * 4
    return (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / (3 * 255)
  }

  if (pixels.length >= rows * columns * 3) {
    const offset = index * 3
    return (pixels[offset] + pixels[offset + 1] + pixels[offset + 2]) / (3 * 255)
  }

  return normalizePixel(pixels[index] || 0, range)
}

function createTextureCanvas(image, range) {
  const rows = image.rows || image.height || 1
  const columns = image.columns || image.width || 1
  const scale = Math.min(1, MAX_TEXTURE_SIZE / Math.max(rows, columns))
  const width = Math.max(1, Math.floor(columns * scale))
  const height = Math.max(1, Math.floor(rows * scale))
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const pixels = image.getPixelData ? image.getPixelData() : []
  const imageData = context.createImageData(width, height)

  canvas.width = width
  canvas.height = height

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sourceX = Math.min(columns - 1, Math.floor(x / scale))
      const sourceY = Math.min(rows - 1, Math.floor(y / scale))
      const value = Math.floor(getPixelAt(image, pixels, sourceX, sourceY, range) * 255)
      const offset = (y * width + x) * 4
      imageData.data[offset] = value
      imageData.data[offset + 1] = value
      imageData.data[offset + 2] = value
      imageData.data[offset + 3] = 255
    }
  }

  context.putImageData(imageData, 0, 0)
  return canvas
}

function createSingleImageMesh(image, threshold) {
  const range = getPixelRange([image])
  const rows = image.rows || image.height || 1
  const columns = image.columns || image.width || 1
  const maxDimension = Math.max(rows, columns)
  const width = columns / maxDimension * 6
  const height = rows / maxDimension * 6
  const segmentX = Math.min(96, Math.max(8, Math.floor(columns / 3)))
  const segmentY = Math.min(96, Math.max(8, Math.floor(rows / 3)))
  const geometry = new THREE.PlaneGeometry(width, height, segmentX, segmentY)
  const pixels = image.getPixelData ? image.getPixelData() : []
  const position = geometry.attributes.position

  for (let i = 0; i < position.count; i++) {
    const vx = i % (segmentX + 1)
    const vy = Math.floor(i / (segmentX + 1))
    const sourceX = Math.min(columns - 1, Math.floor(vx / segmentX * (columns - 1)))
    const sourceY = Math.min(rows - 1, Math.floor((1 - vy / segmentY) * (rows - 1)))
    const intensity = getPixelAt(image, pixels, sourceX, sourceY, range)
    const lift = Math.max(0, intensity - threshold * 0.45) * 0.95
    position.setZ(i, lift)
  }

  geometry.computeVertexNormals()

  const texture = new THREE.CanvasTexture(createTextureCanvas(image, range))
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    shininess: 18,
  })

  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -0.18

  const grid = new THREE.LineSegments(
    new THREE.WireframeGeometry(geometry),
    new THREE.LineBasicMaterial({ color: 0x7fdcff, transparent: true, opacity: 0.13 })
  )
  grid.rotation.copy(mesh.rotation)

  return {
    object: mesh,
    helper: grid,
    description: 'Imagen 2D convertida en plano 3D con relieve por intensidad.',
  }
}

function createVolumePointCloud(files, threshold, density) {
  const images = files.map((file) => file.image).filter(Boolean)
  const first = images[0]
  const rows = first.rows || first.height || 1
  const columns = first.columns || first.width || 1
  const range = getPixelRange(images)
  const sliceCount = images.length
  const rawStep = Math.sqrt((rows * columns * sliceCount) / MAX_POINTS)
  const step = Math.max(density, Math.ceil(rawStep))
  const zStep = Math.max(1, Math.floor(step / 2))
  const points = []
  const colors = []
  const maxDimension = Math.max(rows, columns, sliceCount)

  for (let z = 0; z < sliceCount; z += zStep) {
    const image = images[z]
    const pixels = image.getPixelData ? image.getPixelData() : []
    for (let y = 0; y < rows; y += step) {
      for (let x = 0; x < columns; x += step) {
        const intensity = getPixelAt(image, pixels, x, y, range)
        if (intensity < threshold) continue

        points.push(
          (x - columns / 2) / maxDimension * 7,
          -(y - rows / 2) / maxDimension * 7,
          (z - sliceCount / 2) / maxDimension * 7
        )
        colors.push(0.32 + intensity * 0.68, 0.62 + intensity * 0.32, 0.78 + intensity * 0.2)
      }
    }
  }

  if (points.length === 0 && threshold > 0.18) {
    return createVolumePointCloud(files, 0.18, density)
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.computeBoundingSphere()

  const material = new THREE.PointsMaterial({
    size: Math.max(0.018, step / maxDimension * 2.6),
    vertexColors: true,
    transparent: true,
    opacity: 0.86,
    depthWrite: false,
  })

  const pointCloud = new THREE.Points(geometry, material)
  const box = new THREE.BoxHelper(pointCloud, 0x5ddcff)
  box.material.transparent = true
  box.material.opacity = 0.24

  return {
    object: pointCloud,
    helper: box,
    description: `Serie DICOM reconstruida como nube de voxeles (${sliceCount} slices).`,
  }
}

function getSceneInput(dcmViewer) {
  if (!dcmViewer || !dcmViewer.image) {
    return { image: null, files: [] }
  }

  const files = Array.isArray(dcmViewer.files) ? dcmViewer.files.filter((file) => file && file.image) : []
  return {
    image: dcmViewer.image,
    files,
  }
}

export default function Dicom3DViewer({ dcmViewer }) {
  const classes = useStyles()
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef({ dragging: false, lastX: 0, lastY: 0, zoom: 8 })
  const groupRef = useRef(null)
  const cameraRef = useRef(null)
  const [threshold, setThreshold] = useState(0.55)
  const [density, setDensity] = useState(4)
  const [summary, setSummary] = useState('Abre un DICOM para generar una vista 3D.')

  useEffect(() => {
    const mount = mountRef.current
    const input = getSceneInput(dcmViewer)
    if (!mount || !input.image) {
      rendererRef.current = null
      groupRef.current = null
      cameraRef.current = null
      setSummary('Datos insuficientes para generar vista 3D.')
      return undefined
    }

    let animationId = null
    const width = Math.max(320, mount.clientWidth)
    const height = Math.max(320, mount.clientHeight)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(width, height)
    rendererRef.current = renderer

    while (mount.firstChild) mount.removeChild(mount.firstChild)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, controlsRef.current.zoom)
    cameraRef.current = camera

    const group = new THREE.Group()
    groupRef.current = group
    scene.add(group)
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.88)
    keyLight.position.set(3, 4, 6)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x69dcff, 0.42)
    rimLight.position.set(-5, -2, 4)
    scene.add(rimLight)

    const model = input.files.length > 1
      ? createVolumePointCloud(input.files, threshold, density)
      : createSingleImageMesh(input.image, threshold)

    group.add(model.object)
    if (model.helper) group.add(model.helper)
    setSummary(model.description)

    const render = () => {
      animationId = window.requestAnimationFrame(render)
      renderer.render(scene, camera)
    }

    const resize = () => {
      const nextWidth = Math.max(320, mount.clientWidth)
      const nextHeight = Math.max(320, mount.clientHeight)
      camera.aspect = nextWidth / nextHeight
      camera.updateProjectionMatrix()
      renderer.setSize(nextWidth, nextHeight)
    }

    window.addEventListener('resize', resize)
    render()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationId) window.cancelAnimationFrame(animationId)
      renderer.dispose()
      rendererRef.current = null
      while (mount.firstChild) mount.removeChild(mount.firstChild)
    }
  }, [dcmViewer, threshold, density])

  const onPointerDown = (event) => {
    controlsRef.current.dragging = true
    controlsRef.current.lastX = event.clientX
    controlsRef.current.lastY = event.clientY
  }

  const onPointerMove = (event) => {
    const controls = controlsRef.current
    if (!controls.dragging || !groupRef.current) return
    const deltaX = event.clientX - controls.lastX
    const deltaY = event.clientY - controls.lastY
    controls.lastX = event.clientX
    controls.lastY = event.clientY
    groupRef.current.rotation.y += deltaX * 0.008
    groupRef.current.rotation.x += deltaY * 0.008
  }

  const onPointerUp = () => {
    controlsRef.current.dragging = false
  }

  const onWheel = (event) => {
    if (!cameraRef.current) return
    event.preventDefault()
    const controls = controlsRef.current
    controls.zoom = Math.max(3, Math.min(18, controls.zoom + event.deltaY * 0.01))
    cameraRef.current.position.z = controls.zoom
  }

  const resetView = () => {
    controlsRef.current.zoom = 8
    if (cameraRef.current) cameraRef.current.position.set(0, 0, 8)
    if (groupRef.current) groupRef.current.rotation.set(0, 0, 0)
  }

  const applyPreset = (preset) => {
    setThreshold(preset.threshold)
    setDensity(preset.density)
  }

  const downloadCapture = () => {
    if (!rendererRef.current || !input.image) return
    const link = document.createElement('a')
    link.href = rendererRef.current.domElement.toDataURL('image/png')
    link.download = 'vioraxr-3d-capture.png'
    link.click()
  }

  const input = getSceneInput(dcmViewer)
  const modality = getTagString(input.image, 'x00080060') || 'DICOM'
  const study = getTagString(input.image, 'x00081030') || getTagString(input.image, 'x0008103e')
  const hasImage = Boolean(input.image)
  const modeLabel = input.files.length > 1 ? 'Serie por capas' : hasImage ? 'Imagen unica' : 'Sin estudio'
  const reconstructionLabel = input.files.length > 1 ? 'Voxeles aproximados' : hasImage ? 'Plano 3D con relieve' : 'No disponible'
  const sliceLabel = input.files.length > 1 ? input.files.length : hasImage ? 1 : 0
  const imageSize = hasImage ? `${input.image.columns || input.image.width || '?'} x ${input.image.rows || input.image.height || '?'}` : 'No disponible'
  const statusLabel = hasImage ? 'Listo' : 'Datos insuficientes'

  return (
    <div className={classes.root}>
      <Toolbar variant="dense" className={classes.header}>
        <div className={classes.title}>
          <Typography variant="subtitle1">Reconstrucción 3D</Typography>
          <Typography className={classes.subtitle}>
            {hasImage ? `${modality}${study ? ` · ${study}` : ''}${input.files.length > 1 ? ` · ${input.files.length} slices` : ' · imagen unica'}` : 'Sin DICOM cargado'}
          </Typography>
        </div>
      </Toolbar>

      <div
        className={classes.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      >
        <div className={classes.canvasLayer} ref={mountRef} />

        <div className={classes.statusPanel}>
          <div className={classes.statusItem}>
            <Typography className={classes.controlLabel}>Modo</Typography>
            <Typography className={classes.statusValue}>{modeLabel}</Typography>
          </div>
          <div className={classes.statusItem}>
            <Typography className={classes.controlLabel}>Slices detectados</Typography>
            <Typography className={classes.statusValue}>{sliceLabel}</Typography>
          </div>
          <div className={classes.statusItem}>
            <Typography className={classes.controlLabel}>Resolucion</Typography>
            <Typography className={classes.statusValue}>{imageSize}</Typography>
          </div>
          <div className={classes.statusItem}>
            <Typography className={classes.controlLabel}>Reconstruccion</Typography>
            <Typography className={classes.statusValue}>{reconstructionLabel}</Typography>
          </div>
          <div className={classes.statusItem}>
            <Typography className={classes.controlLabel}>Estado</Typography>
            <Typography className={classes.statusValue}>{statusLabel}</Typography>
          </div>
        </div>

        {!hasImage ? (
          <div className={classes.empty}>
            <Typography>Datos insuficientes para generar una vista 3D.</Typography>
            <Typography className={classes.subtitle}>
              Abre un DICOM o una serie por capas para activar la reconstrucción y la captura.
            </Typography>
          </div>
        ) : null}

        {hasImage ? (
          <>
            <div className={classes.overlay}>
              <div>
                <Typography className={classes.controlLabel}>Umbral</Typography>
                <Slider
                  value={threshold}
                  min={0.05}
                  max={0.95}
                  step={0.05}
                  onChange={(event, value) => setThreshold(value)}
                />
              </div>
              <div>
                <Typography className={classes.controlLabel}>Densidad</Typography>
                <Slider
                  value={density}
                  min={2}
                  max={10}
                  step={1}
                  onChange={(event, value) => setDensity(value)}
                />
              </div>
              <Button variant="outlined" color="inherit" onClick={resetView}>
                Reset
              </Button>
              <div className={classes.presetRow}>
                <Typography className={classes.controlLabel}>Presets</Typography>
                {VIEW_PRESETS.map((preset) => (
                  <Button key={preset.name} size="small" variant="outlined" color="inherit" onClick={() => applyPreset(preset)}>
                    {preset.name}
                  </Button>
                ))}
                <Button size="small" variant="outlined" color="inherit" onClick={downloadCapture} disabled={!hasImage}>
                  Captura
                </Button>
              </div>
              <Typography className={classes.subtitle} style={{ gridColumn: '1 / -1' }}>
                {summary} Arrastra para rotar y usa la rueda para zoom. Vista experimental para demo, no diagnostico clinico.
              </Typography>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
